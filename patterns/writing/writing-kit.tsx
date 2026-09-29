import type { ReactNode } from 'react';
import { Btn, Field, Pill, Toast } from '../../site/kit';
import '../records/foundations.css';

// Writing for interfaces, shown, not told: every example is drawn as the piece of UI it appears in, before and after,
// grouped by the moment it happens. Shared by the Writing chapter's pages; not a page itself (no catalog entry).

/** One before-and-after pair, each side drawn as UI. */
function Ex({ where, bad, good }: { where: string; bad: ReactNode; good: ReactNode }) {
  return (
    <figure className="wr-ex">
      <figcaption>{where}</figcaption>
      <div className="wr-sides">
        <div className="wr-side bad"><span className="wr-v">✗ Instead of</span><div className="wr-ui">{bad}</div></div>
        <div className="wr-side good"><span className="wr-v">✓ Write</span><div className="wr-ui">{good}</div></div>
      </div>
    </figure>
  );
}

/** A small dialog, or, with a crumb, the confirmation page it stands for. */
const Dlg = ({ title, body, crumb, children }: { title: string; body?: string; crumb?: string; children: ReactNode }) => (
  <div className="wr-dlg">{crumb && <small className="as-crumb">{crumb}</small>}<b>{title}</b>{body && <p>{body}</p>}<span>{children}</span></div>
);

/** A notice banner: error, warning, or info. */
const Note = ({ tone = 'bad', children }: { tone?: 'bad' | 'info'; children: ReactNode }) => <p className={`wr-note ${tone}`}>{children}</p>;

/** An empty or no-results state. */
const Empty = ({ title, body, children }: { title: string; body?: string; children?: ReactNode }) => (
  <div className="wr-empty"><b>{title}</b>{body && <p>{body}</p>}{children && <span>{children}</span>}</div>
);


/** A small table of amounts, for the numbers examples. */
const Amts = ({ rows, good }: { rows: [string, string][]; good?: boolean }) => (
  <table className={`m-tbl wr-amts${good ? ' good' : ''}`}><thead><tr><th>Invoice</th><th className={good ? 'r' : undefined}>Balance</th></tr></thead>
    <tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td className={good ? 'r' : undefined}>{b}</td></tr>)}</tbody></table>
);

/** A key-number card. */
const Kpi = ({ k, v, sub }: { k: string; v: string; sub?: string }) => <p className="wr-kpi"><small>{k}</small><b>{v}</b>{sub && <span>{sub}</span>}</p>;

/** One line of a record's history. */
const Hist = ({ who, what, when, tip }: { who: string; what: string; when: string; tip?: string }) => (
  <p className="wr-hist"><b>{who}</b> {what}<span>{when}</span>{tip && <em className="wr-tip">{tip}</em>}</p>
);

/** A report header with its period. */
const Rep = ({ period }: { period: string }) => <p className="wr-rep"><b>Collections by branch</b><span>{period} · Cebu, Baguio</span></p>;

export const groups: Record<string, [string, [string, ReactNode, ReactNode][]]> = {
  buttons: ['Buttons, links, and the questions we ask before acting.', [
    ['Button', <Btn kind="pri">Submit</Btn>, <Btn kind="pri">Create customer</Btn>],
    ['Confirming something that can’t be undone, on its confirmation page',
      <Dlg crumb="Payments / PAY-0921 / Void" title="Are you sure?"><Btn>No</Btn><Btn kind="pri">Yes</Btn></Dlg>,
      <Dlg crumb="Payments / PAY-0921 / Void" title="Void PAY-0921?" body="INV-1038 goes back to Overdue, with ₱1,180,000 owing."><Btn>Cancel</Btn><Btn kind="danger">Void payment</Btn></Dlg>],
    ['Leaving with unsaved changes',
      <Dlg title="Discard changes?"><Btn>Cancel</Btn><Btn kind="pri">OK</Btn></Dlg>,
      <Dlg title="Leave without saving?" body="Your changes to the terms will be lost."><Btn>Keep editing</Btn><Btn kind="pri">Leave</Btn></Dlg>],
    ['A link in a sentence',
      <p className="wr-p">3 invoices are unpaid. <a className="m-link">Click here</a> to view them.</p>,
      <p className="wr-p">Metro Fuels has <a className="m-link">3 unpaid invoices</a>.</p>],
  ]],
  errors: ['What went wrong, and what to do about it.', [
    ['A required field', <Field label="Customer name" value="" error="This field is required." />, <Field label="Customer name" value="" error="Enter the customer’s name." />],
    ['A field in the wrong format', <Field label="TIN" value="204-311-58" error="Invalid input." />, <Field label="TIN" value="204-311-58" error="A TIN has 12 digits. This one has 8." />],
    ['The server failed', <Note>Error 500: Internal Server Error</Note>, <Note>Couldn’t save the terms. Your changes are kept. Reference 8K24. <a>Try again</a></Note>],
    ['Not allowed', <Note>403 Forbidden</Note>, <Note>You can’t void payments. Finance can. <a>Ask Ramon</a></Note>],
    ['Signing in', <Field label="Password" value="••••••••" error="Password incorrect." />, <><Note>Wrong email or password.</Note><Field label="Password" value="••••••••" /></>],
    ['Signed out while away', <Note>Session timeout. Please login again.</Note>, <Note tone="info">You were signed out after 30 minutes away. Sign in to carry on; your draft is kept.</Note>],
    ['A colleague changed it first', <Note>Record was modified by another user.</Note>, <Note tone="info">Ramon changed the terms 2 minutes ago, from Net 30 to Net 45. <a>See his change</a></Note>],
  ]],
  empty: ['When there’s nothing to show, say why, and what to do next.', [
    ['A list with nothing in it yet', <Empty title="No data" />, <Empty title="No invoices yet." body="Invoices you create or import show up here."><Btn>Import</Btn><Btn kind="pri">New invoice</Btn></Empty>],
    ['Filters that hide everything', <Empty title="No records found" />, <Empty title="No overdue invoices in Baguio." body="31 invoices in Baguio are open or paid."><Btn>Clear filters</Btn></Empty>],
    ['A search that finds nothing', <Empty title="0 results" />, <Empty title="Nothing matches “metro fule”." body="Check the spelling, or search by invoice number." />],
  ]],
  feedback: ['Saying what happened, to what.', [
    ['Something worked', <Toast>Success!</Toast>, <Toast action="Undo">Metro Fuels archived.</Toast>],
    ['A payment recorded', <Toast>Operation completed successfully.</Toast>, <Toast>Payment recorded. ₱420,000.00 left on INV-1038.</Toast>],
    ['Part of a bulk action failed', <Toast>Operation partially completed.</Toast>, <Toast action="See which">18 reminders sent. 2 customers have no email.</Toast>],
    ['Work that ran in the background', <Toast>Export complete.</Toast>, <Toast action="Download">Your export is ready: 1,204 invoices.</Toast>],
    ['A notification', <p className="wr-notif">You have a new notification.</p>, <p className="wr-notif">Ramon approved payment run #0318, ₱48.65M.</p>],
  ]],
  labels: ['The words on the screen before anyone does anything.', [
    ['A field label', <Field label="Cust. TIN No.*" value="" />, <Field label="TIN" value="" />],
    ['Help under a field', <Field label="TIN" value="" hint="Enter valid data in the correct format." />, <Field label="TIN" value="" hint="As printed on the BIR certificate: 12 digits." />],
    ['A placeholder', <Field placeholder="Enter customer name here…" />, <Field label="Customer name" placeholder="Metro Fuels" />],
    ['A menu item', <p className="wr-nav"><span>Transactions</span></p>, <p className="wr-nav"><span>Payments</span></p>],
    ['A status', <p className="wr-p">Status: 2</p>, <Pill tone="bad">Overdue 26 days</Pill>],
    ['Dates and money', <p className="wr-p">09/28/2026 · PHP 420000</p>, <p className="wr-p">28 Sep 2026 · ₱420,000.00</p>],
  ]],
  numbers: ['One format for each kind of value, everywhere: lists, detail pages, reports, exports, and emails.', [
    ['Money in a table',
      <Amts rows={[['INV-1038', 'PHP 420000'], ['INV-1044', '2940000.5'], ['INV-1047', '318,000']]} />,
      <Amts good rows={[['INV-1038', '₱420,000.00'], ['INV-1044', '₱2,940,000.50'], ['INV-1047', '₱318,000.00']]} />],
    ['Money on a card or a chart',
      <Kpi k="Owing in Cebu" v="₱14,862,450.00" />,
      <Kpi k="Owing in Cebu" v="₱14.86M" sub="Up ₱1.2M on last month" />],
    ['Money going out, or a credit',
      <Amts rows={[['CN-0112', '(8500)'], ['CN-0113', '-8500']]} />,
      <Amts good rows={[['CN-0112', '−₱8,500.00'], ['CN-0113', '−₱8,500.00']]} />],
    ['A count', <p className="wr-p">Showing 1204 invoice(s)</p>, <p className="wr-p">Showing 1,204 invoices</p>],
    ['A percentage', <Kpi k="Collected on time" v="87.4987%" />, <Kpi k="Collected on time" v="87.5%" />],
    ['A date',
      <p className="as-facts wr-facts"><span><small>Due</small>09/02/2026</span><span><small>Issued</small>2026-08-03</span></p>,
      <p className="as-facts wr-facts"><span><small>Due</small>2 Sep 2026</span><span><small>Issued</small>3 Aug 2026</span></p>],
    ['A time, and a recent moment',
      <Hist who="Ana" what="recorded a payment" when="2026-09-28T01:14:33Z" />,
      <Hist who="Ana" what="recorded a payment" when="2 minutes ago" tip="28 Sep 2026, 9:14 AM" />],
    ['Something older than a day', <Hist who="Ramon" what="created it" when="56 days ago" />, <Hist who="Ramon" what="created it" when="3 Aug 2026" />],
    ['A period', <Rep period="01/01–09/28" />, <Rep period="1 Jan to 28 Sep 2026" />],
    ['Nothing there',
      <Amts rows={[['INV-1061', 'null'], ['INV-1072', 'N/A'], ['INV-0987', '0']]} />,
      <Amts good rows={[['INV-1061', '—'], ['INV-1072', '—'], ['INV-0987', '₱0.00']]} />],
  ]],
};

/** One group of examples, as a grid of before-and-after pairs. */
export function Examples({ id, pick }: { id?: keyof typeof groups; pick?: [string, number][] }) {
  const items = pick ? pick.map(([g, i]) => groups[g][1][i]) : groups[id!][1];
  return <div className="wr-grid">{items.map(([w, a, b]) => <Ex key={w} where={w} bad={a} good={b} />)}</div>;
}
