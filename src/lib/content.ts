// Single canonical content source for the site. The handoff shipped the copy
// as one structured JSON with cross-references (shared stages, cases, diagrams);
// we keep it as one in-repo authority, validated and resolved at build time.
// Nothing here is fetched in the browser.
import raw from '../data/site-content.json';

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

const data = raw as any;

export const common = data.common;
export const home = data.home;
export const practice = data.practice;
export const work = data.work;
export const about = data.about;
export const contact = data.contact;
export const notFound = data.notFound;

export function resolveInvitation(node: { ref?: string } | Invitation): Invitation {
  if (node && (node as any).ref === 'common.invitation') return common.invitation as Invitation;
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

// Sculpture responsive sources (derivatives live in public/images/architecture-practice/).
export const assembly = {
  base: '/images/architecture-practice/assembly',
  widths: [640, 960, 1536] as const,
  jpg: '/images/architecture-practice/assembly-1536.jpg',
  alt: 'Conceptual sculpture of graphite, stone and glass planes joined into one structure.',
};

// Light build-time validation: fail loudly on missing cross-references.
export function validateContent(): void {
  getStages(home.process.stageIds);
  getStages(practice.engagement.stageIds);
  getCases(home.selectedWork.caseIds);
  for (const c of work.cases as WorkCase[]) getDiagram(c.visualId);
  resolveInvitation(home.invitation);
}
