// Payment run #0318, drawn once for every Approvals page: Marco’s card, the run page with its lines, the Waiting on
// you list, and the confirmation page behind Approve…. The figures add up: ₱39,723,500 + ₱2,184,500 + ₱6,742,000
// = ₱48,650,000 to 32 suppliers; 3 held come to ₱3,911,150. Not a page itself: catalog.ts has no "approval-kit".
import type { ReactNode } from 'react';
import { Btn, Pill } from '../../site/kit';
import { ApprovalCard, Line, Reason, Source, HeldPill, AgentAva, agentsCast, type AgentId } from '../agents/agent-kit';
import { ConfirmPage } from '../records/confirm-kit';
import { cx } from '../../lib/cx';
import './approvals.css';

/** A cross-reference to another Agent Interfaces page. */
export const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/* ---------- the run’s lines ---------- */

type RunLine = { name: string; amount: string; why: string; sources: string[] };

/** The 2 lines Marco paid on a judgment call. */
export const calls: RunLine[] = [
  { name: 'Mactan Steel Supply', amount: '₱2,184,500.00', why: 'Pay. 2 invoices, 1 PO: a split delivery, and both halves arrived.', sources: ['PO-4410', 'DR-5561'] },
  { name: 'Bohol Diesel Depot', amount: '₱6,742,000.00', why: 'Pay. ₱42,000 over PO, but you agreed the new diesel price by email.', sources: ['Email, 12 Sep'] },
];

/** The 3 lines Marco held for a person. */
export const held: RunLine[] = [
  { name: 'Cebu Paperworks', amount: '₱186,400.00', why: 'Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend.', sources: ['INV-8807'] },
  { name: 'Luzon Packaging', amount: '₱1,318,750.00', why: 'Still ₱68,750 over PO. Their corrected invoice hasn’t come in.', sources: ['INV-2291', 'PO-4431'] },
  { name: 'Island Grains', amount: '₱2,406,000.00', why: 'Billed in full, but the warehouse hasn’t received the goods.', sources: ['PO-4452'] },
];

/** The 4 largest of the 30 clean matches; the other 26 come to ₱26,087,050.00. */
export const clean: [string, string, string][] = [
  ['Lapu-Lapu Lumber', '₱4,815,000.00', 'PO-4398'],
  ['Consolacion Cement', '₱3,960,250.00', 'PO-4402'],
  ['Danao Hardware', '₱2,742,800.00', 'PO-4417'],
  ['Talisay Printing Press', '₱2,118,400.00', 'PO-4420'],
];

export const cleanTotal = '₱39,723,500.00';

/* ---------- the card ---------- */

/** Marco’s approval card for run #0318, as it appears in chat, in Waiting on you, and on the run page. */
export function RunCard({ title = 'Payment run #0318', meta, facts, extra, held: heldLines, primary, secondary, note }: {
  title?: ReactNode; meta?: ReactNode; facts?: [string, ReactNode][]; extra?: ReactNode[];
  /** Replaces the 3 held lines, for a revised run. */
  held?: ReactNode;
  primary?: string; secondary?: string; note?: ReactNode;
}) {
  return (
    <ApprovalCard
      title={title}
      meta={meta ?? 'Pays Tue 29 Sep, 9:00 AM · prepared by Marco, 7:40 AM'}
      facts={facts ?? [['To pay', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Held', '3']]}
      lines={[
        <Line name="30 suppliers, matched to PO and delivery" amount={cleanTotal} />,
        ...calls.map(c => <Line name={c.name} amount={c.amount} why={c.why} sources={c.sources} />),
        ...(extra ?? []),
      ]}
      held={heldLines ?? <>{held.map(h => <Line key={h.name} held name={h.name} why={h.why} sources={h.sources} />)}</>}
      primary={primary}
      secondary={secondary}
      third="Reject…"
      note={note ?? 'You approve, as Finance lead. Held invoices stay unpaid until someone clears them.'}
    />
  );
}

/* ---------- the run page ---------- */

/** A checkbox, drawn. */
export const Cb = ({ on }: { on?: boolean }) => <i className={cx('as-cb', on && 'on')} />;

/** “Until” for a line left out of the approval: what happens to it next. */
export const Until = ({ children }: { children: ReactNode }) => <span className="apv-until">{children} <i>▾</i></span>;

/**
 * The run page, /payments/runs/0318: held lines first, then Marco’s judgment calls, then the 30 clean matches summed
 * in one line (`open` lists them). `checks` adds a checkbox per line and, for each line left out, its Until.
 */
export function RunPage({ checks, open, edit, untick = {}, facts, acts, bar, state = 'Waiting on you' }: {
  checks?: boolean; open?: boolean;
  /** Adds Change to each line Marco made a call on, which opens that line’s drawer. */
  edit?: boolean;
  /** Lines the person left out, beyond Marco’s held ones, with their Until. */
  untick?: Record<string, ReactNode>;
  facts?: [string, ReactNode][]; acts?: ReactNode; bar?: ReactNode; state?: ReactNode;
}) {
  const until: Record<string, ReactNode> = {
    'Cebu Paperworks': <Until>Remind me Thu 1 Oct</Until>,
    'Luzon Packaging': <Until>When the corrected invoice arrives</Until>,
    'Island Grains': <Until>When the goods are received</Until>,
    ...untick,
  };
  const row = (l: RunLine, isHeld: boolean) => {
    const on = !isHeld && !(l.name in untick);
    return (
      <tr key={l.name} className={cx(checks && !on && 'apv-out')}>
        {checks && <td><Cb on={on} /></td>}
        <td><span className="apv-nm">{isHeld && <HeldPill />}<b>{l.name}</b></span></td>
        <td><span className="apv-why"><Reason>{l.why}</Reason>{l.sources.map(s => <Source key={s}>{s}</Source>)}</span></td>
        {checks && <td>{on ? <span className="apv-pays">Pays Tue 29 Sep</span> : until[l.name]}</td>}
        <td className={cx('r', isHeld && 'apv-muted')}>{l.amount}</td>
        {edit && <td className="r"><a className="m-link">Change</a></td>}
      </tr>
    );
  };
  const head = (label: string, n: number, sub: string) => (
    <tr className="apv-grp"><td colSpan={3 + (checks ? 2 : 0) + (edit ? 1 : 0)}><b>{label}</b><em>{n}</em><span>{sub}</span></td></tr>
  );
  return (
    <div className="as-a-page apv-run">
      <p className="as-crumb">Payments <span>/</span> Payment runs <span>/</span> <b>Run #0318</b></p>
      <div className="as-a-head">
        <div>
          <p className="m-title">Payment run #0318</p>
          <p className="as-meta">{typeof state === 'string' ? <Pill>{state}</Pill> : state}<AgentAva id="marco" size="sm" /><span>Prepared by Marco today, 7:40 AM · pays Tue 29 Sep, 9:00 AM, from BDO ••4471</span></p>
        </div>
        <span className="as-acts">{acts ?? <><Btn>Suggest changes</Btn><Btn kind="pri">Approve…</Btn></>}</span>
      </div>
      <p className="as-facts apv-facts">{(facts ?? [['To pay', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Held', <b>3 · ₱3,911,150.00</b>]]).map(([k, v]) => <span key={k}><small>{k}</small>{v}</span>)}</p>
      {bar}
      <table className="m-tbl apv-tbl">
        <thead><tr>{checks && <th><i className="as-cb part" /></th>}<th>Supplier</th><th>Marco’s call</th>{checks && <th>Next</th>}<th className="r">Amount</th>{edit && <th />}</tr></thead>
        <tbody>
          {head('Held', 3, 'Not paid until someone clears them')}
          {held.map(h => row(h, true))}
          {head('Paid on a judgment call', 2, 'Read these before approving')}
          {calls.map(c => row(c, false))}
          {head('Matched cleanly', 30, 'Invoice, PO, and delivery agree')}
          <tr className="apv-sum">
            {checks && <td><Cb on /></td>}
            <td><b>{open ? '▾' : '▸'} 30 suppliers</b></td>
            <td><Reason>Each invoice matched its PO and delivery receipt, to the peso.</Reason> <a className="m-link">{open ? 'Hide' : 'Show all 30'}</a></td>
            {checks && <td><span className="apv-pays">Pays Tue 29 Sep</span></td>}
            <td className="r"><b>{cleanTotal}</b></td>
            {edit && <td />}
          </tr>
          {open && <>
            {clean.map(([n, a, po]) => (
              <tr key={n} className="apv-sub">{checks && <td />}<td>{n}</td><td><Source>{po}</Source></td>{checks && <td />}<td className="r">{a}</td>{edit && <td />}</tr>
            ))}
            <tr className="apv-sub">{checks && <td />}<td><a className="m-link">26 more</a></td><td><span className="apv-muted">Largest first</span></td>{checks && <td />}<td className="r">₱26,087,050.00</td>{edit && <td />}</tr>
          </>}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- the confirmation page ---------- */

/** /payments/runs/0318/approve, the page behind Approve…. Pass `what`, `facts`, and `action` for a variant. */
export function ApproveRun({ facts, what, action }: { facts?: [string, string][]; what?: ReactNode[]; action?: string }) {
  return (
    <ConfirmPage crumb={['Payments', 'Payment runs', 'Run #0318', 'Approve']} title="Approve payment run #0318?" meta="Prepared by Marco, Finance Operations Agent, today at 7:40 AM"
      facts={facts ?? [['Paying', '₱48,650,000.00'], ['Suppliers', '32 of 35'], ['Sent', 'Tue 29 Sep, 9:00 AM']]}
      what={what ?? [
        <><b>32 suppliers are paid ₱48,650,000.00</b> from BDO ••4471, tomorrow, Tue 29 Sep, at 9:00 AM.</>,
        <><b>3 invoices stay held,</b> as Marco flagged them: Cebu Paperworks, Luzon Packaging, and Island Grains. They go into a later run once someone clears them.</>,
        <><b>Each supplier gets a remittance email</b> once their payment is sent.</>,
        <><b>The run is marked Approved by Ramon Cruz,</b> in its history and the runs list.</>,
      ]}
      back="Back to run #0318" action={action ?? 'Approve and pay ₱48.65M'} danger={false} />
  );
}

/* ---------- Waiting on you ---------- */

/** One thing waiting on a person: a proposal (a card) or a question (options), oldest first. */
export type WaitRow = { agent: AgentId; kind: 'Proposal' | 'Question'; what: ReactNode; asked: string; due: ReactNode; late?: boolean; note?: ReactNode };

/** The Waiting on you list: each row opens its card or question. */
export function WaitList({ rows }: { rows: WaitRow[] }) {
  return (
    <table className="m-tbl apv-wait">
      <thead><tr><th>From</th><th>Waiting for</th><th>Asked ▲</th><th>Answer by</th><th /></tr></thead>
      <tbody>{rows.map((r, i) => (
        <tr key={i}>
          <td><span className="ag-cell"><AgentAva id={r.agent} size="sm" />{agentsCast[r.agent].name}</span></td>
          <td><span className="apv-wh"><Pill>{r.kind}</Pill><b>{r.what}</b></span>{r.note && <small className="apv-wnote">{r.note}</small>}</td>
          <td>{r.asked}</td>
          <td>{r.late ? <Pill tone="bad">{r.due}</Pill> : r.due}</td>
          <td className="r"><Btn>Open</Btn></td>
        </tr>
      ))}</tbody>
    </table>
  );
}

/** The Waiting on you page, /agents/waiting. */
export function WaitPage({ rows, who }: { rows: WaitRow[]; who: string }) {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Agents <span>/</span> <b>Waiting on you</b></p>
      <div className="as-a-head">
        <div><p className="m-title">Waiting on you</p><p className="as-meta"><span>{`${rows.length} from your Agents, oldest first · ${who}`}</span></p></div>
      </div>
      <p className="as-a-tabs"><span>All Agents</span><span className="on">Waiting on you {rows.length}</span><span>Runs</span></p>
      <p className="as-filters"><span className="as-chip">Agent: All ▾</span><span className="as-chip">Proposals and questions ▾</span></p>
      <WaitList rows={rows} />
    </div>
  );
}
