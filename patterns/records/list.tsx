import { Section, Demo, Rules, Avoid, When, Pin } from '../../site/kit';
import { Frame, ListPage, pageRegions } from '../shell/shell-kit';
import './foundations.css';

// The list page: its layout inside the app shell, what goes in each region, and the rules for lists.

export default function ListPageDoc() {
  return (
    <>
      <Demo wide caption="A list page inside the app shell: saved views first, one search across every field, sorting and columns on the table, rows selected for a bulk action, and totals under their column.">
        <Frame on="Invoices"><ListPage /></Frame>
      </Demo>

      <Section title="The list page">
        <When head={['', 'Region', 'What goes there', 'Keep out']} rows={pageRegions.list.map(([r, what, out], i) => [<Pin n={i + 1} />, r, what, out])} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Saved views come first.', 'Tabs with counts, right under the header, and saving one is one click. A view keeps the search, filters, sort, and columns.'],
            ['One search box, across every field.', 'Number, name, reference, amount: whatever people remember.'],
            ['Filters people can see and clear.', 'Every active filter shows as a chip with its ×. Nothing filters the list invisibly.'],
            ['The URL is the view.', 'Search, filters, sort, columns, and page live in the query string, so a pasted link opens the same list.'],
            ['Totals for the whole set, paged on the server.', <>Totals sit under their column, for the whole filtered set. Never load the whole table into the browser; see <a className="m-link" href="#/management/shell/pagination">Pagination</a>.</>],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Rebuilding the same filters every morning.', 'People set up the same view by hand each day, and get it slightly different.'],
            ['A field-by-field search form.', 'People must know which field holds what they remember.'],
            ['Filters that hide rows invisibly.', 'The list looks complete, and people trust a wrong count.'],
            ['Filters and sort kept only on the screen.', 'A pasted link opens a different list, and Back leaves the page.'],
            ['Totals for this page only, or the whole table in the browser.', 'The total is wrong for the set, and the page slows as the table grows.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
