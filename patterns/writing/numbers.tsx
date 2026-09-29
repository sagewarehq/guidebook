import { Section, When, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Numbers and dates: one format for each kind of value, everywhere.

export default function Numbers() {
  return (
    <>
      <Examples id="numbers" />

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Full figures where people check, short where they scan.', 'Tables, forms, and exports show ₱1,180,000.00. Cards and chart labels show ₱1.18M.'],
            ['Line the digits up.', 'Numbers in a column are right-aligned, in figures of equal width, with the same number of decimals.'],
            ['Dates people can’t misread.', 'Day, short month, and year: 28 Sep 2026, on every screen.'],
            ['Relative times for today only.', '2 minutes ago, with the exact time on hover. Anything older than a day gets its date.'],
            ['A dash means nothing there; zero means zero.', 'An empty value is —. ₱0.00 is a real amount, such as a paid balance.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Short figures in tables, full ones on cards.', 'Rounded amounts can’t be checked, and long ones wrap and crowd a card.'],
            ['Left-aligned amounts with mixed decimals.', 'PHP 420000 above 2940000.5: the digits don’t line up, so they can’t be compared.'],
            ['09/02/2026, or 2026-08-03 on screen.', 'Half the room reads 09/02 as 9 February.'],
            ['“56 days ago”.', 'People have to count back to find the date.'],
            ['0, N/A, or null for a missing value.', '0 looks like a real amount; N/A and null are the system talking.'],
          ]} />
        </Section>
      </div>

      <Section title="At a glance">
        <When head={['What', 'Write it', 'Not']} rows={[
          ['Money in tables and forms', '₱1,180,000.00, right-aligned', 'PHP 1180000, 1.18M'],
          ['Money in cards and charts', '₱1.18M, ₱420k', 'Full figures that wrap'],
          ['Negative money', '−₱8,500.00 (a real minus sign)', '(8500), -8500'],
          ['Counts', '1,204 invoices', '1204 invoice(s)'],
          ['Percentages', '12.5%, one decimal at most', '12.4987%'],
          ['Dates', '28 Sep 2026', '09/28/2026, 2026-09-28 on screen'],
          ['Times', '9:14 AM, in the business’s time zone', '09:14:33, UTC'],
          ['Recent moments', '2 minutes ago, with the exact time on hover and in the history', 'Relative times for anything older than a day'],
          ['Periods', '1 Jan to 28 Sep 2026', '01/01–09/28'],
          ['Nothing there', '— (an em dash); ₱0.00 only when the amount really is zero', '0, N/A, null, blank'],
        ]} />
      </Section>

    </>
  );
}
