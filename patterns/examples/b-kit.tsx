// Pieces for writer B’s Examples pages (reminders, cleanup, proposal, catch-up): the step table, the time-saved table,
// and the Agents window, kept short. Not a page itself: catalog.ts has no "b-kit".
import type { ReactNode } from 'react';
import { When } from '../../site/kit';
import { AgentAva, ChatPage, type AgentId } from '../agents/agent-kit';
import './examples.css';

/** A link to another pattern page, by its full route: go('agentic/approvals/batch', 'Approving a batch'). */
export const go = (to: string, label: string) => <a className="m-link" href={`#/${to}`}>{label}</a>;

/** Who does a step: a person by name, or an Agent with its badge. */
export const Who = ({ agent, children }: { agent?: AgentId; children: ReactNode }) =>
  agent ? <span className="exb-who"><AgentAva id={agent} size="sm" />{children}</span> : <span className="exb-who">{children}</span>;

/** The workflow, one row per step: step, who, what happens, and the pattern page for the screen. */
export function Flow({ rows }: { rows: [who: ReactNode, what: ReactNode, screen: ReactNode][] }) {
  return <When head={['Step', 'Who', 'What happens', 'Screen']} rows={rows.map(([w, t, s], i) => [String(i + 1), w, t, s])} />;
}

/** Before and after: the work, how long it takes by hand, and with the Agent. The last row is the total, in bold. */
export function Saved({ rows, total, still }: { rows: [work: string, before: ReactNode, after: ReactNode][]; total: [ReactNode, ReactNode]; still: ReactNode }) {
  return (
    <>
      <div className="exb-saved">
        <When head={['Work', 'By hand', 'With the Agent']} rows={[...rows, [<b key="t">Altogether</b>, <b key="b">{total[0]}</b>, <b key="a">{total[1]}</b>]]} />
      </div>
      <p className="g-see">{still}</p>
    </>
  );
}

/** One session in the sessions column: agent, title, where it stands, when. */
export type Sess = [agent: AgentId, title: string, state: string, when: string];

/** The Agents window: sessions on the left, the conversation on the right, kept short. Use as the children of AgentFrame on="Agents". */
export function AgentWindow({ agent, status, session, sessions, children }: {
  agent: AgentId; status: ReactNode; session: string; sessions: Sess[]; children: ReactNode;
}) {
  return (
    <div className="exb-win">
      <ChatPage agent={agent} status={status} session={session} sessions={sessions}>{children}</ChatPage>
    </div>
  );
}
