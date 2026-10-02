"""Regression checks for semantic structure and content-backed JSON-LD.

These checks supplement browser and assistive-technology testing. They do not
establish WCAG conformance or inspect computed CSS.
"""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = json.loads((ROOT / 'src/data/site-content.json').read_text())
ORIGIN = 'https://www.willgodfrey.com'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
SECTIONING = {'article', 'aside', 'main', 'nav', 'section'}
errors = []


class Node:
    def __init__(self, tag, attrs=None, parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs or []), parent
        self.children, self.parts = [], []

    def ancestors(self):
        parent = self.parent
        while parent:
            yield parent
            parent = parent.parent

    def text(self):
        return ''.join(part.text() if isinstance(part, Node) else part for part in self.parts)


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack, self.nodes = [self.root], []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.stack[-1])
        self.stack[-1].children.append(node)
        self.stack[-1].parts.append(node)
        self.nodes.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, text):
        self.stack[-1].parts.append(text)


def require(condition, route, message):
    if not condition:
        errors.append(f'{route}: {message}')


def normalized(text):
    return ' '.join(text.split())


def references(value):
    if isinstance(value, dict):
        if set(value) == {'@id'}:
            yield value['@id']
        for child in value.values():
            yield from references(child)
    elif isinstance(value, list):
        for child in value:
            yield from references(child)


for key in ('home', 'practice', 'commissions', 'work', 'about', 'contact', 'notFound'):
    record = CONTENT[key]
    route = record['route']
    path = route.lstrip('/')
    file = ROOT / 'dist' / (path + 'index.html' if not path or path.endswith('/') else path)
    document = Document(file.read_text())
    nodes = document.nodes
    by_id = {node.attrs['id']: node for node in nodes if 'id' in node.attrs}
    html = [node for node in nodes if node.tag == 'html']
    require(len(html) == 1 and html[0].attrs.get('lang') == 'en', route, 'Missing English document language')
    mains = [node for node in nodes if node.tag == 'main']
    require(len(mains) == 1 and mains[0].attrs.get('id') == 'main' and mains[0].attrs.get('tabindex') == '-1', route, 'Expected one focusable main target')
    links = [node for node in nodes if node.tag == 'a']
    require(links and links[0].attrs.get('href') == '#main', route, 'Skip link must precede navigation')
    footers = [node for node in nodes if node.tag == 'footer' and not any(a.tag in SECTIONING for a in node.ancestors())]
    require(len(footers) == 1, route, 'Expected one site-wide footer landmark outside sectioning content')
    if footers:
        require(CONTENT['common']['email'] in footers[0].text() or key in ('contact', 'notFound'), route, 'Footer lost its contact address')
    for node in nodes:
        if node.tag in ('ul', 'ol') and not any(a.tag == 'nav' for a in node.ancestors()):
            require(node.attrs.get('role') == 'list', route, 'Unmarked editorial list can lose Safari semantics when markers are removed')
        if 'aria-controls' in node.attrs:
            require(all(target in by_id for target in node.attrs['aria-controls'].split()), route, 'Control points to a missing element')
        if 'aria-labelledby' in node.attrs:
            require(all(target in by_id for target in node.attrs['aria-labelledby'].split()), route, 'Label refers to a missing element')
        if 'js-controls' in node.attrs.get('class', '').split():
            buttons = [child for child in node.children if child.tag == 'button']
            require(sum(button.attrs.get('aria-pressed') == 'true' for button in buttons) == 1, route, 'Selector must have one initial selection')
            for button in buttons:
                require(button.attrs.get('type') == 'button' and normalized(button.text()), route, 'Selector needs a named native button')
                require(button.attrs.get('data-target') == button.attrs.get('aria-controls'), route, 'Selector behavior and accessible relationship differ')
    status = by_id.get('sr-status')
    require(status is not None and status.attrs.get('aria-live') == 'polite' and not status.text().strip(), route, 'Empty polite status region must exist before interaction')
    scripts = [node for node in nodes if node.tag == 'script' and node.attrs.get('type') == 'application/ld+json']
    require(len(scripts) == 1, route, 'Expected one JSON-LD graph')
    if not scripts:
        continue
    try:
        data = json.loads(scripts[0].text())
    except ValueError:
        require(False, route, 'Invalid JSON-LD')
        continue
    graph = data.get('@graph', [])
    require(data.get('@context') == 'https://schema.org', route, 'Unexpected schema context')
    ids = [item.get('@id') for item in graph]
    require(all(ids) and len(ids) == len(set(ids)), route, 'Graph nodes need unique stable identifiers')
    for ref in references(graph):
        require(ref in ids, route, f'Unresolved graph reference: {ref}')
    pages = [item for item in graph if item.get('url') == ORIGIN + route and item.get('@type') in ('WebPage', 'ProfilePage', 'ContactPage', 'FAQPage')]
    require(len(pages) == 1, route, 'Expected one typed canonical page node')
    if pages:
        require(pages[0].get('name') == record['seo']['title'] and pages[0].get('description') == record['seo']['description'], route, 'Page graph and canonical metadata differ')
    people = [item for item in graph if item.get('@type') == 'Person']
    require(len(people) == 1 and people[0].get('image') == ORIGIN + CONTENT['common']['portrait']['path'], route, 'Person portrait differs from approved content')
    if pages and people:
        if key == 'about':
            require(pages[0].get('mainEntity') == {'@id': people[0]['@id']}, route, 'Profile page lost its person relationship')
        if key == 'contact':
            require(pages[0].get('@type') == 'ContactPage', route, 'Contact page lost its semantic type')
        if key == 'practice':
            require(len(pages[0].get('mainEntity', [])) == len(CONTENT['practice']['faq']['items']), route, 'Practice FAQ inventory differs')
    services = [item for item in graph if item.get('@type') == 'Service']
    require(len(services) == (6 if key == 'commissions' else 0), route, 'Unexpected commission service inventory')
    visible = normalized(' '.join(node.text() for node in nodes if node.tag == 'main'))
    commissions = CONTENT['commissions']
    flagship, portfolio = commissions['flagship'], commissions['portfolio']
    expected_services = {ORIGIN + commissions['route'] + '#' + item['id']: (name, body, scope)
        for item, name, body, scope in [
            (flagship, flagship['title'], flagship['body'], flagship['boundary']),
            *((item, item['name'], item['body'], item['scopeNote']) for item in commissions['focused']['items']),
            (portfolio, portfolio['title'], portfolio['body'], portfolio['scopeNote']),
        ]}
    for service in services:
        require(service.get('url') == service.get('@id') and service.get('url', '').split('#')[-1] in by_id, route, 'Service URL needs a real page section')
        require(people and service.get('provider') == {'@id': people[0]['@id']}, route, 'Service lost its provider relationship')
        expected_service = expected_services.get(service.get('@id'))
        require(expected_service is not None, route, 'Unexpected service identifier')
        if expected_service:
            name, body, scope = expected_service
            require(service.get('name') == name and service.get('description') == body + ' ' + scope, route, 'Service graph differs from approved content')
            require(all(normalized(phrase) in visible for phrase in (name, body, scope)), route, 'Service metadata must match visible content')
        require(not any(field in service for field in ('offers', 'aggregateRating', 'review', 'price', 'award')), route, 'Unapproved commercial claim in service metadata')
    for item in graph:
        if item.get('@type') == 'FAQPage':
            for question in item.get('mainEntity', []):
                require(normalized(question['name']) in visible and normalized(question['acceptedAnswer']['text']) in visible, route, 'FAQ differs from visible content')

if errors:
    raise SystemExit('\n'.join(errors))
print('Accessibility/metadata regression checks passed: 7 routes, landmarks, list semantics, selector relationships, initial announcements and linked content-backed JSON-LD.')
