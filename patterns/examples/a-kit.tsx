// Pieces shared by writer A’s Examples pages (reconcile, slicing, lookup, intake): links, the workflow and time
// tables every example ends on, an attached file, and the quiet page drawn under a chat panel. Not a page itself:
// catalog.ts has no "a-kit". Styles are in examples.css, prefix exa-.
import type { ReactNode } from 'react';
import { When, Sk, Pin } from '../../site/kit';
import './examples.css';

/** A cross-reference to an Agent Interfaces page. */
export const alink = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** A cross-reference to a Management Systems page. */
export const mlink = (to: string, label: string) => <a className="m-link" href={`#/management/${to}`}>{label}</a>;

/** The workflow, one row per step: who does it, what happens, and the pattern page that covers the screen. */
export function Flow({ rows }: { rows: [who: string, what: ReactNode, screen: ReactNode][] }) {
  return (
    <When head={['Step', 'Who', 'What happens', 'Screen']} rows={rows.map(([who, what, screen], i) => [
      <Pin n={i + 1} />, <span className={who.includes('Agent') || ['Marco', 'Nico', 'Bea'].includes(who) ? 'exa-who ag' : 'exa-who'}>{who}</span>, what, screen,
    ])} />
  );
}

/** Before and after: the same piece of work by hand, and with the Agent. The last row is the total. */
export function Saves({ rows, total }: { rows: [work: string, before: ReactNode, after: ReactNode][]; total: [string, string] }) {
  return (
    <div className="exa-saves">
      <When head={['The work', 'By hand', 'With the Agent']} rows={[
        ...rows,
        [<b>All of it</b>, <b>{total[0]}</b>, <b className="exa-good">{total[1]}</b>],
      ]} />
    </div>
  );
}

/** A file attached to a message: its name, and what it is. */
export const FileChip = ({ name, meta }: { name: string; meta: string }) => (
  <span className="exa-file"><i>▤</i><b>{name}</b><small>{meta}</small></span>
);

/** The page under a chat panel, drawn quietly: breadcrumb, title, a line of facts, then skeleton bars. */
export function Under({ crumb, title, meta, children }: { crumb: string[]; title: string; meta: ReactNode; children?: ReactNode }) {
  return (
    <div className="exa-under">
      <p className="as-crumb">{crumb.map((c, i) => i < crumb.length - 1 ? <span key={c}>{c}<span>/</span></span> : <b key={c}>{c}</b>)}</p>
      <div className="as-a-head"><div><p className="m-title">{title}</p><p className="as-meta">{meta}</p></div></div>
      {children ?? <><Sk w="92%" /><Sk w="84%" /><Sk w="88%" /><Sk w="70%" /><Sk w="80%" /></>}
    </div>
  );
}
