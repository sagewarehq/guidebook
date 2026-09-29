// Drawings for the Teaching and improving pages: Marco’s learned skills, the Skills tab that lists them, and the note
// in chat when he learns one. The head of Marco’s page is the kit’s AgentHead. Not a page itself: catalog.ts has no
// "teach-kit".
import type { ReactNode } from 'react';
import { Pill } from '../../site/kit';
import { AgentHead, Source } from '../agents/agent-kit';
import { cx } from '../../lib/cx';
import './teaching.css';

/** A skill Marco learned: its name, where it came from, when, how often it was used, the last use, and whether it’s on. */
export type Skill = { name: string; from: ReactNode; when: string; used: number; last: string; off?: string; fresh?: boolean };

/** Marco’s skills, newest first. Every one was learned from a session or a correction; none is hidden. */
export const marcoSkills: Skill[] = [
  { name: 'Paying Bohol Diesel Depot’s agreed price rises', from: <>Ramon corrected me · <Source>Run #0290</Source></>, when: '14 Sep', used: 2, last: 'Today, run #0318', fresh: true },
  { name: 'Spotting resent invoices', from: <>Ramon confirmed one I flagged · <Source>Run #0254</Source></>, when: '17 Aug', used: 14, last: 'Today, run #0318' },
  { name: 'Handling split deliveries: two invoices against one PO', from: <>Ramon corrected me · <Source>Run #0212</Source></>, when: '21 Jul', used: 9, last: 'Today, run #0318' },
  { name: 'Holding invoices until the goods arrive', from: <>Ramon corrected me · <Source>Run #0203</Source></>, when: '13 Jul', used: 11, last: 'Today, run #0318' },
  { name: 'Paying Davao suppliers on Fridays', from: <>Ramon told me · <Source>Session, 6 Jul</Source></>, when: '6 Jul', used: 8, last: 'Fri 18 Sep', off: 'Turned off by Ramon, 23 Sep' },
];

/** The Skills tab on Marco’s page: every skill he has learned, with where it came from and the three actions. */
export function SkillsTab({ skills = marcoSkills, note }: { skills?: Skill[]; note?: ReactNode }) {
  return (
    <div className="as-a-page">
      <AgentHead id="marco" on="Skills" />
      <p className="tc-p">{note ?? 'Ways of doing a task that Marco has picked up from sessions and corrections. Anyone who can open Marco sees them; Ramon, as owner, can edit, turn off, or forget any of them.'}</p>
      <table className="m-tbl tc-tbl">
        <thead><tr><th>Skill</th><th>Learned from</th><th className="r">Used</th><th>Last used</th><th /></tr></thead>
        <tbody>{skills.map(s => (
          <tr key={s.name} className={cx(s.fresh && 'tc-new', s.off && 'tc-off')}>
            <td><a className="m-link">{s.name}</a>{s.fresh && <Pill tone="ok">New</Pill>}{s.off && <small>{s.off}</small>}</td>
            <td>{s.from}<small>{s.when}</small></td>
            <td className="r">{`${s.used} times`}</td>
            <td>{s.last}</td>
            <td><span className="tc-mem-acts"><a>Edit</a><a>{s.off ? 'Turn on' : 'Turn off'}</a><a>Forget</a></span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

/** The note under an Agent’s reply when it learns a skill: what it learned, See skills, and Undo. */
export function Learned({ children }: { children: ReactNode }) {
  return <p className="tc-learned"><i>✓</i><span><b>Learned a skill:</b> {children}</span><a>See skills</a><a>Undo</a></p>;
}
