import { Section, Demo, Pair, Rules, Avoid, When, Pin, Win } from '../../site/kit';
import { Frame, DetailPage } from './shell-kit';
import './shell.css';

// Navigation: every way people move around the system, and where each lives in the shell. Numbers match the pins
// on the demo (the frame is 1 to 5, the detail page 6 to 10).

export default function Navigation() {
  return (
    <>
      <Demo wide caption="Every place navigation lives, on one detail page. The sidebar moves between sections; the top bar jumps anywhere; the page’s own breadcrumb, tabs, and links move up, across, and sideways from here.">
        <Frame pinned on="Invoices"><DetailPage from={6} /></Frame>
      </Demo>

      <Section title="Where each kind goes">
        <When head={['', 'Place', 'For moving', 'Holds']} rows={[
          [<Pin n={1} />, 'Organisation switcher', 'Between branches or companies', 'The client’s name, and a switcher only for people who work across branches.'],
          [<Pin n={2} />, 'Sidebar', 'Between sections', 'Home, then the record types, grouped under Work and Analytics. Flat, with one level of nesting at most.'],
          [<Pin n={3} />, 'Sidebar foot', 'To rare places', 'Jobs, Settings, Administration, and Help, each shown only to roles that use it.'],
          [<Pin n={4} />, 'Search and ⌘K', 'Straight to anything', 'Any record, page, saved view, or command. See Global search.'],
          [<Pin n={5} />, 'Top bar, right', 'To yourself', 'Notifications, User preferences, sign out.'],
          [<Pin n={6} />, 'Breadcrumb', 'Up', 'Where this page lives: section, view, record. See Breadcrumbs.'],
          [<Pin n={8} />, 'Tabs', 'Across one record', 'The record’s own parts: Overview, Items, Payments, Documents.'],
          [<Pin n={9} />, 'Links in content', 'Sideways, in context', 'A customer’s name on an invoice opens the customer.'],
          [<Pin n={10} />, 'Related, in the side panel', 'Sideways, to connected records', 'Everything this record points to, and everything pointing to it, with counts.'],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="Mostly flat. Record types in the business’s words under two headings, and one section nested a single level because its parts are separate places people go. The open section is the one people are in.">
          <Win title="Sidebar" className="sh-nav">
            <p className="as-nav">Home <em>3</em></p>
            <p className="as-grp">Work</p>
            <p className="as-nav">Invoices</p>
            <p className="as-nav sh-par">Payments <i>▾</i></p>
            <div className="sh-kids"><p className="as-nav">Received</p><p className="as-nav on">Payment runs <em>2</em></p><p className="as-nav">Refunds</p></div>
            <p className="as-nav">Customers</p><p className="as-nav">Loans <i className="sh-cl">▸</i></p>
            <p className="as-grp">Analytics</p>
            <p className="as-nav">Reports</p>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A tree three levels deep, named for modules and screens, with actions and screens mixed in as children. People open and close folders to find a page, and lose their place.">
          <Win title="Sidebar" className="sh-nav sh-tree">
            <p>▾ Module 1 · Transactions</p>
            <p className="l2">▾ AR Processing</p>
            <p className="l3">Invoice Entry (Form 3)</p>
            <p className="l3">Invoice Inquiry</p>
            <p className="l2">▸ Collections Sub-module</p>
            <p>▸ Module 2 · Masterfiles</p>
            <p>▸ Utilities</p>
          </Win>
        </Demo>
      </Pair>

      <Section title="Nesting: one level at most">
        <p>Like a mail app’s Mail › Inbox, Drafts, Flagged, Archives: a section may open into its parts, once.</p>
        <When head={['Test', 'Nest it when', 'Keep it flat when']} rows={[
          ['What the parts are', '2 to 6 different things: Payments › Received, Payment runs, Refunds.', 'The same records, filtered. Overdue invoices is a saved view on Invoices, not a child.'],
          ['How often', 'People go to each part on its own, often.', 'Rarely: use the page’s tabs, or Settings.'],
          ['The parent’s name', 'One word people already use: Payments, Loans, Settings.', 'It would have one child. Link that child directly.'],
        ]} />
        <Rules items={[
          ['One level. Never a child of a child.', 'Anything deeper becomes tabs on the page, or a saved view.'],
          ['The parent opens, and goes somewhere.', 'Clicking Payments opens its children and shows the first one, so a click is never wasted.'],
          ['The current section stays open.', 'Others stay closed, and remember how people left them.'],
          ['Children are places, not actions or filters.', 'Received, Payment runs. Never “New payment”, never “Payments over ₱1M”.'],
          ['Counts on the child that needs the work.', 'Payment runs 2, not Payments 2, so people know where to go.'],
          ['Indent the children, and mark the one people are on.', 'A light line down the left joins them to their parent.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Section, then page. One nest at most.', 'The sidebar lists sections, and a section may open into its parts once. Everything else is a page, a tab, or a saved view.'],
            ['Mark where people are.', 'The current section is marked in the sidebar, from the URL, on every page under it.'],
            ['Every record links to its neighbours.', 'A customer’s name, a PO number, a payment: each opens its record. Related in the side panel lists the rest.'],
            ['Places in the sidebar, nothing else.', '“Overdue in Cebu” is a saved view on Invoices; creating starts from its list, or ⌘K.'],
            ['Back always works.', 'Every page, tab, filter, and drawer has its own URL, so the browser’s Back goes where people expect.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Trees, mega-menus, and hover menus.', 'People open and close folders to find a page, and lose their place.'],
            ['No mark on the current section.', 'Deep in a record, the sidebar no longer says which part of the system people are in.'],
            ['Record numbers as plain text.', 'People copy INV-1038 into search instead of clicking through.'],
            ['Actions and filters in the sidebar.', '“New invoice” and “Payments over ₱1M” crowd out the places people go.'],
            ['Pages, tabs, or drawers with no URL.', 'Back leaves the page, or lands somewhere people didn’t expect.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
