// The focus view, for Chat › Record and chat, full screen, and the Reconcile example: one record or file large on the
// left, the chat on the right, and a slim strip across the top (← Agents, the record’s name, Exit full screen). No app
// sidebar and no sessions column. Also draws BDO ••4471’s September statement, checked and with Marco’s drafted fixes
// marked in place. Not a page itself: catalog.ts has no "focus-kit". Styles are in chat.css, prefix fv-.
import type { ReactNode } from 'react';
import { Win, Btn, Pill } from '../../site/kit';
import { AgentAva, Reason, Source, HeldPill, agentsCast, type AgentId } from '../agents/agent-kit';
import { cx } from '../../lib/cx';
import './chat.css';

/**
 * The focus view: the record (about two thirds) and the chat (a third), under a slim strip. `title` is the record’s
 * name, `sub` a quiet line beside it, `back` where the arrow goes (the Agents window). `composer` fills the message box.
 */
export function FocusView({ title, sub, back = 'Agents', agent = 'marco', status, composer, record, chat }: {
  title: ReactNode; sub?: ReactNode; back?: string; agent?: AgentId; status: ReactNode; composer?: string;
  record: ReactNode; chat: ReactNode;
}) {
  const a = agentsCast[agent];
  return (
    <Win title="Loans OS" className="fv">
      <div className="fv-top">
        <a className="fv-back">← {back}</a>
        <span className="fv-name"><b>{title}</b>{sub && <small>{sub}</small>}</span>
        <Btn>Exit full screen</Btn>
      </div>
      <div className="fv-body">
        <div className="fv-rec">{record}</div>
        <div className="fv-chat">
          <div className="fv-ch">
            <AgentAva id={agent} />
            <span className="ag-who"><b>{a.name}</b><span className="ag-st">{status}</span></span>
            <span className="ag-pause">Pause</span>
          </div>
          <div className="ag-feed">{chat}</div>
          <div className={cx('ag-in', composer && 'fv-typed')}><span>{composer ?? `Ask ${a.name}, or tell ${a.him} what to change…`}</span><i>↑</i></div>
        </div>
      </div>
    </Win>
  );
}

/** A quiet line in the feed for something done in the record, not typed: “You approved line 162.” */
export const Event = ({ children }: { children: ReactNode }) => <p className="fv-ev">{children}</p>;

/* ---------- the statement ---------- */

const stTitle = 'BDO ••4471 · September statement';

/** The statement’s heading: name, where it came from, three numbers, and which lines are showing. */
function Head({ facts, views }: { facts: [string, ReactNode][]; views: [string, number, boolean?][] }) {
  return (
    <>
      <div className="fv-head">
        <div><p className="m-title">{stTitle}</p><p className="as-meta"><span>1–25 Sep 2026 · BDO-4471-Sep-2026.csv · uploaded by Ramon, 10:02 AM</span></p></div>
        <Btn kind="quiet">Download</Btn>
      </div>
      <p className="fv-facts">{facts.map(([k, v]) => <span key={k}><small>{k}</small>{v}</span>)}</p>
      <p className="fv-views">{views.map(([v, n, on]) => <span key={v} className={cx(on && 'on')}>{v}<em>{n}</em></span>)}</p>
    </>
  );
}

/** A bank line: line no., date, what the bank says, the amount, and what the books hold for it. */
type BankLine = [no: string, date: string, desc: string, amount: string, books?: ReactNode];

const Row = ({ l, flag }: { l: BankLine; flag?: boolean }) => (
  <tr className={cx(flag && 'fv-hot')}>
    <td>{l[0]}</td><td>{l[1]}</td><td>{l[2]}</td><td className="r">{l[3]}</td>{l[4] !== undefined && <td>{l[4]}</td>}
  </tr>
);

/** A run of lines not shown: “⋯ lines 1–86”. */
const Gap = ({ label, cols }: { label: string; cols: number }) => <tr className="fv-gap"><td colSpan={cols}>{`⋯ ${label}`}</td></tr>;

/** What the Agent found on a line, under it: a pill and one sentence. */
const Finding = ({ pill, children }: { pill: ReactNode; children: ReactNode }) => (
  <tr className="fv-sub"><td /><td colSpan={3}><p className="fv-find">{pill}<span>{children}</span></p></td></tr>
);

export type DraftState = 'draft' | 'approved' | 'changed' | 'ask';

/**
 * A drafted change, marked in place under the line it fixes: Draft, the kind of change, what it would do, why, its
 * sources, and Approve / Reject / Edit. `approved` shows the decision; `changed` marks one the chat just changed; `ask`
 * holds a question instead of a change.
 */
export function Draft({ kind, what, why, sources, state = 'draft', options }: {
  kind: string; what: ReactNode; why: ReactNode; sources: string[]; state?: DraftState;
  /** For a question: the answers, as buttons. */
  options?: string[];
}) {
  return (
    <div className={cx('fv-draft', state)}>
      <div>
        <p className="fv-dh">
          <em>{state === 'ask' ? 'Question' : state === 'approved' ? '✓ Approved' : 'Draft'}</em>
          <small>{kind}</small>
          <b>{what}</b>
          {state === 'changed' && <i>Changed just now</i>}
        </p>
        <p className="ag-line-s"><Reason>{why}</Reason>{sources.map(s => <Source key={s}>{s}</Source>)}</p>
        {options && <span className="fv-opts">{options.map(o => <Btn key={o}>{o}</Btn>)}</span>}
      </div>
      {state !== 'approved' && state !== 'ask' && <span className="fv-da"><Btn>Approve</Btn><Btn>Edit</Btn><Btn kind="quiet">Reject</Btn></span>}
    </div>
  );
}

const DraftRow = ({ children }: { children: ReactNode }) => <tr className="fv-sub"><td /><td colSpan={4}>{children}</td></tr>;

/** Step 1: the file checked on its own. The lines around the two findings; nothing matched yet. */
function Checked() {
  return (
    <>
      <Head facts={[['Opening, 1 Sep', '₱18,402,315.60'], ['Closing, 25 Sep', '₱21,545,125.35'], ['Balances', <span className="fv-ok">Agree ✓</span>]]}
        views={[['All lines', 214, true], ['Flagged', 2]]} />
      <table className="m-tbl fv-tbl">
        <thead><tr><th>Line</th><th>Date</th><th>What the bank says</th><th className="r">₱</th></tr></thead>
        <tbody>
          <Gap label="lines 1–86" cols={4} />
          <Row l={['87', '14 Sep', 'Check deposit · Visayan Hardware · chk 000812', '+ 128,400.00']} />
          <Row l={['88', '14 Sep', 'Transfer in · Northstar Supply · ref 5520913', '+ 152,000.00']} />
          <Row l={['89', '14 Sep', 'Transfer in · Northstar Supply · ref 5520913', '+ 152,000.00']} flag />
          <Finding pill={<HeldPill>Repeated</HeldPill>}><b>Repeats line 88.</b> The balances only agree counting it once, so Marco has.</Finding>
          <Row l={['90', '14 Sep', 'Transfer out · Mactan Steel Supply', '− 412,300.00']} />
          <Gap label="lines 91–130" cols={4} />
          <Row l={['131', '17 Sep', 'Cash deposit · Cebu branch', '+ 45,000.00']} flag />
          <Finding pill={<Pill>Unclear</Pill>}><b>No name on the line.</b> Marco will ask about it once the rest are matched.</Finding>
          <Row l={['132', '17 Sep', 'Transfer out · Bohol Diesel Depot', '− 96,500.00']} />
          <Gap label="lines 133–214" cols={4} />
        </tbody>
      </table>
      <p className="fv-foot"><small>Read from the file. Nothing in the system has changed.</small><Btn>Open the file</Btn></p>
    </>
  );
}

const none = <span className="fv-none">Nothing</span>;

/**
 * Steps 2 and 3: the 6 lines that don’t match, each with Marco’s drafted fix under it. `split` is after Ramon asked
 * for the bank charges in two and approved line 162.
 */
function Fixes({ split }: { split?: boolean }) {
  return (
    <>
      <Head facts={[['Closing, 25 Sep', '₱21,545,125.35'], ['Matched', '207 of 213'], ['To fix', '6']]}
        views={[['To fix', 6, true], ['Matched', 207], ['All lines', 214]]} />
      <table className="m-tbl fv-tbl">
        <thead><tr><th>Line</th><th>Date</th><th>What the bank says</th><th className="r">₱</th><th>In the books</th></tr></thead>
        <tbody>
          <Row l={['97', '15 Sep', 'Deposit · Amihan Foods', '+ 86,500.00', <span className="fv-bad">PAY-0934, PAY-0936</span>]} />
          <DraftRow><Draft kind="Void" what="PAY-0936, Amihan Foods" why="Recorded twice on 15 Sep; the bank shows one deposit." sources={['PAY-0934', 'PAY-0936']} /></DraftRow>
          <Row l={['131', '17 Sep', 'Cash deposit · Cebu', '+ 45,000.00', none]} />
          <DraftRow>
            <Draft kind="Record payment" state="ask" what="Whose is this deposit?" why="Abad Trucking promised ₱45,000.00 for 16 Sep; Mandaue Glassworks owes ₱45,000.00." sources={['INV-1055']}
              options={['Abad Trucking', 'Mandaue Glassworks', 'Leave it unmatched']} />
          </DraftRow>
          <Row l={['162', '21 Sep', 'Transfer in · Pacific Cartons', '+ 318,000.00', none]} />
          <DraftRow><Draft kind="Record payment" state={split ? 'approved' : 'draft'} what="₱318,000.00 against INV-1047" why="Ref PC-318. It pays INV-1047 to the peso; no payment was recorded." sources={['INV-1047']} /></DraftRow>
          <Row l={['178', '22 Sep', 'Transfer out · Cebu Paperworks', '− 186,400.00', 'BP-0412 · 184,600.00']} />
          <DraftRow><Draft kind="Correct" what="BP-0412 to ₱186,400.00" why="Cleared at INV-8807’s amount; two digits were swapped when keyed in." sources={['BP-0412', 'INV-8807']} /></DraftRow>
          <Row l={['211–212', '25 Sep', 'Service charge, 5 transfer fees', '− 1,250.00', none]} />
          <DraftRow>
            {split
              ? <Draft kind="Add expenses" state="changed" what="₱250.00 service charge, and ₱1,000.00 for 5 transfers" why="Split in two at Ramon’s ask. Taken by the bank; no entry yet." sources={['Line 211', 'Line 212']} />
              : <Draft kind="Add expense" what="Bank charges, ₱1,250.00" why="Taken by the bank; no entry for them yet." sources={['Line 211', 'Line 212']} />}
          </DraftRow>
          <Row l={['213', '25 Sep', 'Interest earned', '+ 1,212.40', none]} />
          <DraftRow><Draft kind="Add income" what="Interest earned, ₱1,212.40" why="Credited by the bank; no entry for it yet." sources={['Line 213']} /></DraftRow>
        </tbody>
      </table>
      <p className="fv-foot">
        <small>{split ? '1 approved · 4 drafts · 1 question.' : '5 drafts · 1 question.'} Nothing in the books changes until you apply them.</small>
        <Btn kind="pri" className={cx(!split && 'off')}>{split ? 'Apply 1 fix…' : 'Apply fixes…'}</Btn>
      </p>
    </>
  );
}

/** BDO ••4471’s September statement, as the focus view’s record: `check` (step 1), `drafted`, or `split`. */
export function Statement({ view }: { view: 'check' | 'drafted' | 'split' }) {
  return view === 'check' ? <Checked /> : <Fixes split={view === 'split'} />;
}

export const statementTitle = stTitle;
