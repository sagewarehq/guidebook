import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import { AdminPage } from './admin-kit';
import '../records/foundations.css';
import '../shell/shell.css';

// Plan and billing: what the client pays us, seen from inside their own system. The support plan and what it
// includes, usage passed through at cost as it accrues, with a forecast, the invoices, and who gets billing emails.

// Usage at cost this month: item, what was used, so far (1 to 28 Sep), forecast for September, August.
const usage: [string, string, string, string, string, boolean?][] = [
  ['Hosting', 'Server, database, backups · 28 days', '₱5,950', '₱6,380', '₱6,350'],
  ['AI usage, Agents', 'Marco · 1,720 tasks · limit ₱30,000', '₱18,480', '₱19,800', '₱14,100', true],
  ['SMS', 'Payment reminders · 8,680 texts', '₱4,340', '₱4,650', '₱4,510'],
];

// Invoices from Sageware: number, date, for, amount excl. VAT, VAT, total, status.
const invoices: [string, string, string, string, string, string, string, boolean?][] = [
  ['SW-1088', '1 Sep 2026', 'August 2026', '₱84,960.00', '₱10,195.20', '₱95,155.20', 'Due 1 Oct', true],
  ['SW-1061', '1 Aug 2026', 'July 2026', '₱163,720.00', '₱19,646.40', '₱183,366.40', 'Paid 12 Aug'],
  ['SW-1034', '1 Jul 2026', 'June 2026', '₱82,480.00', '₱9,897.60', '₱92,377.60', 'Paid 8 Jul'],
  ['SW-1007', '1 Jun 2026', 'May 2026', '₱21,960.00', '₱2,635.20', '₱24,595.20', 'Paid 5 Jun'],
];

// SW-1088's lines, each with where to see it on this page.
const lines: [string, string, string, string][] = [
  ['Care+, August 2026', '1-year plan, month 3 of 12', '₱60,000.00', 'Plan'],
  ['Hosting, at cost', 'Server, database, backups · 31 days', '₱6,350.00', 'Usage, August'],
  ['AI usage, at cost', 'Marco · 1,240 tasks', '₱14,100.00', 'Usage, August'],
  ['SMS, at cost', 'Payment reminders · 9,020 texts', '₱4,510.00', 'Usage, August'],
];

export default function Billing() {
  return (
    <>
      <Demo wide caption="Administration › Plan and billing. Three answers, with room around them: what plan they’re on, what this month has cost so far, and what the next invoice will be. Each opens its own page for the detail.">
        <AdminPage on="Plan and billing" crumb={<b>Plan and billing</b>}>
          <div className="m-row"><div><p className="m-title">Plan and billing</p><p className="as-meta"><span>Metro Lending’s account with Sageware Solutions · prices exclude VAT</span></p></div><span className="as-acts"><Btn>Change plan</Btn></span></div>
          <div className="bl-stats">
            <div className="bl-stat"><small>Your plan</small><b>Care+</b><span>₱60,000 a month</span><a className="m-link">What’s included</a></div>
            <div className="bl-stat"><small>September so far</small><b>₱28,770</b><span>About ₱30,830 by 30 Sep</span><a className="m-link">See usage</a></div>
            <div className="bl-stat"><small>Next invoice · 1 Oct</small><b>About ₱90,830</b><span>Plan plus usage</span><a className="m-link">Invoices</a></div>
          </div>
        </AdminPage>
      </Demo>

      <Demo wide caption="See usage opens Plan and billing › Usage: each item used this month, so far and forecast, beside last month. A warning sits at the top only while there’s something to act on, here AI usage 40% above August.">
        <AdminPage on="Plan and billing" crumb={<>Plan and billing <span>/</span> <b>Usage</b></>}>
          <div className="m-row"><div><p className="m-title">Usage at cost</p><p className="as-meta"><span>September, 1 to 28 Sep · no markup · updated hourly</span></p></div></div>
          <p className="um-alert"><b>AI usage is heading for ₱19,800 this month, 40% above August.</b> Marco has done 480 more tasks than in all of August, mostly matching supplier invoices. Still under your ₱30,000 limit. <a className="m-link">See Marco’s tasks</a></p>
          <table className="m-tbl bl-tbl">
            <thead><tr><th>Item</th><th>Used</th><th className="r">So far</th><th className="r">Forecast, Sep</th><th className="r">August</th></tr></thead>
            <tbody>{usage.map(([n, u, s, f, a, up]) => (
              <tr key={n}><td>{n}</td><td className="bl-used">{u}</td><td className="r">{s}</td><td className="r">{f}{up && <> <Pill tone="bad">+40%</Pill></>}</td><td className="r">{a}</td></tr>
            ))}</tbody>
            <tfoot><tr><td>Total usage</td><td /><td className="r">₱28,770</td><td className="r">₱30,830</td><td className="r">₱24,960</td></tr></tfoot>
          </table>
        </AdminPage>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Warn while there’s time to act. On 16 Sep the forecast crossed 25% above August, so Carlo and Ramon heard then: how much, why, and what they can do.">
          <Win title="Email · Wed 16 Sep 2026, 9:00 AM" className="bl-mail">
            <p className="bl-from">From Loans OS · to Carlo Mendoza, Ramon Cruz</p>
            <b>AI usage is heading 36% above August.</b>
            <p>So far this month: ₱10,240. At this pace, September ends near <b>₱19,200</b>, against ₱14,100 in August.</p>
            <p>Most of the rise is Marco: he’s matching more supplier invoices than in August. Your limit is ₱30,000 a month.</p>
            <p className="bl-acts"><Btn kind="pri">See usage</Btn><Btn>Change the limit</Btn></p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Tell them after the month is over. The first anyone hears of the jump is the invoice, with no reason and nothing left to do but pay.">
          <Win title="Email · Thu 1 Oct 2026, 6:00 AM" className="bl-mail">
            <p className="bl-from">From billing@sageware.io · to accounts@metrolending.ph</p>
            <b>Your invoice SW-1112 is ready.</b>
            <p>Amount due: <b>₱101,729.60</b></p>
            <p>This is 7% more than last month.</p>
            <p className="bl-acts"><Btn kind="pri">Pay now</Btn></p>
          </Win>
        </Demo>
      </Pair>

      <Demo wide caption="Invoices from us, newest first, each a PDF. Every amount shows before and after VAT.">
        <AdminPage on="Plan and billing" crumb={<>Plan and billing <span>/</span> <b>Invoices</b></>}>
          <div className="m-row"><div><p className="m-title">Invoices</p><p className="as-meta"><span>From Sageware Solutions · issued on the 1st, due in 30 days</span></p></div></div>
          <table className="m-tbl">
            <thead><tr><th>Invoice</th><th>Issued</th><th>For</th><th className="r">Excl. VAT</th><th className="r">VAT 12%</th><th className="r">Total</th><th>Status</th><th /></tr></thead>
            <tbody>{invoices.map(([n, d, f, a, v, t, s, due]) => (
              <tr key={n}><td>{n}</td><td>{d}</td><td>{f}</td><td className="r">{a}</td><td className="r">{v}</td><td className="r">{t}</td><td><Pill tone={due ? undefined : 'ok'}>{s}</Pill></td><td className="r"><a className="m-link">PDF</a></td></tr>
            ))}</tbody>
          </table>
          <p className="bl-note">Billing emails go to Carlo Mendoza, Ramon Cruz, and accounts@metrolending.ph. <a className="m-link">Change</a></p>
        </AdminPage>
      </Demo>

      <Demo wide caption="Open an invoice and each line points to where it came from: the plan, or that month’s usage.">
        <AdminPage on="Plan and billing" crumb={<>Plan and billing <span>/</span> Invoices <span>/</span> <b>SW-1088</b></>}>
          <div className="m-row"><div><p className="m-title">SW-1088</p><p className="as-meta"><span>August 2026 · issued 1 Sep 2026 · due 1 Oct</span></p></div><span className="as-acts"><Btn>Download PDF</Btn></span></div>
          <table className="m-tbl bl-tbl">
            <thead><tr><th>Line</th><th>Detail</th><th className="r">Excl. VAT</th><th>See it</th></tr></thead>
            <tbody>{lines.map(([n, d, a, see]) => <tr key={n}><td>{n}</td><td className="bl-used">{d}</td><td className="r">{a}</td><td><a className="m-link">{see}</a></td></tr>)}</tbody>
            <tfoot>
              <tr><td>Subtotal, excl. VAT</td><td /><td className="r">₱84,960.00</td><td /></tr>
              <tr><td>VAT 12%</td><td /><td className="r">₱10,195.20</td><td /></tr>
              <tr><td>Total due 1 Oct</td><td /><td className="r">₱95,155.20</td><td /></tr>
            </tfoot>
          </table>
        </AdminPage>
      </Demo>

      <Demo wide caption="Change plan opens a confirmation page: the new price, the day it starts, and what changes, including anything that won’t fit. Care+ is a 1-year plan, so moving to Care starts when this year ends.">
        <Frame as="admin" on="">
          <ConfirmPage crumb={['Administration', 'Plan and billing', 'Change plan']} title="Move to Care from 1 Jun 2027?" meta="You stay on Care+ at ₱60,000 a month until 31 May 2027."
            facts={[['New price', '₱20,000 a month'], ['Starts', '1 Jun 2027'], ['Plan', '1 year, paid monthly']]}
            what={[
              <><b>Hosting moves to a smaller server:</b> 1 GB memory, 1 processor, 25 GB storage. Loans OS peaks at 2.6 GB today, so we’ll talk sizing before it starts.</>,
              <><b>Response goes to next business day,</b> from within 4 business hours.</>,
              <><b>Enhancement hours, quarterly reviews, and automated tests stop.</b> Bug fixes, security updates, and monitoring carry on.</>,
              <><b>Carlo and Ramon are emailed,</b> and the change is logged in the audit trail.</>,
            ]}
            back="Back to Plan and billing" action="Move to Care" danger={false} />
        </Frame>
      </Demo>

      <Section title="When to warn">
        <When head={['What', 'Warn when', 'Who hears']} rows={[
          ['A usage jump', 'The month’s forecast is 25% above last month', 'Billing contacts, by email and on this page'],
          ['A limit you set', 'Usage reaches 80% of it, such as ₱24,000 of a ₱30,000 AI limit', 'Billing contacts, and admins'],
          ['Enhancement hours', '16 of the month’s 20 hours are used', 'Carlo, before more work is booked'],
          ['An invoice due', '7 days before the due date, if unpaid', 'Billing contacts'],
          ['The plan year ending', '60 days before, with the renewal price', 'The owner'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show usage as it accrues.', 'So far this month, a forecast to month end, and last month beside it, updated hourly.'],
            ['Warn before, never after.', 'A big jump or a nearing limit is flagged mid-month, with why and what to do.'],
            ['Every line traces to this page.', 'The plan, or a month’s usage, each linked from the invoice line.'],
            ['Say the VAT on every amount.', 'Excl. VAT, the VAT, and the total, on the page, the list, and the PDF.'],
            ['Plan changes confirm first.', 'A confirmation page with the new price, the day it starts, and what changes.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Usage only on the invoice.', 'Nobody sees AI costs climbing until the month is over.'],
            ['Warnings that arrive with the bill.', 'By 1 Oct, the extra ₱5,700 is already spent.'],
            ['A line called “Services”.', 'Finance can’t match ₱24,960 to anything, so they email us and wait.'],
            ['Amounts that mix VAT in and out.', 'The page says ₱84,960, the invoice ₱95,155.20, and nobody knows why.'],
            ['A plan change on one click.', 'The server shrinks overnight, and Loans OS slows for everyone.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
