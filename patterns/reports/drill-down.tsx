import { Section, Demo, Rules, Avoid, Win } from '../../site/kit';
import { Statement, ReportFrame, byMonth } from './report-kit';
import '../records/foundations.css';
import './reports.css';

// Drill-down: every figure in a report opens the list of records that make it up, filtered to match, with a count
// and a total that equal the figure.

export default function DrillDown() {
  return (
    <>
      <Demo wide caption="Every figure is a link, underlined with a dotted line so people see it can be opened. Hovering one highlights it and says what it opens: here, September’s interest income opens its 1,318 postings.">
        <Win title="Profit and loss · Q3 by month" className="rp-win">
          <p className="rp-legend"><span><a className="rp-drill">5,240,000</a>Every figure opens the records behind it</span></p>
          <Statement data={byMonth} link="Interest income" links />
        </Win>
      </Demo>

      <Demo wide caption="It opens the records behind it: interest postings, filtered to September and all branches, as chips people can see and change. The total at the foot is the figure they clicked, to the peso.">
        <ReportFrame on="Loans">
          <div className="as-a-page">
            <p className="as-crumb">Reports <span>/</span> Profit and loss <span>/</span> Q3 by month <span>/</span> <b>Interest income, Sep 2026</b></p>
            <div className="as-a-head"><div><p className="m-title">Interest income, Sep 2026</p><p className="as-meta"><span>From Profit and loss · Q3 by month</span></p></div><span className="as-acts"><a className="m-link">Back to the report</a></span></div>
            <p className="as-filters"><span className="as-chip">Type: Interest ×</span><span className="as-chip">Period: 1–30 Sep 2026 ×</span><span className="as-chip">Branch: All ×</span></p>
            <table className="m-tbl dd-tbl">
              <thead><tr><th>Posting</th><th>Loan</th><th>Borrower</th><th>Branch</th><th className="r">Interest</th></tr></thead>
              <tbody>
                <tr><td>28 Sep 2026</td><td><a className="m-link">LN-2207</a></td><td>Abad Trucking</td><td>Cebu</td><td className="r">48,000.00</td></tr>
                <tr><td>28 Sep 2026</td><td><a className="m-link">LN-2198</a></td><td>Metro Fuels</td><td>Cebu</td><td className="r">14,750.00</td></tr>
                <tr><td>25 Sep 2026</td><td><a className="m-link">LN-2186</a></td><td>Amihan Foods</td><td>Baguio</td><td className="r">9,200.00</td></tr>
                <tr className="dd-more"><td colSpan={5}>…and 1,315 more</td></tr>
              </tbody>
              <tfoot><tr><td colSpan={4}>1,318 postings</td><td className="r">₱5,240,000.00</td></tr></tfoot>
            </table>
          </div>
        </ReportFrame>
      </Demo>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every figure is a link, and looks it.', 'A dotted underline on every figure; on hover, a highlight and a line saying what it opens.'],
            ['Open the list, already filtered.', 'The period, branch, and type from the report become filter chips people can see and change.'],
            ['The total matches the figure.', 'The list’s count and total equal the number they clicked, to the peso.'],
            ['Say where it came from.', 'The breadcrumb and a Back to the report link lead back to the same saved report.'],
            ['Keep going down.', 'Each record in the list opens its own page: the loan, the payment, the customer.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Links that look like plain numbers.', 'Nobody knows they can click, so they export to Excel to find what’s behind a figure.'],
            ['Opening an unfiltered list.', 'People have to set the period and branch again, and often get them wrong.'],
            ['A list that doesn’t add up to the figure.', 'One peso out, and nobody trusts either the report or the list.'],
            ['Losing the report on the way back.', 'Back opens a blank report, and the period and slicing are gone.'],
            ['Stopping at a summary.', 'People can see the total by loan, but not the loan itself.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
