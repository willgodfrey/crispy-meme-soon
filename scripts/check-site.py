import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
CONTENT = json.loads((ROOT / 'src/data/site-content.json').read_text())
ORIGIN = 'https://www.willgodfrey.com'
FAILURES = []


def check(condition, message):
    if not condition:
        FAILURES.append(message)


def normalized(text):
    return re.sub(r'\s+', ' ', text).strip()


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for item in value:
            yield from strings(item)
    elif isinstance(value, dict):
        for item in value.values():
            yield from strings(item)


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.assets = []
        self.text = []
        self.accessible = []
        self.metadata = {}
        self.canonicals = []
        self.headings = []
        self.excluded = 0
        self.in_body = False
        self.title = ''
        self.in_title = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self.excluded += 1
        if tag == 'body':
            self.in_body = True
        if tag == 'title' and not self.in_body:
            self.in_title = True
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag in ('img', 'script') and attrs.get('src'):
            self.assets.append(attrs['src'])
        if attrs.get('srcset'):
            self.assets.extend(item.strip().split()[0] for item in attrs['srcset'].split(','))
        if tag == 'link':
            if attrs.get('rel') == 'canonical':
                self.canonicals.append(attrs.get('href'))
            elif attrs.get('href'):
                self.assets.append(attrs['href'])
        if tag == 'img':
            check('alt' in attrs, 'Image without alternative text')
            check('width' in attrs and 'height' in attrs, 'Image without reserved dimensions')
        for key in ('alt', 'aria-label'):
            if attrs.get(key):
                self.accessible.append(attrs[key])
        if tag == 'meta':
            self.metadata[attrs.get('name', attrs.get('property'))] = attrs.get('content')
        if re.fullmatch('h[1-6]', tag):
            self.headings.append(int(tag[1]))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.excluded -= 1
        if tag == 'body':
            self.in_body = False
        if tag == 'title':
            self.in_title = False

    def handle_data(self, text):
        if self.in_title:
            self.title += text
        if self.in_body and not self.excluded and normalized(text):
            self.text.append(normalized(text))


def output_file(path):
    path = unquote(path).lstrip('/')
    return DIST / (path + 'index.html' if not path or path.endswith('/') else path)


PAGES = {}
for name in ('home', 'practice', 'commissions', 'work', 'about', 'contact', 'notFound'):
    record = CONTENT[name]
    route = record['route']
    file = output_file(route)
    check(file.is_file(), f'Missing route: {route}')
    if not file.is_file():
        continue
    page = Page(file.read_text())
    PAGES[route] = page
    check(page.title == record['seo']['title'], f'Title differs: {route}')
    check(page.metadata.get('description') == record['seo']['description'], f'Description differs: {route}')
    check(page.canonicals == [ORIGIN + route], f'Canonical differs: {route}: {page.canonicals}')
    check(page.headings.count(1) == 1, f'Expected one h1: {route}')
    check(len(page.ids) == len(set(page.ids)), f'Duplicate IDs: {route}')
    check(page.metadata.get('robots') == 'noindex' if name == 'notFound' else page.metadata.get('robots') != 'noindex', f'Unexpected indexing: {route}')
    check(not any(current > previous + 1 for previous, current in zip(page.headings, page.headings[1:])), f'Skipped heading level: {route}')

public = {key: value for key, value in CONTENT.items() if key != 'meta'}
approved = [normalized(item) for item in strings(public)]
details = CONTENT['contact']['details']
approved.append(f'{details["locationLabel"]}: {details["location"]}. {details["working"]}')
for route, page in PAGES.items():
    for phrase in page.text + page.accessible:
        if not re.fullmatch(r'[0-9\s↗↓]+', phrase):
            check(any(phrase in item for item in approved), f'Unapproved rendered copy at {route}: {phrase}')
    for href in page.links + page.assets:
        check(bool(href), f'Empty URL at {route}')
        target = urlsplit(urljoin(ORIGIN + route, href))
        if target.scheme == 'mailto':
            check(href == CONTENT['common']['emailHref'], f'Unexpected email: {href}')
            continue
        if target.netloc != urlsplit(ORIGIN).netloc:
            check(href in page.links, f'Third-party runtime resource: {href}')
            continue
        check(output_file(target.path).is_file(), f'Broken URL at {route}: {href}')
        if target.fragment:
            destination = PAGES.get(target.path)
            check(destination and unquote(target.fragment) in destination.ids, f'Broken anchor at {route}: {href}')

commissions = CONTENT['commissions']
commission_page = PAGES[commissions['route']]
commission_text = normalized(' '.join(commission_page.text + commission_page.accessible))
ignored = {'id', 'route', 'href', 'visualId', 'stageIds', 'titleLines', 'seo', 'labels'}


def rendered_phrases(value, key=''):
    if key in ignored:
        return
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for item in value:
            yield from rendered_phrases(item)
    elif isinstance(value, dict):
        for field, item in value.items():
            yield from rendered_phrases(item, field)


for phrase in rendered_phrases(commissions):
    check(normalized(phrase) in commission_text, f'Missing commission copy: {phrase}')
for stage in CONTENT['common']['stages']:
    check(stage['body'] in commission_text, f'Missing flagship stage: {stage["id"]}')
for node, route in [(CONTENT['home']['entryPoints'], '/'), (CONTENT['practice']['scopedStandards'], '/venture-architect/')]:
    rendered = normalized(' '.join(PAGES[route].text))
    for phrase in rendered_phrases(node):
        check(normalized(phrase) in rendered, f'Missing copy at {route}: {phrase}')

for diagram in CONTENT['common']['diagrams'].values():
    file = DIST / 'diagrams' / Path(diagram['sourceFile']).name
    check(file.is_file(), f'Missing diagram: {file.name}')
    if file.is_file():
        document = ElementTree.fromstring(file.read_text())
        actual = normalized(' '.join(document.itertext()))
        for label in diagram['labels']:
            for line in label['lines']:
                check(normalized(line) in actual, f'Diagram copy differs: {file.name}: {line}')
        for key in ('title', 'description'):
            if diagram.get(key):
                check(normalized(diagram[key]) in actual, f'Diagram {key} differs: {file.name}')

manifest = json.loads((ROOT / 'src/data/asset-manifest.json').read_text())
for asset in manifest['assets']:
    for entry in asset['files']:
        file = ROOT / entry['path']
        check(file.is_file(), f'Missing manifest asset: {entry["path"]}')
        if file.is_file():
            check(hashlib.sha256(file.read_bytes()).hexdigest() == entry['sha256'], f'Asset checksum differs: {entry["path"]}')
check(not list(DIST.rglob('*master*')), 'Editing master shipped to production')
sitemap = ElementTree.parse(DIST / 'sitemap-0.xml')
locations = {item.text for item in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
expected = {ORIGIN + route for route in PAGES if route != CONTENT['notFound']['route']}
check(locations == expected, f'Sitemap differs: {locations ^ expected}')
check(not any('Design reference' in ' '.join(page.text) for page in PAGES.values()), 'Review chrome in output')

if FAILURES:
    raise SystemExit('\n'.join(FAILURES))
print(f'Site check passed: {len(PAGES)} routes, metadata, headings, copy, links, anchors, local assets, diagram labels, checksums and sitemap.')
