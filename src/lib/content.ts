// Single canonical content source for the site. The handoff shipped the copy
// as one structured JSON with cross-references (shared stages, cases, diagrams);
// we keep it as one in-repo authority, validated and resolved at build time.
// Nothing here is fetched in the browser.
import raw from '../data/site-content.json';
import assets from '../data/asset-manifest.json';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface Link {
  label: string;
  href: string;
}
export interface Invitation {
  eyebrow: string;
  title: string;
  body: string;
  link: Link;
}
export interface StageDeliverable {
  eyebrow: string;
  title: string;
  items: string[];
  footer: string;
  seal: string;
}
export interface Stage {
  id: string;
  number: string;
  title: string;
  body: string;
  deliverable: StageDeliverable;
}
export interface DiagramLabel {
  text: string;
  lines: string[];
}
export interface Diagram {
  assetId: string;
  sourceFile: string;
  title: string | null;
  description: string | null;
  titleId: string | null;
  descriptionId: string | null;
  role: string;
  ariaLabel: string | null;
  ariaLabelledBy: string[];
  labels: DiagramLabel[];
}
export interface WorkCase {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  role: string;
  summary: string;
  context: string;
  design: string;
  evidence: string;
  visualId: string;
  visualCaption: string;
  visualAlt: string;
  labels: string[];
  tags: string[];
  link?: Link;
}

const data = raw;

export const common = data.common;
export const home = data.home;
export const practice = data.practice;
export const commissions = data.commissions;
export type FocusedCommission = typeof commissions.focused.items[number];
export const work = data.work;
export const about = data.about;
export const contact = data.contact;
export const notFound = data.notFound;

export function resolveInvitation(node: { ref?: string } | Invitation): Invitation {
  if ('ref' in node) {
    if (node.ref !== 'common.invitation') throw new Error(`Unknown invitation reference: ${node.ref}`);
    return common.invitation;
  }
  return node as Invitation;
}
export function getStage(id: string): Stage {
  const s = (common.stages as Stage[]).find((x) => x.id === id);
  if (!s) throw new Error(`Unknown stage id: ${id}`);
  return s;
}
export function getStages(ids: string[]): Stage[] {
  return ids.map(getStage);
}
export function getCase(id: string): WorkCase {
  const c = (work.cases as WorkCase[]).find((x) => x.id === id);
  if (!c) throw new Error(`Unknown case id: ${id}`);
  return c;
}
export function getCases(ids: string[]): WorkCase[] {
  return ids.map(getCase);
}
export function getDiagram(id: string): Diagram {
  const d = (common.diagrams as Record<string, Diagram>)[id];
  if (!d) throw new Error(`Unknown diagram id: ${id}`);
  return d;
}
export function diagramSrc(id: string): string {
  return `/diagrams/${getDiagram(id).sourceFile.split('/').pop()}`;
}

export function diagramDimensions(id: string): { width: number; height: number } {
  const path = `public${diagramSrc(id)}`;
  const file = assets.assets.flatMap((asset) => asset.files).find((item) => item.path === path);
  const dimensions = file && 'dimensions' in file ? file.dimensions : null;
  if (!dimensions || typeof dimensions !== 'object' ||
      !('width' in dimensions) || typeof dimensions.width !== 'number' ||
      !('height' in dimensions) || typeof dimensions.height !== 'number') {
    throw new Error(`Missing diagram dimensions: ${id}`);
  }
  return { width: dimensions.width, height: dimensions.height };
}

// Sculpture responsive sources (derivatives live in public/images/architecture-practice/).
export const assembly = {
  base: '/images/architecture-practice/assembly',
  widths: [640, 960, 1536] as const,
  jpg: '/images/architecture-practice/assembly-1536.jpg',
  alt: home.hero.imageAlt,
};

// Light build-time validation: fail loudly on missing cross-references.
export function validateContent(): void {
  const uniqueIds = (items: { id: string }[], label: string): void => {
    const ids = items.map((item) => item.id);
    if (ids.some((id) => !/^[a-z][a-z0-9-]*$/.test(id)) || new Set(ids).size !== ids.length) {
      throw new Error(`Invalid or duplicate ${label} IDs`);
    }
  };
  const requireText = (record: Record<string, unknown>, fields: string[], label: string): void => {
    for (const field of fields) {
      if (typeof record[field] !== 'string' || !(record[field] as string).trim()) {
        throw new Error(`Missing ${label}.${field}`);
      }
    }
  };
  uniqueIds(common.stages, 'stage');
  uniqueIds(work.cases, 'case');
  requireText(work.methodPreview, ['label', 'title', 'intro', 'caption'], 'work.methodPreview');
  if (!work.methodPreview.fields.length) throw new Error('Missing method preview fields');
  for (const field of work.methodPreview.fields) requireText(field, ['label', 'body'], 'method preview field');
  if (work.methodPreview.link.href !== contact.route) throw new Error('Invalid method conversation destination');
  uniqueIds(practice.layers.items, 'layer');
  uniqueIds([commissions.overview, commissions.flagship, commissions.focused, ...commissions.focused.items, commissions.portfolio, commissions.conversation], 'commission');
  requireText(commissions.hero, ['title', 'eyebrow', 'helper'], 'commissions.hero');
  requireText(commissions.overview, ['id', 'title', 'body', 'flagshipLabel', 'focusedLabel', 'workshopLabel', 'linkLabel'], 'commissions.overview');
  requireText(commissions.labels, ['decision', 'deliverables', 'engagementModes', 'navigation', 'when', 'work', 'client'], 'commissions.labels');
  requireText(practice.hero, ['role'], 'practice.hero');
  for (const section of [commissions.flagship, commissions.focused, commissions.portfolio, commissions.conversation]) {
    requireText(section, ['id', 'title', 'body'], 'commission section');
  }
  requireText(commissions.flagship, ['summary', 'when', 'boundary', 'deliverableTitle'], 'commissions.flagship');
  requireText(commissions.portfolio, ['summary', 'when', 'eyebrow', 'deliverable', 'scopeNote'], 'commissions.portfolio');
  for (const step of commissions.conversation.steps) requireText(step, ['title', 'body'], 'conversation step');
  requireText(commissions.faq, ['title'], 'commissions.faq');
  for (const item of commissions.faq.items) {
    requireText(item, ['question'], 'commission FAQ');
    if (!item.answer.length || item.answer.some((answer) => !answer.trim())) throw new Error('Missing commission FAQ answer');
  }
  for (const stage of common.stages) {
    requireText(stage, ['id', 'number', 'title', 'body'], 'stage');
    requireText(stage.deliverable, ['eyebrow', 'title', 'footer', 'seal'], 'stage deliverable');
  }
  getStages(home.process.stageIds);
  getStages(practice.engagement.stageIds);
  getStages(commissions.flagship.stageIds);
  getCases(home.selectedWork.caseIds);
  for (const c of work.cases as WorkCase[]) getDiagram(c.visualId);
  resolveInvitation(home.invitation);
  for (const offer of [commissions.hero, ...commissions.focused.items]) {
    requireText(offer, ['body', 'visualId', 'visualAlt', 'visualCaption'], 'commission');
    const diagram = getDiagram(offer.visualId);
    if (!existsSync(resolve('public', diagramSrc(offer.visualId).slice(1)))) {
      throw new Error(`Missing diagram asset: ${diagram.sourceFile}`);
    }
    diagramDimensions(offer.visualId);
    const metadata = common.diagrams[offer.visualId as keyof typeof common.diagrams];
    if (!('alt' in metadata) || metadata.alt !== offer.visualAlt ||
        !('caption' in metadata) || metadata.caption !== offer.visualCaption) {
      throw new Error(`Commission figure copy differs from diagram metadata: ${offer.visualId}`);
    }
  }
  for (const offer of commissions.focused.items) {
    requireText(offer, ['id', 'name', 'summary', 'when', 'situation', 'decision', 'scopeNote'], 'focused commission');
    if (!offer.deliverables.length || offer.deliverables.some((item) => !item.trim())) {
      throw new Error(`Missing deliverables: ${offer.id}`);
    }
    if (offer.link.href !== contact.route) throw new Error(`Invalid conversation destination: ${offer.id}`);
  }
  const pages = [home, practice, commissions, work, about, contact, notFound];
  for (const page of pages) requireText(page.seo, ['title', 'description'], page.route);
  for (const item of common.navigation) {
    if (!pages.some((page) => page.route === item.href)) throw new Error(`Unknown navigation route: ${item.href}`);
  }
}
