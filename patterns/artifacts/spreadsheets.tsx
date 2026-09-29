import { Section, Demo, Pair, Rules, Avoid, When, Win } from '../../site/kit';
import '../reports/reports.css';

// Spreadsheets (CSV, XLSX): a report or list as a file. XLSX for people, with the report's header and real numbers;
// CSV for machines, plain and consistent. The mistake is mixing the two.

export default function Spreadsheets() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="Excel: the report’s name, period, basis, and as-of time at the top; figures as numbers, so they add up in Excel; the same rows and totals as the screen.">
          <Win title="Profit and loss – Q3 by month – 28 Sep 2026.xlsx" className="ex-win">
            <table className="ex-sheet">
              <tbody>
                <tr><th>1</th><td colSpan={3}><b>Profit and loss · Q3 by month</b></td></tr>
                <tr><th>2</th><td colSpan={3}>1 Jul to 30 Sep 2026 · all branches · accrual · as of 28 Sep 2026, 9:14 AM</td></tr>
                <tr><th>3</th><td /><td className="r"><b>Sep 2026</b></td><td className="r"><b>Q3 2026</b></td></tr>
                <tr><th>4</th><td>Total income</td><td className="r">5941000</td><td className="r">17038000</td></tr>
                <tr><th>5</th><td>Provisions and expenses</td><td className="r">-3138000</td><td className="r">-9073000</td></tr>
                <tr><th>6</th><td><b>Net income</b></td><td className="r"><b>2803000</b></td><td className="r ex-f"><b>=C4+C5</b></td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="do" caption="CSV, for another system: one header row of plain column names, one row per record, amounts as plain numbers, dates as 2026-09-30. Machine-readable, and easy to check.">
          <Win title="profit-and-loss_2026-Q3_by-month.csv" className="ex-win">
            <table className="ex-sheet">
              <tbody>
                <tr><th>1</th><td>line</td><td>month</td><td>amount</td></tr>
                <tr><th>2</th><td>Interest income</td><td>2026-09</td><td className="r">5240000.00</td></tr>
                <tr><th>3</th><td>Fees and penalties</td><td>2026-09</td><td className="r">701000.00</td></tr>
                <tr><th>4</th><td>Provision for loan losses</td><td>2026-09</td><td className="r">-455000.00</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Demo verdict="avoid" caption="Half for people, half for machines: a title row a system can’t read, amounts as text with ₱ and commas that neither Excel nor a system can add, codes nobody recognises, and NULL for a blank.">
        <Win title="export_20260928.csv" className="ex-win">
          <table className="ex-sheet">
            <tbody>
              <tr><th>1</th><td colSpan={3}>PROFIT AND LOSS REPORT!!</td></tr>
              <tr><th>2</th><td>INT_INCOME</td><td>“₱5,240,000.00”</td><td>3</td></tr>
              <tr><th>3</th><td>FEES_PEN</td><td>“₱701,000.00”</td><td>3</td></tr>
              <tr><th>4</th><td>PROV_LL</td><td>“-455000”</td><td>NULL</td></tr>
            </tbody>
          </table>
        </Win>
      </Demo>

      <Section title="XLSX or CSV">
        <When head={['Use', 'For', 'Keeps']} rows={[
          ['XLSX', 'People working further with the figures', 'The report’s header, its rows and totals, numbers as numbers, columns formatted as pesos and dates'],
          ['CSV', 'Other systems, and anyone who wants raw data: an accounting package, a bank upload, a script', 'One header row, plain column names, plain numbers, dates as 2026-09-30, UTF-8, the period in the file name'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Same figures as the screen.', 'The same period, slicing, and rounding, so anyone can check the file against the report.'],
            ['XLSX for people, CSV for machines.', 'XLSX with the report’s header rows and formatting; CSV with one header row and nothing else.'],
            ['Numbers stay numbers.', 'No ₱ or commas in the cells; format the column instead, so sums work.'],
            ['Name the file for what’s in it.', 'Profit and loss – Q3 by month – 28 Sep 2026.xlsx.'],
            ['Large files are background jobs.', 'Anything big runs in the background, and waits in Jobs.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Files that differ from the screen.', 'Finance finds ₱1 out between the file and the report, and trusts neither.'],
            ['A CSV dressed up for people.', 'Title rows and ₱ signs break every system that tries to read it.'],
            ['Amounts saved as text.', 'Excel can’t add them, so people retype the figures.'],
            ['export_20260928.csv.', 'Five of them in Downloads, and nobody knows which is which.'],
            ['Building a big file while people wait.', 'The page freezes, they click again, and get two files.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
