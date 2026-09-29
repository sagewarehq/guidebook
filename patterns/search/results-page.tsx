import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Pill } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { M, type Hit } from './palette-kit';
import '../shell/shell.css';

// All results: the routed page behind “See all 152 results” in the palette. The query in a box, a tab per record
// type with its count, the same rows as the palette, archived records last, and pages like any list.

type Row = Hit & { arch?: boolean };

/** One result: the same row as the palette, with Archived marked on the right. */
const Result = ({ r }: { r: Row }) => (
  <p className="sr-row sp-row">
    <span className="sr-t">{r.t}</span>
    <span className="sr-main"><b>{r.name}</b>{r.facts && <small>{r.facts}</small>}</span>
    {r.arch && <Pill tone="off">Archived</Pill>}
  </p>
);

/** A type’s group on the All tab: its name, its count, its best few, and a link to the rest. */
const Group = ({ name, count, more, rows }: { name: string; count: number; more?: string; rows: Row[] }) => (
  <div className="sp-grp">
    <p className="sp-gh">{name}<small>{count}</small>{more && <a className="m-link">{more}</a>}</p>
    {rows.map((r, i) => <Result key={i} r={r} />)}
  </div>
);

/** The type tabs, with counts. */
const Tabs = ({ on, counts }: { on: string; counts: [string, number][] }) => (
  <p className="as-views2">{counts.map(([t, c]) => <span key={t} className={t === on ? 'on' : undefined}>{t}<em>{c}</em></span>)}</p>
);

const metro: [string, number][] = [['All', 152], ['Customers', 3], ['Invoices', 56], ['Payments', 82], ['Loans', 3], ['Contacts', 7], ['Runs', 1]];

/** The top of the page: breadcrumb, title, and the query in its box. */
const Head = ({ q, meta }: { q: string; meta: ReactNode }) => (
  <>
    <p className="as-crumb">Search <span>/</span> <b>“{q}”</b></p>
    <div className="as-a-head"><div><p className="m-title">Results for “{q}”</p><p className="as-meta"><span>{meta}</span></p></div></div>
    <p className="sp-q"><span className="sr-glass">⌕</span><b>{q}</b><span className="sp-x">×</span></p>
  </>
);

const Notes = () => <span><i className="sp-cb" />Also search notes and comments</span>;

const customers: Row[] = [
  { t: 'Customer', name: <><M>Metro</M> Fuels</>, facts: 'Cebu · TIN 204-311-580-000 · 3 unpaid' },
  { t: 'Customer', name: <><M>Metro</M> Fuels Trading</>, facts: 'Baguio · TIN 118-902-447-000' },
  { t: 'Customer', name: <><M>Metro</M>build Supply</>, facts: 'Baguio · TIN 305-118-224-000', arch: true },
];

export default function ResultsPage() {
  return (
    <>
      <Demo wide caption="Enter on the palette’s last row, ‘See all 152 results for “metro”’, opens /search?q=metro inside the app. The query stays in its box, a tab per record type carries its count, and All shows each type’s best few with a link to the rest. Rows are the same as in the palette, and Metrobuild Supply, archived, comes last in its group.">
        <Frame as="lead" on="Search">
          <div className="as-a-page">
            <Head q="metro" meta="152 results · best match first" />
            <Tabs on="All" counts={metro} />
            <p className="sp-bar"><span className="as-chip add">+ Branch</span><Notes /></p>
            <Group name="Customers" count={3} rows={customers} />
            <Group name="Invoices" count={56} more="All 56 invoices" rows={[
              { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</> },
              { t: 'Invoice', name: 'INV-1061', facts: <><M>Metro</M> Fuels · Open · ₱684,000.00 · Due 9 Oct 2026</> },
              { t: 'Invoice', name: 'INV-1072', facts: <><M>Metro</M> Fuels · Open · ₱538,000.00 · Due 22 Oct 2026</> },
            ]} />
            <Group name="Payments" count={82} more="All 82 payments" rows={[
              { t: 'Payment', name: 'PAY-0921', facts: <><M>Metro</M> Fuels · Against INV-1038 · ₱760,000.00 · 12 Sep 2026</> },
              { t: 'Payment', name: 'PAY-0934', facts: <><M>Metro</M> Fuels Trading · Against INV-1049 · ₱215,000.00 · 18 Sep 2026</> },
            ]} />
            <Group name="Loans" count={3} more="All 3 loans" rows={[
              { t: 'Loan', name: 'LN-2198', facts: <><M>Metro</M> Fuels · ₱1,180,000.00 · Active</> },
              { t: 'Loan', name: 'LN-2231', facts: <><M>Metro</M> Fuels Trading · ₱650,000.00 · Active</> },
            ]} />
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="The Invoices tab, page 3: /search?q=metro&type=invoices&page=3. One type, paged like any list, with which rows are showing out of how many. Open and unpaid came first; paid invoices follow, and the archived ones close the list, marked Archived.">
        <Frame as="lead" on="Search">
          <div className="as-a-page">
            <Head q="metro" meta="56 invoices · best match first" />
            <Tabs on="Invoices" counts={metro} />
            <p className="sp-bar"><span className="as-chip add">+ Branch</span><span className="as-chip add">+ Status</span><Notes /><span className="sp-sort">Sort: <b>Best match ▾</b></span></p>
            <div className="sp-grp">
              {([
                { t: 'Invoice', name: 'INV-0861', facts: <><M>Metro</M> Fuels · Paid · ₱312,500.00 · Due 20 May 2026</> },
                { t: 'Invoice', name: 'INV-0843', facts: <><M>Metro</M> Fuels Trading · Paid · ₱96,000.00 · Due 8 May 2026</> },
                { t: 'Invoice', name: 'INV-0802', facts: <><M>Metro</M> Fuels · Paid · ₱254,000.00 · Due 2 Apr 2026</> },
                { t: 'Invoice', name: 'INV-0779', facts: <><M>Metro</M> Fuels Trading · Paid · ₱188,000.00 · Due 16 Mar 2026</> },
                { t: 'Invoice', name: 'INV-0612', facts: <><M>Metro</M>build Supply · Paid · ₱402,000.00 · Due 9 Oct 2025</>, arch: true },
                { t: 'Invoice', name: 'INV-0587', facts: <><M>Metro</M>build Supply · Paid · ₱75,000.00 · Due 18 Sep 2025</>, arch: true },
              ] as Row[]).map((r, i) => <Result key={i} r={r} />)}
            </div>
            <p className="sh-pager">
              <span>51–56 of 56 invoices</span>
              <span className="sh-pages"><i>‹</i><i>1</i><i>2</i><i className="on">3</i><i>›</i></span>
              <span className="sh-per">Rows per page <b>25 ▾</b></span>
            </p>
          </div>
        </Frame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Grouped by type, with counts. The three customers aren’t buried under 56 invoices, and each row says which one it is.">
          <div className="sr-pal sp-mini">
            <p className="sr-in"><span className="sr-glass">⌕</span><b>metro</b></p>
            <Tabs on="All" counts={metro} />
            <Group name="Customers" count={3} rows={customers.slice(0, 2)} />
            <Group name="Invoices" count={56} more="All 56 invoices" rows={[
              { t: 'Invoice', name: 'INV-1038', facts: <><M>Metro</M> Fuels · Overdue 26 days · ₱420,000.00</> },
            ]} />
          </div>
        </Demo>
        <Demo verdict="avoid" caption="One list of 152, in database order, named by table and ID. Which is the customer people wanted, and is any of it archived?">
          <div className="sr-pal sp-mini">
            <p className="sr-in"><span className="sr-glass">⌕</span><b>metro</b></p>
            <p className="sp-flat-h">152 results</p>
            <div className="sr-body sr-flat">{['tbl_invoice #8812', 'tbl_invoice #8807', 'tbl_payment #30114', 'tbl_invoice #8790', 'tbl_customer #88', 'tbl_loan #2198', 'tbl_invoice #8766'].map(x => <p key={x}>{x}</p>)}</div>
          </div>
        </Demo>
      </Pair>

      <Demo wide caption="Nothing matches in this tab. Say what was searched and where, show what matches elsewhere, then what to try. Archived records were already searched, so the page says so rather than offering it.">
        <Frame as="lead" on="Search">
          <div className="as-a-page">
            <Head q="northgate" meta="No invoices · 1 customer" />
            <Tabs on="Invoices" counts={[['All', 1], ['Customers', 1], ['Invoices', 0], ['Payments', 0], ['Loans', 0], ['Contacts', 0], ['Runs', 0]]} />
            <div className="sp-empty">
              <p className="m-title">No invoices match “northgate”.</p>
              <p>Archived invoices are included. One customer matches:</p>
              <Result r={{ t: 'Customer', name: <><M>Northgate</M> Hardware</>, facts: 'Cebu · Added 21 Sep 2026 · No invoices yet' }} />
              <ul>
                <li><a className="m-link">Search all types</a>, not just invoices.</li>
                <li>Check the spelling, or search by the invoice number.</li>
                <li><a className="m-link">Search notes and comments too.</a></li>
                <li>Deleted in the last 30 days? <a className="m-link">Look in the trash.</a></li>
              </ul>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="How people get here">
        <When head={['From', 'What happens']} rows={[
          ['Enter on the palette’s last row', '‘See all 152 results for “metro”’ opens /search?q=metro, on All.'],
          ['The link at the palette’s foot', 'The same page. The foot also shows the counts per type.'],
          ['⌘ Enter on that row', 'The same page, in a new tab.'],
          ['A shared link, or Back from a record', 'The same query, tab, and page: /search?q=metro&type=invoices&page=3.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A page of its own, paged like any list.', 'Query, type, and page in the URL, so Back and a shared link land on the same rows. See App shell › Pagination.'],
            ['Group by type, with counts.', 'All shows each type’s best few and a link to the rest; a tab per type holds them all.'],
            ['Rows that say which one it is.', 'The same rows as the palette: type, name with the match marked, and the facts that tell them apart. Archived last, marked Archived.'],
            ['Only what this person may open.', <>Counts and rows leave out the rest, with no hint it exists. See <a className="m-link" href="#/management/access/permissions">Access › Only what you may see</a>.</>],
            ['When nothing matches, say what to try.', 'What was searched, what matches in other types, and the fixes: spelling, all types, notes, the trash.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Results that live only on the screen.', 'Back, a refresh, or a shared link starts the search over.'],
            ['One undifferentiated list of 152.', 'Fifty-six invoices and 82 payments bury the three customers people were after.'],
            ['Rows named by table and ID: tbl_invoice #8812.', 'Nothing people use to pick, and no sign a record is archived.'],
            ['“5 more results you can’t open.”', 'It tells people that records their role keeps from them exist.'],
            ['“No results.” and nothing else.', 'People can’t tell a typo from a record that sits under another type.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
