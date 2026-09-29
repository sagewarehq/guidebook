import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini, Sk, Pin } from '../../site/kit';
import { Frame, GenericPage } from './shell-kit';
import '../records/foundations.css';

// The general skeleton every screen shares: the frame (1 to 5) and the page's regions (6 to 10), with no
// particular content. Each page type's own layout lives on its pattern: Lists, Detail page, and Forms.

/** A whole shell, small: a list page done well, or badly. */
function Shell({ bad }: { bad?: boolean }) {
  const nav = bad
    ? [['Dashboard', false], ['Data entry', true], ['Module 2', false], ['Transactions', false], ['Utilities', false], ['Admin tools', false]] as const
    : [['Invoices', true], ['Payments', false], ['Customers', false], ['Loans', false]] as const;
  return (
    <Win title="Loans OS" className="as-win">
      <div className="as-grid">
        <aside className="as-side">
          <p className="as-logo">{bad ? 'Loans OS' : 'Metro Lending'}</p>
          {!bad && <><p className="as-nav">Home</p><p className="as-grp">Work</p></>}
          {nav.map(([n, on]) => <p key={n} className={on ? 'as-nav on' : 'as-nav'}>{n}</p>)}
          {!bad && <><p className="as-grp">Analytics</p><p className="as-nav">Reports</p></>}
          {!bad && <><p className="as-nav as-set">Jobs</p><p className="as-nav">Help</p></>}
        </aside>
        <div className="as-main">
          <div className="as-top">
            <span className="as-search">{bad ? 'Search…' : 'Search anything  ⌘K'}</span>
            <span className="as-me">{!bad && <span className="as-bell">3</span>}<Ini n="AR" /></span>
          </div>
          <div className="as-page">
            {!bad && <p className="as-crumb">Invoices <span>/</span> Overdue in Cebu</p>}
            <div className="m-row">
              <p className="m-title">{bad ? 'Form 3' : 'Invoices'}</p>
              {bad ? <span className="as-bad-btns"><Btn kind="pri">Save</Btn><Btn kind="pri">New</Btn><Btn kind="pri">Export</Btn></span> : <Btn kind="pri">New invoice</Btn>}
            </div>
            {[86, 72, 80, 64].map(w => <Sk key={w} w={`${w}%`} />)}
          </div>
        </div>
      </div>
    </Win>
  );
}

const link = (id: string, name: string) => <a className="m-link" href={`#/management/records/${id}`}>{name}</a>;

export default function AppShell() {
  return (
    <>
      <Demo wide caption="The skeleton every screen shares. Regions 1 to 5 are the frame, identical everywhere. Regions 6 to 10 are the page: always in the same places, filled differently by each page type.">
        <Frame pinned><GenericPage /></Frame>
      </Demo>

      <Section title="What goes where">
        <When head={['', 'Region', 'What goes there', 'Keep out']} rows={[
          [<Pin n={1} />, 'Organisation', 'The client’s name, and a switcher when people work across branches or companies. It sets the scope for everything below.', 'Your own product’s logo taking the space; a switcher people never use.'],
          [<Pin n={2} />, 'Sidebar navigation', 'Home first, then the record types people work on, grouped under two or three headings (Work, Analytics). A count only where something needs the person’s action.', 'Actions (“New invoice”), filters, sub-pages, and anything named after a module or a table.'],
          [<Pin n={3} />, 'Sidebar foot', 'Jobs (anything running in the background), Settings (how the business works), Administration (who can use it, and keeping it safe), and Help. Each only for the roles that use it.', 'Daily work. If people open it every day, it belongs in 2.'],
          [<Pin n={4} />, 'Search', 'One box that finds any record by number, name, or reference, from anywhere. ⌘K opens it from the keyboard.', 'Filters for the current page: those go in 8.'],
          [<Pin n={5} />, 'You', 'Notifications, and the signed-in person: User preferences and sign out.', 'Actions on what’s on screen: those go in 7.'],
          [<Pin n={6} />, 'Breadcrumb', 'Where this page lives: section / list or view / record / part. Every step a link, the last one the current page. On every page below the top level.', 'The clicks someone made to get here. The trail follows where the page lives, not the history.'],
          [<Pin n={7} />, 'Page header', 'Left: what this page is, and its status. Right: the page’s actions: ••• for rare ones, secondary, then the one primary action at the far right.', 'More than one primary button. Actions that belong to one section sit on that section.'],
          [<Pin n={8} />, 'Toolbar', 'Optional. Whatever changes what the content shows: tabs on a record, saved views and filters on a list, steps on a long form.', 'Global search, and navigation to other sections.'],
          [<Pin n={9} />, 'Content', 'The work itself: the list, the record’s sections, the form’s fields, the report.', 'A second page header, or navigation to other sections.'],
          [<Pin n={10} />, 'Side panel', 'Optional, full height under the top bar. On detail pages it holds Related and History.', 'Anything needed to do the page’s main job: that goes in 9.'],
        ]} />
      </Section>

      <Section title="How much on one screen">
        <p>Fewer things, with space between them. When a page needs more than this, split it: the page answers the main questions, and each answer links to its own page for the detail.</p>
        <When head={['On one screen', 'At most']} rows={[
          ['Page header', 'A title, a status, one primary action, two others, and ••• for the rest'],
          ['Warnings', 'One, and only while there’s something to do about it'],
          ['Key numbers in a row', 'Three, or four at a push'],
          ['Blocks of content', 'Three to five, each answering one question'],
          ['Tables', 'One. A second table is its own page, or a tab'],
        ]} />
      </Section>

      <Section title="Each page type fills it differently">
        <When head={['Page type', 'Used for', 'Its layout']} rows={[
          ['List page', 'Finding and working through many records.', link('list', 'List records')],
          ['Detail page', 'One record: reading it, acting on it, editing its sections.', link('detail', 'View record')],
          ['Create page', 'Creating a record.', link('create', 'Create record')],
          ['Edit drawer', 'Editing one section of a record, over its detail page.', link('edit', 'Edit record')],
          ['Report page', 'Answering one question with a table, a chart, or both.', <a className="m-link" href="#/management/reports/report-page">Report page</a>],
        ]} />
      </Section>

      <Pair>
        <Demo verdict="do" caption="The sidebar names the business’s records, grouped by what people do. The current one is marked, the breadcrumb says where you are, and the page has one primary action.">
          <Shell />
        </Demo>
        <Demo verdict="avoid" caption="Menus named for how the system was built, not what people look for. No sign of where you are, and three equal buttons.">
          <Shell bad />
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Navigate by record type.', 'Invoices, Payments, Customers, Loans: the nouns from System Analysis, in the business’s own words.'],
            ['Home is what needs me today.', 'A work queue for the person signed in, not a wall of charts. See Reports and analytics › Home.'],
            ['Keep the frame and the regions still.', 'Regions 1 to 10 sit in the same spots on every page. A page may leave out the toolbar or panel; it never moves them.'],
            ['Every page has a breadcrumb.', 'Below the top level, every page starts with its trail. It’s the one place that always says where people are.'],
            ['Actions sit with what they act on.', 'Page actions in the page header, section actions on the section, row actions on the row. Creating starts from a list, or ⌘K.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Menus named after modules, screens, or tables.', 'People look for Invoices, not “Module 2”, “Transactions”, or “Utilities”.'],
            ['A dashboard as home.', 'People come to work a queue, and have to hunt for it.'],
            ['Moving the frame, or a one-off layout.', 'People relearn every screen. If a page fits no known type, check whether it’s a new one.'],
            ['Pages without a breadcrumb, or one that follows clicks.', 'People can’t tell where they are, or get back up.'],
            ['Actions in the sidebar, or three equal buttons.', 'Nobody can tell what a button acts on, or which one matters.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
