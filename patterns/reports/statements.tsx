import { Section, Demo, Pair, Rules, Avoid, Win } from '../../site/kit';
import { Statement, byMonth } from './report-kit';
import './reports.css';

// Statements and tables: how a shaped report lays out its figures. Grouped rows, subtotals that add up on the page,
// a total column set apart, and amounts that line up.

export default function Statements() {
  return (
    <>
      <Demo wide caption="The body of a profit and loss. Groups with headings, lines indented under them, subtotals ruled above, the net income ruled twice, and the quarter’s total in its own shaded column. Every figure lines up on the right.">
        <Win title="Profit and loss · Q3 2026" className="rp-win"><Statement data={byMonth} links /></Win>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Grouped, indented, and ruled. Amounts taken off in brackets, the same way every time. Pesos in the header, not on every figure.">
          <Win title="Profit and loss" className="rp-win">
            <Statement data={{ cols: ['Sep 2026', 'Q3 2026'], rows: [
              ['Total income', ['5,941,000', '17,038,000'], 'sub'],
              ['Provision for loan losses', ['(455,000)', '(1,237,000)'], 'indent'],
              ['Total expenses', ['(2,683,000)', '(7,836,000)'], 'indent'],
              ['Net income', ['2,803,000', '7,965,000'], 'grand'],
            ] }} />
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A database table: every row the same weight, amounts left-aligned in mixed formats, no subtotals, and a minus sign that hides in the digits.">
          <Win title="rpt_pnl_q3" className="rp-win">
            <table className="rp-bad">
              <thead><tr><th>account_name</th><th>amount</th></tr></thead>
              <tbody>
                <tr><td>INT_INCOME</td><td>15070000</td></tr>
                <tr><td>FEES_PEN</td><td>1968000.00</td></tr>
                <tr><td>PROV_LL</td><td>-1237000</td></tr>
                <tr><td>SAL_EXP</td><td>5,610,000</td></tr>
                <tr><td>RENT_UTIL</td><td>1279000</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Group, indent, and subtotal.', 'Income, then its lines indented, then Total income ruled above. The reader follows the sum down the page.'],
            ['Every total adds up on the page.', 'Subtotals equal their lines, and the total column equals its months. Round once, at the end.'],
            ['Set the total apart.', 'A shaded total column on the right, and the bottom line ruled twice.'],
            ['Line the figures up.', 'Right-aligned, equal-width digits, the same decimals in a column, the unit in the header.'],
            ['Every figure opens its records.', 'Interest income for September opens the interest postings behind it. See Drill-down.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Every row the same weight.', 'People can’t tell a total from a line, and add them twice.'],
            ['Totals that don’t match their lines.', 'Rounding each line separately leaves totals ₱1 off, and people stop trusting it.'],
            ['Totals mixed in with everything else.', 'The number people came for is hard to find.'],
            ['Left-aligned, mixed-format amounts.', '15070000 above 5,610,000: nobody can compare them at a glance.'],
            ['Figures that go nowhere.', 'People export to Excel to find out what’s behind a number.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
