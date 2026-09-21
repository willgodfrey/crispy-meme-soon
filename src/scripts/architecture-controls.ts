// Progressive enhancement for the three selectors (home work, home stages,
// practice layers). No framework, no fetching, no storage, no navigation
// change. Every panel is server-rendered; without this script the page is a
// complete readable document. Each group initialises independently.

function announce(message: string): void {
  let live = document.getElementById('sr-status');
  if (!live) {
    live = document.createElement('div');
    live.id = 'sr-status';
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    document.body.appendChild(live);
  }
  live.textContent = message;
}

interface Options {
  onSelect?: (button: HTMLButtonElement) => void;
}

function initGroup(group: HTMLElement, opts: Options = {}): void {
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button[data-target]'));
  if (buttons.length < 2) return;
  const panels = buttons.map((b) => document.getElementById(b.dataset.target ?? ''));
  if (panels.some((p) => p === null)) return; // a target is missing: stay static

  const show = (button: HTMLButtonElement, announceChange: boolean): void => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    panels.forEach((p) => {
      if (p) p.hidden = p.id !== button.dataset.target;
    });
    opts.onSelect?.(button);
    if (announceChange) announce(button.textContent?.trim() ?? '');
  };

  buttons.forEach((button) => button.addEventListener('click', () => show(button, true)));

  const initial = buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0];
  show(initial, false);
}

function setLayerPlane(button: HTMLButtonElement): void {
  const plane = button.getAttribute('data-plane');
  document.querySelectorAll('#venture-model .layer').forEach((layer) => {
    layer.classList.toggle('is-active', layer.getAttribute('data-plane') === plane);
  });
}

function ready(): void {
  document.body.classList.add('enhanced');
  document
    .querySelectorAll<HTMLElement>('.case-controls:not(.layer-controls), .phase-controls')
    .forEach((group) => initGroup(group));
  document
    .querySelectorAll<HTMLElement>('.layer-controls')
    .forEach((group) => initGroup(group, { onSelect: setLayerPlane }));
}

if (document.readyState !== 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);
