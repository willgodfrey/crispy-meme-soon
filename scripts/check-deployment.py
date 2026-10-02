"""Read-only release check against the locally built site; never deploys anything.

Usage: python3 scripts/check-deployment.py https://preview.pages.dev --environment preview
       python3 scripts/check-deployment.py https://www.willgodfrey.com --environment production
Build with the release content first. Requires curl and Python 3; uses normal TLS validation.
"""
import argparse
import json
import re
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
CONTENT = json.loads((ROOT / 'src/data/site-content.json').read_text())


class Document(HTMLParser):
    def __init__(self, body):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.meta = {}
        self.canonical = []
        self.words = []
        self.links = []
        self.resources = []
        self.structured_data = []
        self.ld_buffer = None
        self.in_title = False
        self.in_body = False
        self.excluded = 0
        self.feed(body)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a': self.links.append(attrs.get('href'))
        if tag in ('img', 'script', 'source') and (attrs.get('src') or attrs.get('srcset')):
            self.resources.append((tag, attrs.get('src'), attrs.get('srcset')))
        if tag == 'link' and attrs.get('rel') != 'canonical':
            self.resources.append((tag, attrs.get('rel'), attrs.get('href')))
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.ld_buffer = ''
        if tag == 'title': self.in_title = True
        if tag == 'body': self.in_body = True
        if tag in ('script', 'style'): self.excluded += 1
        if tag == 'meta': self.meta[attrs.get('name', attrs.get('property'))] = attrs.get('content')
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical.append(attrs.get('href'))
        if self.in_body:
            for key in ('alt', 'aria-label'):
                if attrs.get(key): self.words.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'script' and self.ld_buffer is not None:
            try:
                self.structured_data.append(json.loads(self.ld_buffer))
            except json.JSONDecodeError:
                self.structured_data.append({'invalid_json_ld': self.ld_buffer})
            self.ld_buffer = None
        if tag == 'title': self.in_title = False
        if tag == 'body': self.in_body = False
        if tag in ('script', 'style'): self.excluded -= 1

    def handle_data(self, data):
        if self.ld_buffer is not None: self.ld_buffer += data
        if self.in_title: self.title += data
        if self.in_body and not self.excluded: self.words.append(data)

    @property
    def text(self):
        return re.sub(r'\s+', ' ', ' '.join(self.words)).strip()


def fetch(url):
    with tempfile.TemporaryDirectory() as folder:
        body, headers = Path(folder) / 'body', Path(folder) / 'headers'
        result = subprocess.run([
            'curl', '--silent', '--show-error', '--location', '--max-redirs', '3',
            '--max-time', '30', '--proto', '=https', '--proto-redir', '=https',
            '--output', str(body), '--dump-header', str(headers), '--write-out', '%{http_code}', url,
        ], capture_output=True, text=True, check=True)
        blocks = re.split(r'\r?\n\r?\n', headers.read_text())
        last = next(block for block in reversed(blocks) if block.startswith('HTTP/'))
        parsed = {}
        for line in last.splitlines()[1:]:
            if ':' in line:
                key, value = line.split(':', 1)
                parsed[key.lower()] = parsed.get(key.lower(), '') + ' ' + value.strip()
        return int(result.stdout), parsed, body.read_text()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('origin')
    parser.add_argument('--environment', choices=['preview', 'production'], required=True)
    args = parser.parse_args()
    origin = args.origin.rstrip('/')
    target = urlsplit(origin)
    if target.scheme != 'https' or not target.netloc or target.path or target.query or target.fragment or target.username:
        parser.error('Use an HTTPS origin without a path, query or credentials.')
    pages = [CONTENT[key] for key in ('home', 'practice', 'commissions', 'work', 'about', 'contact')]
    paths = [page['route'] for page in pages] + ['/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/llms.txt', '/deployment-check-not-found']
    if not all((DIST / path).is_file() for path in ('index.html', '404.html', 'sitemap-index.xml', 'sitemap-0.xml', 'llms.txt')):
        parser.error('Build the intended release first; dist is incomplete.')
    with ThreadPoolExecutor(max_workers=4) as pool:
        responses = dict(zip(paths, pool.map(lambda path: fetch(origin + path), paths)))
    failures = []
    def check(condition, message):
        if not condition: failures.append(message)
    for page in pages:
        route = page['route']
        status, headers, body = responses[route]
        expected = Document((DIST / route.lstrip('/') / 'index.html').read_text())
        actual = Document(body)
        check(status == 200, f'{route}: expected HTTP 200, received {status}')
        check('text/html' in headers.get('content-type', ''), f'{route}: incorrect HTML content type')
        check(actual.title == expected.title, f'{route}: page title differs from release build')
        check(actual.text == expected.text, f'{route}: visible or accessible copy differs from release build')
        check(actual.canonical == expected.canonical, f'{route}: canonical differs from release build')
        check(actual.links == expected.links, f'{route}: navigation or action targets differ from release build')
        check(actual.resources == expected.resources, f'{route}: asset references differ from release build')
        check(actual.structured_data == expected.structured_data, f'{route}: JSON-LD differs from release build')
        for key in ('description', 'og:title', 'og:description', 'og:url'):
            check(actual.meta.get(key) == expected.meta.get(key), f'{route}: {key} differs from release build')
        robots = (headers.get('x-robots-tag', '') + ' ' + (actual.meta.get('robots') or '')).lower()
        if args.environment == 'preview':
            check('noindex' in robots, f'{route}: preview should remain noindex')
        else:
            check('noindex' not in robots and not re.search(r'\bnone\b', robots), f'{route}: production indexing is blocked')
    for path in ('/robots.txt', '/llms.txt'):
        status, headers, body = responses[path]
        check(status == 200 and 'text/plain' in headers.get('content-type', ''), f'{path}: expected a plain-text HTTP 200 response')
        check(body.strip() == (DIST / path.lstrip('/')).read_text().strip(), f'{path}: content differs from release build')
    for path in ('/sitemap-index.xml', '/sitemap-0.xml'):
        status, headers, body = responses[path]
        check(status == 200 and 'xml' in headers.get('content-type', ''), f'{path}: expected an XML HTTP 200 response')
        try:
            actual = ElementTree.fromstring(body)
            expected = ElementTree.parse(DIST / path.lstrip('/')).getroot()
            values = lambda root: [node.text for node in root.iter() if node.tag.endswith('}loc') or node.tag == 'loc']
            check(values(actual) == values(expected), f'{path}: URLs differ from release build')
        except ElementTree.ParseError:
            check(False, f'{path}: response is not valid XML')
    status, _, body = responses['/deployment-check-not-found']
    check(status == 404, f'Missing route: expected real HTTP 404, received {status}')
    check(Document(body).meta.get('robots') == 'noindex', 'Missing route: expected noindex 404 page')
    if failures:
        print('\n'.join('FAIL: ' + failure for failure in failures))
        raise SystemExit(1)
    print(f'Deployment check passed: {origin} ({args.environment}); six pages match release copy and metadata, discovery files match, indexing headers and 404 verified.')


if __name__ == '__main__':
    main()
