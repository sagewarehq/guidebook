import { Section, Demo, Pair, Rules, Avoid, When, Win } from '../../site/kit';
import './shell.css';

// Pagination: which rows are showing, pages to jump between, rows per page, and when to load more instead.

function Pager({ bad }: { bad?: boolean }) {
  if (bad) return <p className="sh-pager"><span>Page 3</span><span className="sh-pages"><i>Prev</i><i>Next</i></span></p>;
  return (
    <p className="sh-pager">
      <span>51–75 of 1,204 invoices</span>
      <span className="sh-pages"><i>‹</i><i>1</i><i>2</i><i className="on">3</i><i>4</i><i>5</i><em>…</em><i>49</i><i>›</i></span>
      <span className="sh-per">Rows per page <b>25 ▾</b></span>
    </p>
  );
}

const rows = [['INV-1038', 'Metro Fuels', '₱420,000.00'], ['INV-1039', 'Amihan Foods', '₱96,500.00'], ['INV-1040', 'Abad Trucking', '₱1,240,000.00']];

export default function Pagination() {
  return (
    <>
      <Demo wide caption="Under the table: which rows are showing out of how many, pages to jump to, and how many rows a page holds. The count is for the whole filtered list.">
        <Win title="Invoices" className="sh-pwin">
          <table className="m-tbl">
            <thead><tr><th>Invoice</th><th>Customer</th><th className="r">Balance</th></tr></thead>
            <tbody>{rows.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td className="r">{c}</td></tr>)}</tbody>
          </table>
          <Pager />
        </Win>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Where you are, out of how many, and a way to jump.">
          <Win title="Invoices" className="sh-pwin"><Pager /></Win>
        </Demo>
        <Demo verdict="avoid" caption="Page 3 of what? No count, and no way to jump to the end.">
          <Win title="Invoices" className="sh-pwin"><Pager bad /></Win>
        </Demo>
      </Pair>

      <Section title="Pages, load more, or scroll">
        <When head={['Use', 'For', 'Example']} rows={[
          ['Pages', 'Lists people check, count, compare, or come back to. The default.', 'Invoices, Customers, Loans, a report’s rows'],
          ['Load more', 'Short feeds read from the top, where older items matter less.', 'A record’s history, notifications, comments'],
          ['Infinite scroll', 'Almost never in a management system. It hides the count, the footer, and the totals.', '—'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Say which rows, out of how many.', '“51–75 of 1,204 invoices.” The count is for the filtered list.'],
            ['Jump, not just step.', 'First, last, and the pages around the current one, with … between.'],
            ['25 rows by default, up to 100.', 'People choose, and the choice is remembered for that list.'],
            ['The page is in the URL.', '?page=3, so a link and Back land on the same rows. Changing a filter goes back to page 1.'],
            ['Totals and selection cover the whole list.', 'Column totals add up every filtered row, and “Select all 1,204” takes the lot. See Batch actions.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Page 3” with no count.', 'People can’t tell how much is left, or how big the list is.'],
            ['Prev and Next only.', 'Reaching the last of 49 pages takes 48 clicks.'],
            ['Loading every row into the browser and paging there.', 'The list slows down as the business grows.'],
            ['Resetting the page after an edit.', 'People lose their place, and Back lands somewhere else.'],
            ['Infinite scroll on a list with a total.', 'It hides the count, the footer, and the totals.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
