import type { ReactNode } from 'react';
import { Section, Demo, Pair, Rules, Avoid, When, Win } from '../../site/kit';
import './shell.css';

// Breadcrumbs: every page below the top level starts with a trail of where it lives. Trails for each kind of page,
// long trails shortened, and why the trail follows the place, not the clicks.

/** A breadcrumb trail drawn as it appears on the page: every step a link but the last. */
function Trail({ steps }: { steps: string[] }) {
  return (
    <p className="as-crumb sh-trail">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const node: ReactNode = last ? <b>{s}</b> : s === '…' ? <em className="sh-more">…</em> : <a>{s}</a>;
        return <span key={i}>{node}{!last && <i>/</i>}</span>;
      })}
    </p>
  );
}

export default function Breadcrumbs() {
  return (
    <>
      <Section title="The trail for each kind of page">
        <When head={['Page', 'Trail']} rows={[
          ['A list', <Trail steps={['Invoices']} />],
          ['A saved view', <Trail steps={['Invoices', 'Overdue in Cebu']} />],
          ['A record, opened from a view', <Trail steps={['Invoices', 'Overdue in Cebu', 'INV-1038']} />],
          ['A record, opened from anywhere else', <Trail steps={['Invoices', 'INV-1038']} />],
          ['A drawer over a record: no new step', <Trail steps={['Invoices', 'INV-1038']} />],
          ['A record inside another', <Trail steps={['Customers', 'Metro Fuels', 'Contacts', 'Joy Santos']} />],
          ['A new record', <Trail steps={['Customers', 'New customer']} />],
          ['Deleting a record', <Trail steps={['Customers', 'Metro Fuels', 'Delete']} />],
          ['A report', <Trail steps={['Reports', 'Collections this month']} />],
          ['Settings', <Trail steps={['Settings', 'Payment terms', 'Net 45']} />],
          ['Administration', <Trail steps={['Administration', 'Users and roles', 'Ana Reyes']} />],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Where the page lives. Every step a link, the last one the page itself, in bold. The record by its name or number, which is how people know it.">
          <Win title="Loans OS" className="sh-crumbwin">
            <Trail steps={['Customers', 'Metro Fuels', 'Contacts', 'Joy Santos']} />
            <p className="m-title">Joy Santos</p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="The clicks that got here, with Home first and ids for names. It changes every visit, so it tells people nothing about where they are.">
          <Win title="Loans OS" className="sh-crumbwin">
            <p className="as-crumb sh-trail bad">Home &gt; Search Results &gt; Customer #88 &gt; Contact List &gt; Record 4412</p>
            <p className="m-title">Contact</p>
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo caption="A long trail keeps its first and last three steps. The middle folds into …, which opens the rest.">
          <Win title="Loans OS" className="sh-crumbwin">
            <Trail steps={['Loans', '…', 'LN-2207', 'Collateral', 'GAB 4721']} />
            <p className="sh-fold"><a>Overdue in Baguio</a></p>
          </Win>
        </Demo>
        <Demo caption="The breadcrumb names match the pages they link to, and the browser tab, so every place has one name.">
          <Win title="INV-1038 · Invoices · Loans OS" className="sh-crumbwin">
            <Trail steps={['Invoices', 'Overdue in Cebu', 'INV-1038']} />
            <p className="m-title">INV-1038 · Metro Fuels</p>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['On every page below the top level.', 'Lists, records, drawers, create and delete pages, reports, settings. A drawer keeps the record in its trail.'],
            ['Where the page lives, not how people got there.', 'The same page always has the same trail, so it tells people where they are.'],
            ['Every step a link, except the last.', 'The last is the page itself, in bold. Start at the section: the sidebar already has Home.'],
            ['Records by their number or name.', 'INV-1038, Metro Fuels. Never an id or “Detail”.'],
            ['Shorten from the middle.', 'Keep the first step and the last three; fold the rest into …'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A drawer that drops the trail.', 'The record disappears from the trail, and people lose where they are.'],
            ['Trails built from browser history.', 'The trail changes every visit, so it says nothing about where the page lives.'],
            ['Home first, and steps that aren’t links.', 'Home repeats the sidebar, and plain-text steps lead nowhere.'],
            ['Ids and generic names.', '“Customer #88 › Record 4412” means nothing to the person reading it.'],
            ['Cutting the end of a long trail.', 'The page itself and its record are the steps people need most.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
