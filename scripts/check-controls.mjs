import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Exercise the shipped selector logic against a small DOM substitute. These
// checks cover state changes, not browser accessibility trees or spoken output.
const source = readFileSync(new URL('../src/scripts/architecture-controls.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

class Element {
  constructor(attributes = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.dataset = {};
    this.listeners = new Map();
    this.hidden = false;
    this.textContent = '';
    const classes = new Set();
    this.classList = {
      add: (value) => classes.add(value),
      contains: (value) => classes.has(value),
      toggle: (value, enabled) => enabled ? classes.add(value) : classes.delete(value),
    };
  }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  addEventListener(name, listener) { this.listeners.set(name, listener); }
  dispatch(name) { this.listeners.get(name)?.(); }
  focus() { this.ownerDocument.activeElement = this; }
}

function selector(prefix, { selected = 0, missingTarget = false, layer = false } = {}) {
  const panels = [0, 1].map((index) => Object.assign(new Element(), { id: `${prefix}-${index}` }));
  const buttons = panels.map((panel, index) => {
    const button = new Element({ 'aria-pressed': String(index === selected), 'data-plane': panel.id });
    button.textContent = `${prefix} choice ${index}`;
    button.dataset = { target: panel.id, announcement: `${prefix} panel ${index}. Approved summary ${index}.` };
    return button;
  });
  const group = new Element();
  group.querySelectorAll = () => buttons;
  return { group, panels, buttons, layer, missingTarget };
}

function boot(selectors, { loading = false, status = true } = {}) {
  const announcements = [];
  const live = new Element();
  Object.defineProperty(live, 'textContent', {
    get: () => announcements.at(-1) ?? '',
    set: (message) => announcements.push(message),
  });
  const elements = new Map(status ? [['sr-status', live]] : []);
  selectors.forEach((item) => item.panels.forEach((panel, index) => {
    if (!item.missingTarget || index === 0) elements.set(panel.id, panel);
  }));
  const planes = selectors.filter((item) => item.layer).flatMap((item) =>
    item.panels.map((panel) => new Element({ 'data-plane': panel.id })));
  const document = new Element();
  document.body = new Element();
  document.readyState = loading ? 'loading' : 'complete';
  document.activeElement = document.body;
  document.getElementById = (id) => elements.get(id) ?? null;
  document.querySelectorAll = (query) => {
    if (query === '.case-controls:not(.layer-controls), .phase-controls') {
      return selectors.filter((item) => !item.layer).map((item) => item.group);
    }
    if (query === '.layer-controls') return selectors.filter((item) => item.layer).map((item) => item.group);
    if (query === '#venture-model .layer') return planes;
    throw new Error(`Unexpected DOM query: ${query}`);
  };
  selectors.forEach((item) => item.buttons.forEach((button) => { button.ownerDocument = document; }));
  runInNewContext(compiled, { document });
  return { document, announcements, live, planes };
}

function assertSelection(item, selected) {
  assert.deepEqual(item.buttons.map((button) => button.getAttribute('aria-pressed')), [0, 1].map((index) => String(index === selected)));
  assert.deepEqual(item.panels.map((panel) => panel.hidden), [0, 1].map((index) => index !== selected));
}

test('initialization respects the selected panel, falls back to the first, and stays silent', () => {
  const explicit = selector('work', { selected: 1 });
  const fallback = selector('stage', { selected: -1 });
  const state = boot([explicit, fallback]);
  assertSelection(explicit, 1);
  assertSelection(fallback, 0);
  assert.equal(explicit.group.classList.contains('is-ready'), true);
  assert.equal(fallback.group.classList.contains('is-ready'), true);
  assert.deepEqual(state.announcements, []);
});

test('changing selection exposes the matching panel, announces its summary, and leaves focus on the control', () => {
  const work = selector('work');
  const stage = selector('stage');
  const state = boot([work, stage]);
  work.buttons[1].focus();
  work.buttons[1].dispatch('click');
  assertSelection(work, 1);
  assertSelection(stage, 0);
  assert.equal(state.document.activeElement, work.buttons[1]);
  assert.deepEqual(state.announcements, [work.buttons[1].dataset.announcement]);
  work.buttons[1].dispatch('click');
  assert.equal(state.announcements.length, 1, 'the same selection does not repeat its announcement');
  work.buttons[0].dispatch('click');
  assertSelection(work, 0);
  assert.equal(state.live.textContent, work.buttons[0].dataset.announcement);
});

test('a missing panel leaves its group readable while another selector still works', () => {
  const broken = selector('broken', { missingTarget: true });
  const working = selector('working');
  const state = boot([broken, working]);
  assert.equal(broken.group.classList.contains('is-ready'), false);
  assert.deepEqual(broken.panels.map((panel) => panel.hidden), [false, false]);
  assert.equal(broken.buttons[0].listeners.has('click'), false);
  working.buttons[1].dispatch('click');
  assertSelection(working, 1);
  assert.deepEqual(state.announcements, [working.buttons[1].dataset.announcement]);
});

test('layer selection keeps the highlighted diagram plane in sync', () => {
  const layers = selector('layer', { layer: true });
  const state = boot([layers]);
  assert.deepEqual(state.planes.map((plane) => plane.classList.contains('is-active')), [true, false]);
  layers.buttons[1].dispatch('click');
  assertSelection(layers, 1);
  assert.deepEqual(state.planes.map((plane) => plane.classList.contains('is-active')), [false, true]);
  assert.deepEqual(state.announcements, [layers.buttons[1].dataset.announcement]);
});

test('initialization waits for the document when the module loads before DOMContentLoaded', () => {
  const work = selector('work');
  const state = boot([work], { loading: true });
  assert.equal(work.group.classList.contains('is-ready'), false);
  assert.deepEqual(work.panels.map((panel) => panel.hidden), [false, false]);
  state.document.dispatch('DOMContentLoaded');
  assertSelection(work, 0);
  assert.equal(work.group.classList.contains('is-ready'), true);
  assert.deepEqual(state.announcements, []);
});

test('a missing status region does not prevent selecting readable content', () => {
  const work = selector('work');
  boot([work], { status: false });
  assert.doesNotThrow(() => work.buttons[1].dispatch('click'));
  assertSelection(work, 1);
});

test('a selector without a summary falls back to its existing button text', () => {
  const work = selector('work');
  delete work.buttons[1].dataset.announcement;
  work.buttons[1].textContent = '  Existing label  ';
  const state = boot([work]);
  work.buttons[1].dispatch('click');
  assert.deepEqual(state.announcements, ['Existing label']);
});
