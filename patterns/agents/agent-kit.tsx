// Agent drawings for the Agent Interfaces edition: the cast, the app frame with Agents in its top bar, the chat panel
// and its feed, the approval card, and the runs list. Not a page itself: catalog.ts has no "agent-kit".
import { Children, isValidElement, type ReactNode } from 'react';
import { Btn, Ini, Pill } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { cx } from '../../lib/cx';
import './agents.css';

/* ---------- the cast ---------- */

export type AgentId = 'marco' | 'nico' | 'bea';

/** The three Agents at Metro Lending, with their owner (the person accountable for them) and what each is doing now. */
export const agentsCast: Record<AgentId, { name: string; ini: string; role: string; owner: string; him: string; status: string }> = {
  marco: { name: 'Marco', ini: 'MA', role: 'Finance Operations Agent', owner: 'Ramon Cruz', him: 'him', status: 'Waiting on you · payment run #0318' },
  nico: { name: 'Nico', ini: 'NI', role: 'Reporting and Analytics Agent', owner: 'Ramon Cruz', him: 'him', status: 'Sent the September collections report' },
  bea: { name: 'Bea', ini: 'BE', role: 'Business Development Agent', owner: 'Liza Tan', him: 'her', status: 'Drafting a proposal for Cebu Grains' },
};

/** An Agent’s round initials, always with the AI badge. `lg` for headers and profiles. */
export function AgentAva({ id, size }: { id: AgentId; size?: 'sm' | 'lg' }) {
  return <span className={cx('ag-ava', size)}><Ini n={agentsCast[id].ini} agent /></span>;
}

/* ---------- the frame ---------- */

/**
 * The app frame with Agents in the top bar, anchored right: bell · Agents · the signed-in person’s initials. The Agents
 * button opens the Agents window (and the right bar); its green badge counts what Agents are waiting on you for
 * (`waiting`), and `on="Agents"` highlights it. `me` sets the initials (by default from `as`); `top` replaces the whole
 * right side. Everything else is Frame: pass the chat panel as `overlay`.
 */
export function AgentFrame({ on = 'Invoices', as = 'lead', waiting = 2, me, bell = 3, loud, overlay, top, foot, children }: {
  on?: string; as?: 'staff' | 'lead' | 'admin'; waiting?: number; me?: string; bell?: number; loud?: boolean;
  overlay?: ReactNode; top?: ReactNode; foot?: ReactNode; children: ReactNode;
}) {
  const ini = me ?? { staff: 'AR', lead: 'RC', admin: 'CM' }[as];
  return (
    <div className={cx('ag-frame', overlay != null && 'ag-has-panel')}>
      <Frame on={on} as={as} loud={loud} overlay={overlay} foot={foot} top={top ?? <>
        {bell > 0 && <span className="as-bell">{bell}</span>}
        <span className={cx('ag-top', on === 'Agents' && 'on')}>Agents{waiting > 0 && <em>{waiting}</em>}</span>
        <Ini n={ini} />
      </>}>{children}</Frame>
    </div>
  );
}

/* ---------- an Agent’s page ---------- */

/** The six tabs of an Agent’s page, the same for every Agent. */
export const agentTabs = ['Instructions', 'Sessions', 'Schedule', 'Memory', 'Skills', 'Commands'] as const;
export type AgentTab = typeof agentTabs[number];

/** Pages that open from the header’s ••• menu, each with its own breadcrumb: Agents / Marco / Runs. Never tabs. */
export const agentViews = ['Runs', 'Report'] as const;

/**
 * The header of every Agent’s page: breadcrumb, avatar, name, role and owner, then Pause (or Resume… once paused),
 * Open chat, and •••, which opens the views above. Under it, the six tabs with `on` underlined. A ••• view (`view`)
 * or a page inside a tab (`crumb`) swaps the tabs for its breadcrumb. `acts` adds buttons before Pause; `menu` draws
 * the ••• menu open.
 */
export function AgentHead({ id, on = 'Instructions', view, crumb = [], title, meta, acts, paused, pausedBy, menu }: {
  id: AgentId; on?: AgentTab; view?: string; crumb?: string[]; title?: ReactNode; meta?: ReactNode; acts?: ReactNode;
  paused?: boolean; pausedBy?: string; menu?: boolean;
}) {
  const a = agentsCast[id];
  const steps = view ? ['Agents', a.name, view, ...crumb] : crumb.length ? ['Agents', a.name, on, ...crumb] : ['Agents', a.name];
  const isPaused = paused || pausedBy != null;
  const sub = crumb.length > 0;
  return (
    <>
      <p className="as-crumb">{steps.map((s, i) => i < steps.length - 1 ? <span key={s}>{s}<span>/</span></span> : <b key={s}>{s}</b>)}</p>
      <div className="as-a-head">
        <div className="ag-id">
          <AgentAva id={id} size="lg" />
          <div>
            <p className="m-title">{title ?? (sub ? crumb[crumb.length - 1] : view ? `${a.name}’s ${view.toLowerCase()}` : a.name)}</p>
            <p className="as-meta">{meta ?? <span>{`${a.role} · owned by ${a.owner}`}</span>}{isPaused && <span className="ag-paused">{pausedBy ?? 'Paused'}</span>}</p>
          </div>
        </div>
        <span className="as-acts">
          {acts}
          {!sub && <>
            <span className={cx('ag-pause', isPaused && 'paused')}>{isPaused ? '▶ Resume…' : 'Pause'}</span>
            <Btn kind={acts ? undefined : 'pri'}>Open chat</Btn>
            <span className="ag-more">
              <Btn kind="quiet" className={cx(menu && 'on')}>•••</Btn>
              {menu && <span className="ag-menu">
                {agentViews.map(v => <p key={v} className={cx(v === view && 'on')}>{v}</p>)}
                <p className="sep">Decommission…</p>
              </span>}
            </span>
          </>}
        </span>
      </div>
      {!view && !sub && <p className="as-a-tabs ag-tabs">{agentTabs.map(t => <span key={t} className={t === on ? 'on' : undefined}>{t}</span>)}</p>}
    </>
  );
}

/** A drawer from the right over an Agent’s page, for editing one thing: a title, what it belongs to, the body, and its buttons. */
export function AgentDrawer({ title, sub, foot, children }: { title: ReactNode; sub?: ReactNode; foot?: ReactNode; children: ReactNode }) {
  return (
    <div className="ag-drawer">
      <div className="ag-drawer-h"><div><b>{title}</b>{sub && <small>{sub}</small>}</div><span className="ag-x">×</span></div>
      <div className="ag-drawer-b">{children}</div>
      {foot && <div className="ag-drawer-f">{foot}</div>}
    </div>
  );
}

/* ---------- chat ---------- */

/**
 * The chat header: who, their role, what they’re doing, then Pause (red only once paused) and ×. Once paused, the
 * status says who paused it and when (`pausedBy`: “Paused by Ramon, 3:30 PM”), and the button reads Resume…, which
 * opens a confirmation page.
 */
function ChatHead({ agent, status, paused, pausedBy, close = true }: { agent: AgentId; status: ReactNode; paused?: boolean; pausedBy?: string; close?: boolean }) {
  const a = agentsCast[agent];
  const isPaused = paused || pausedBy != null;
  return (
    <div className="ag-head">
      <AgentAva id={agent} />
      <div className="ag-who"><b>{a.name}</b><small>{a.role}</small><span className={cx('ag-st', isPaused && 'paused')}>{isPaused ? (pausedBy ?? 'Paused') : status}</span></div>
      <span className={cx('ag-pause', isPaused && 'paused')}>{isPaused ? (pausedBy != null ? '▶ Resume…' : '▶ Resume') : 'Pause'}</span>
      {close && <span className="ag-x">×</span>}
    </div>
  );
}

/** The message box at the foot of a chat. */
function Composer({ agent, text }: { agent: AgentId; text?: string }) {
  const a = agentsCast[agent];
  return <div className="ag-in"><span>{text ?? `Ask ${a.name}, or tell ${a.him} what to change…`}</span><i>↑</i></div>;
}

/**
 * The chat panel: a full-height drawer from the right, beside the work. Pass it to AgentFrame as `overlay`.
 * `onPage` names what the Agent can see from here, such as “Invoices · Overdue in Cebu”.
 */
export function ChatPanel({ agent, status, paused, pausedBy, onPage, composer, children }: {
  agent: AgentId; status: ReactNode; paused?: boolean; pausedBy?: string; onPage?: ReactNode; composer?: string; children: ReactNode;
}) {
  return (
    <div className="ag-panel">
      <ChatHead agent={agent} status={status} paused={paused} pausedBy={pausedBy} />
      {onPage && <p className="ag-on">Looking at <b>{onPage}</b></p>}
      <div className="ag-feed">{children}</div>
      <Composer agent={agent} text={composer} />
    </div>
  );
}

/* ---------- sessions ---------- */

/** One session in the Agents window: the Agent, what it’s about, where it stands, and when. */
export type SessionRow = [agent: AgentId, title: string, state: string, when: string];

/** Ramon’s sessions, newest first, as on Where the Agent lives. */
export const agentSessions: SessionRow[] = [
  ['marco', 'Payment run #0318', 'Waiting on you', '7:40 AM'],
  ['nico', 'Baguio collections in September', 'Answered', '9:12 AM'],
  ['bea', 'Proposal for Abad Trucking', 'Waiting on Liza', 'Yesterday'],
  ['marco', 'Bank lines, 25 to 27 Sep', 'Done', 'Sun'],
];

/** The sessions column of the Agents window: All Agents at the top, then New, then one row per session. */
export function SessionList({ rows = agentSessions, on }: { rows?: SessionRow[]; on?: string }) {
  return (
    <div className="ag-sess">
      <p className="ag-sess-all"><a className="m-link">All Agents</a></p>
      <p className="ag-sess-h"><b>Sessions</b><Btn>New</Btn></p>
      {rows.map(([id, t, st, at]) => (
        <p key={t} className={cx('ag-s', t === on && 'on')}>
          <AgentAva id={id} size="sm" />
          <span><b>{t}</b><small>{`${agentsCast[id].name} · ${st}`}</small></span>
          <em>{at}</em>
        </p>
      ))}
    </div>
  );
}

/**
 * The full-page chat, as the children of AgentFrame on="Agents": sessions on the left, one conversation on the right.
 * `session` names the open one (by default the first of this Agent’s); `sessions` replaces the list.
 */
export function ChatPage({ agent, status, paused, pausedBy, composer, session, sessions = agentSessions, children }: {
  agent: AgentId; status: ReactNode; paused?: boolean; pausedBy?: string; composer?: string;
  session?: string; sessions?: SessionRow[]; children: ReactNode;
}) {
  const on = session ?? sessions.find(([id]) => id === agent)?.[1];
  return (
    <div className="ag-page">
      <SessionList rows={sessions} on={on} />
      <div className="ag-conv">
        <ChatHead agent={agent} status={status} paused={paused} pausedBy={pausedBy} close={false} />
        <div className="ag-feed">{children}</div>
        <Composer agent={agent} text={composer} />
      </div>
    </div>
  );
}

/** A day heading in the feed: “Today”, “Earlier this week”. */
export const Day = ({ label }: { label: string }) => <p className="ag-day">{label}</p>;

/** A message from the person signed in: a dark bubble on the right, with their initials. */
export const Me = ({ ini = 'RC', children }: { ini?: string; children: ReactNode }) => (
  <div className="ag-me"><p>{children}</p><Ini n={ini} /></div>
);

/**
 * Plain text mixed with inline elements (a link, bold, a source chip), which should flow as one paragraph. Messages
 * built only from elements, such as several spans stacked as lines, are left as they are.
 */
const inlineTags = new Set(['a', 'b', 'strong', 'em', 'i', 'small', 'span', 'code', 'br', 'q']);
function isInline(children: ReactNode): boolean {
  const kids = Children.toArray(children);
  return kids.some(c => typeof c === 'string' && c.trim() !== '') && kids.every(c =>
    typeof c === 'string' || typeof c === 'number' ||
    (isValidElement(c) && ((typeof c.type === 'string' && inlineTags.has(c.type)) || c.type === Source)));
}

/**
 * A message from the Agent, on the left. Give `agent` to show its avatar (in a feed with more than one Agent).
 * Text with inline pieces (a link, a source chip) is wrapped in one paragraph so it flows on one line; blocks such
 * as Steps or a card stack as before.
 */
export const Msg = ({ agent, children }: { agent?: AgentId; children: ReactNode }) => (
  <div className="ag-msg">{agent && <AgentAva id={agent} size="sm" />}<div className="ag-bub">{isInline(children) ? <p>{children}</p> : children}</div></div>
);

/** Tool lines: what the Agent did, one per line. true is done (✓), false is still going, 'flag' needs a person (!). */
export function Steps({ items }: { items: [boolean | 'flag', ReactNode][] }) {
  return (
    <ul className="ag-steps">
      {items.map(([d, t], i) => <li key={i} className={d === 'flag' ? 'flag' : d ? 'done' : 'going'}><i>{d === 'flag' ? '!' : d ? '✓' : '◌'}</i><span>{t}</span></li>)}
    </ul>
  );
}

/** The Agent asks back: a question, then its options as buttons. `picked` marks the answer once given. */
export function Ask({ question, options, picked }: { question: ReactNode; options: string[]; picked?: string }) {
  return (
    <div className="ag-ask">
      <p>{question}</p>
      <span>{options.map(o => <Btn key={o} className={cx('ag-opt', o === picked && 'on')}>{o}</Btn>)}</span>
    </div>
  );
}

/* ---------- showing the work ---------- */

/** The one plain line of why, under a decision. */
export const Reason = ({ children }: { children: ReactNode }) => <span className="ag-why">{children}</span>;

/** A link chip to the record a figure came from: INV-8807, PO-4471, an email. */
export const Source = ({ children }: { children: ReactNode }) => <a className="ag-src">↗ {children}</a>;

/** The red pill on anything an Agent left for a person. */
export const HeldPill = ({ children = 'Held' }: { children?: ReactNode }) => <Pill tone="bad">{children}</Pill>;

/** One line of a proposal: a name, an amount, and the reason and sources under it. `held` draws it as left for a person. */
export function Line({ name, amount, why, sources, held }: { name: ReactNode; amount?: ReactNode; why?: ReactNode; sources?: ReactNode[]; held?: boolean }) {
  return (
    <div className={cx('ag-line', held && 'held')}>
      <p><span>{held && <HeldPill />}{name}</span><b>{amount ?? (held ? 'not paid' : '')}</b></p>
      {(why || sources) && <p className="ag-line-s">{why && <Reason>{why}</Reason>}{sources?.map((s, i) => <Source key={i}>{s}</Source>)}</p>}
    </div>
  );
}

/**
 * The card an Agent posts when it needs a decision: what it proposes, the key facts, its lines, what it held, and two
 * answers. Approving money opens a confirmation page, so the primary label ends in “…” (Approve…).
 */
export function ApprovalCard({ title, meta, facts, lines, held, primary = 'Approve…', secondary = 'Suggest changes', third, note }: {
  title: ReactNode; meta?: ReactNode; facts: [string, ReactNode][]; lines?: ReactNode[]; held?: ReactNode;
  primary?: string; secondary?: string;
  /** A third, quiet answer, such as Reject… */
  third?: string;
  /** Who decides, under the buttons: “You approve. Finance heads only.” */
  note?: ReactNode;
}) {
  return (
    <div className="ag-card">
      <div className="ag-card-h"><b>{title}</b>{meta && <small>{meta}</small>}</div>
      <p className="ag-facts">{facts.map(([k, v]) => <span key={k}><small>{k}</small>{v}</span>)}</p>
      {lines && <div className="ag-lines">{lines.map((l, i) => <div key={i}>{l}</div>)}</div>}
      {held && <div className="ag-held">{held}</div>}
      <p className="ag-acts"><Btn kind="pri">{primary}</Btn><Btn>{secondary}</Btn>{third && <Btn kind="quiet">{third}</Btn>}{note && <small>{note}</small>}</p>
    </div>
  );
}

/* ---------- runs ---------- */

export type RunState = 'Waiting on you' | 'Running' | 'Done' | 'Partly done' | 'Failed' | 'Undone';

/** One run: a record of one piece of Agent work. */
export type RunRowData = { no: string; agent: AgentId; task: ReactNode; started: string; state: RunState; result: ReactNode; by?: ReactNode };

const tone: Record<RunState, 'ok' | 'bad' | 'off' | undefined> = {
  'Waiting on you': undefined, Running: undefined, Done: 'ok', 'Partly done': 'bad', Failed: 'bad', Undone: 'off',
};

/** A row of the runs list. Use inside RunTable. */
export function RunRow({ no, agent, task, started, state, result, by }: RunRowData) {
  return (
    <tr className={cx(state === 'Waiting on you' && 'ag-wait')}>
      <td><a className="m-link">{no}</a></td>
      <td><span className="ag-cell"><AgentAva id={agent} size="sm" />{agentsCast[agent].name}</span></td>
      <td>{task}</td>
      <td>{started}</td>
      <td><Pill tone={tone[state]}>{state}</Pill></td>
      <td>{result}</td>
      <td>{by ?? <span className="ag-none">—</span>}</td>
    </tr>
  );
}

/** The runs list: run no., Agent, task, started, state, result, and who approved. */
export function RunTable({ rows }: { rows: RunRowData[] }) {
  return (
    <table className="m-tbl ag-runs">
      <thead><tr><th>Run</th><th>Agent</th><th>Task</th><th>Started</th><th>State</th><th>Result</th><th>Approved by</th></tr></thead>
      <tbody>{rows.map(r => <RunRow key={r.no} {...r} />)}</tbody>
    </table>
  );
}
