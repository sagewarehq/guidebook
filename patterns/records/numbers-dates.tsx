import { Section, Demo, Pair, Rules, Avoid, When, Win } from '../../site/kit';
import './foundations.css';

// Money, counts, percentages, dates, times, and empty values: one way each, everywhere.

export default function NumbersDates() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="Money right-aligned, in figures of equal width, so the digits line up. One date format. Empty is a dash, not a zero.">
          <Win title="Payments">
            <table className="m-tbl">
              <thead><tr><th>Payment</th><th>Date</th><th className="r">Amount</th><th className="r">Fee</th></tr></thead>
              <tbody>
                <tr><td>PAY-0874</td><td>18 Sep 2026</td><td className="r">₱760,000.00</td><td className="r">₱1,250.00</td></tr>
                <tr><td>PAY-0921</td><td>28 Sep 2026</td><td className="r">₱420,000.00</td><td className="r">—</td></tr>
                <tr><td>PAY-0930</td><td>Today, 9:14 AM</td><td className="r">₱8,500.00</td><td className="r">₱45.00</td></tr>
                <tr><td>PAY-0931</td><td>Today, 9:20 AM</td><td className="r">−₱8,500.00</td><td className="r">—</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Left-aligned amounts that don’t line up, three date formats, missing decimals, and 0 where nothing was charged.">
          <Win title="Payments">
            <table className="m-tbl nd-bad">
              <thead><tr><th>Payment</th><th>Date</th><th>Amount</th><th>Fee</th></tr></thead>
              <tbody>
                <tr><td>PAY-0874</td><td>09/18/2026</td><td>PHP 760000</td><td>1250</td></tr>
                <tr><td>PAY-0921</td><td>2026-09-28</td><td>420,000.5</td><td>0</td></tr>
                <tr><td>PAY-0930</td><td>28 Sep 26 09:14:33</td><td>₱8.5K</td><td>45</td></tr>
                <tr><td>PAY-0931</td><td>just now</td><td>(8500)</td><td>0</td></tr>
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Section title="Formats">
        <When head={['What', 'Write it', 'Not']} rows={[
          ['Money in tables and forms', '₱1,180,000.00, right-aligned', 'PHP 1180000, 1.18M'],
          ['Money in headlines, cards, and charts', '₱1.18M, ₱420k', 'Full figures that wrap'],
          ['Negative money', '−₱8,500.00 (a real minus sign)', '(8500), -8500 with a hyphen'],
          ['Counts', '1,204 invoices', '1204 invoice(s)'],
          ['Percentages', '12.5%, one decimal at most', '12.4987%'],
          ['Dates', '28 Sep 2026; 28 Sep this year', '09/28/2026, 2026-09-28 on screen'],
          ['Times', '9:14 AM, in the business’s time zone', '09:14:33, UTC'],
          ['Recent moments', '2 minutes ago, with the exact time on hover and in the history', 'Relative times for anything older than a day'],
          ['Periods', '1 Jan to 28 Sep 2026', '01/01–09/28'],
          ['Nothing there', '— (an em dash)', '0, N/A, null, blank'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Numbers line up.', 'Right-align every column of numbers, and use tabular figures so each digit takes the same width.'],
          ['One format per kind of value.', 'Across lists, details, reports, exports, and emails. Define them once and use them everywhere.'],
          ['Full precision where people check, short where they scan.', 'Tables and forms show ₱1,180,000.00. Cards and chart labels may show ₱1.18M.'],
          ['Dates people can’t misread.', '28 Sep 2026 reads the same to everyone; 09/10 doesn’t.'],
          ['Empty is not zero.', 'A dash means nothing was entered; ₱0.00 means the amount is zero. They’re different facts.'],
          ['Say the unit once.', 'In the column header or the label, not repeated in every cell: “Weight (kg)”.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'Floats for money, anywhere: ₱420,000.5 is a rounding bug waiting to happen.',
          'Abbreviated money in a table people reconcile against.',
          'Times without a zone on a system used across zones.',
        ]} />
      </Section>
      </div>

    </>
  );
}
