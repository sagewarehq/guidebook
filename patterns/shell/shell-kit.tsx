// The app shell, shared by the pattern pages that draw it: the frame (organisation, sidebar, search, global actions),
// and the page layouts that sit inside it (generic, list, detail, form). Not a page itself: catalog.ts has no "shell".
import type { ReactNode } from 'react';
import { Win, Btn, Ini, Sk, Pill, Pin, Field } from '../../site/kit';
import { cx } from '../../lib/cx';
import '../records/foundations.css';

/** A region of the mock-up: outlined, with its numbered pin. No number, no outline. */
export function R({ n, className, children }: { n?: number; className?: string; children: ReactNode }) {
  return <div className={cx(n != null && 'as-r', className)}>{n != null && <Pin n={n} className="as-p" />}{children}</div>;
}

/**
 * The frame: organisation, sidebar, search, and global actions. With `pinned`, those regions are outlined and
 * numbered 1 to 5 (the App shell page); without it, the frame is drawn quietly, so the page inside stands out.
 */
export function Frame({ pinned, loud, on = 'Invoices', as = 'staff', org, nav, foot, top, overlay, banner, children }: {
  pinned?: boolean; loud?: boolean; on?: string; children: ReactNode;
  /** Who is signed in: staff (Ana, Collections), lead (Ramon, Finance), or admin (Carlo). Sets the sidebar foot and initials. */
  as?: 'staff' | 'lead' | 'admin';
  /** Optional slots, to draw a variant of the frame: the organisation block, the nav list, the sidebar foot, the top bar's right side, and a menu or panel drawn over it all. */
  org?: ReactNode; nav?: ReactNode; foot?: ReactNode; top?: ReactNode; overlay?: ReactNode;
  /** A bar across the whole window, above everything: impersonation, a training account. */
  banner?: ReactNode;
}) {
  const n = (k: number) => (pinned ? k : undefined);
  return (
    <Win title="Loans OS" className={cx('as-anat', !pinned && !loud && 'as-quiet')}>
      {banner}
      <div className="as-a-grid">
        <aside className="as-a-side">
          <R n={n(1)}>{org ?? <p className="as-org"><b>Metro Lending</b><span>{as === 'staff' ? 'Cebu branch' : 'All branches'} ▾</span></p>}</R>
          <R n={n(2)} className="as-a-nav">
            {nav ?? <>
              <p className={on === 'Home' ? 'as-nav on' : 'as-nav'}>Home <em>3</em></p>
              <p className="as-grp">Work</p>
              {['Invoices', 'Payments', 'Customers', 'Loans'].map(x => <p key={x} className={x === on ? 'as-nav on' : 'as-nav'}>{x}</p>)}
              <p className="as-grp">Analytics</p>
              <p className="as-nav">Reports</p>
            </>}
          </R>
          <R n={n(3)} className="as-a-foot">{foot ?? <><p className="as-nav">Jobs <em className="as-jobs">1</em></p>{as !== 'staff' && <p className="as-nav">Settings</p>}{as === 'admin' && <p className="as-nav">Administration</p>}<p className="as-nav">Help</p></>}</R>
        </aside>
        <div className="as-a-main">
          <div className="as-a-top">
            <R n={n(4)} className="as-a-search"><span className="as-search">Search invoices, customers, loans…  ⌘K</span></R>
            <R n={n(5)} className="as-a-me">{top ?? <><span className="as-bell">3</span><Ini n={{ staff: 'AR', lead: 'RC', admin: 'CM' }[as]} /></>}</R>
          </div>
          {children}
        </div>
        {overlay}
      </div>
    </Win>
  );
}

/** A labelled placeholder region, for the generic page. */
const Slot = ({ label, sub }: { label: string; sub?: string }) => <p className="as-slot"><b>{label}</b>{sub && <span>{sub}</span>}</p>;

/** The generic page inside the frame, numbered 6 to 10: what every page has, with no particular content. */
export function GenericPage() {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <R n={6}><p className="as-crumb">Section <span>/</span> Page <span>/</span> <b>This page</b></p></R>
        <R n={7} className="as-a-head">
          <div><p className="m-title">Page title</p><p className="as-meta"><span>Status and the facts that identify it</span></p></div>
          <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Secondary</Btn><Btn kind="pri">Primary action</Btn></span>
        </R>
        <R n={8} className="as-a-tabs"><Slot label="Toolbar" sub="tabs, views, or filters, when the page needs them" /></R>
        <R n={9} className="as-a-content"><Slot label="Content" sub="the work: a list, a record, a form, a report" /><Sk w="86%" /><Sk w="70%" /><Sk w="78%" /><Sk w="60%" /></R>
      </div>
      <R n={10} className="as-a-panel"><Slot label="Side panel" sub="on detail pages: related records and history" /><Sk w="80%" /><Sk w="64%" /><Sk w="72%" /></R>
    </div>
  );
}

/** The list page inside the frame. Pins start at `from`; it has six regions. */
export function ListPage({ from = 1, plain }: { from?: number; plain?: boolean }) {
  const rows: [string, string, string, string][] = [
    ['INV-1038', 'Metro Fuels', '2 Sep', '₱420,000'],
    ['INV-1044', 'Northstar Supply', '9 Sep', '₱2,940,000'],
    ['INV-1047', 'Pacific Cartons', '12 Sep', '₱318,000'],
    ['INV-1052', 'Mandaue Glassworks', '15 Sep', '₱1,405,000'],
  ];
  const views: [string, number, string?][] = [['All', 131], ['Mine', 18], ['★ Overdue in Cebu', 12, 'on'], ['★ Over ₱1M', 4]];
  const pin = (k: number) => (plain ? undefined : from + k);
  return (
    <div className="as-a-page">
      <R n={pin(0)}><p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p></R>
      <R n={pin(1)} className="as-a-head">
        <div><p className="m-title">Invoices</p><p className="as-meta"><span>Overdue in Cebu · shared with Collections</span></p></div>
        <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn kind="pri">New invoice</Btn></span>
      </R>
      <R n={pin(2)} className="as-views2">
        {views.map(([v, c, on]) => <span key={v} className={on}>{v}<em>{c}</em></span>)}
        <span className="add">+ Save view</span>
        <span className="as-edited">Filters changed · <b>Save</b> · Save as new</span>
      </R>
      <R n={pin(3)} className="as-a-bar">
        <p className="as-filters"><span className="as-lsearch2">⌕ Search all fields: number, customer, reference, amount…</span></p>
        <p className="as-filters"><span className="as-chip">Status: Overdue ×</span><span className="as-chip">Branch: Cebu ×</span><span className="as-chip add">+ Filter</span></p>
      </R>
      <R n={pin(4)} className="as-a-content as-a-tablewrap">
        <p className="as-bulk"><b>2 selected</b><a>Select all 12</a><span className="as-grow" /><Btn>Send reminder</Btn><Btn>Assign</Btn><Btn>Export</Btn><Btn kind="quiet">•••</Btn><Btn kind="quiet">Clear</Btn></p>
        <table className="m-tbl as-tbl">
          <thead><tr><th><i className="as-cb part" /></th><th>Invoice ↕</th><th>Customer ↕</th><th className="as-sorted">Due ▲</th><th className="r">Balance ↕</th><th className="as-colbtn"><span>⊞ Columns</span></th></tr></thead>
          <tbody>{rows.map(([no, c, d, b], i) => <tr key={no} className={i < 2 ? 'as-sel' : undefined}><td><i className={i < 2 ? 'as-cb on' : 'as-cb'} /></td><td><a className="m-link">{no}</a></td><td>{c}</td><td>{d}</td><td className="r">{b}</td><td /></tr>)}</tbody>
          <tfoot><tr><td /><td>12 invoices</td><td /><td /><td className="r"><small>Total</small>₱11,642,000</td><td /></tr></tfoot>
        </table>
      </R>
      <R n={pin(5)} className="as-a-foot2"><span>1–4 of 12</span><span className="as-pages"><i>‹</i><i className="on">1</i><i>2</i><i>3</i><i>›</i></span></R>
    </div>
  );
}

/** The detail page inside the frame, with Related and History in the full-height side panel. */
export function DetailPage({ from = 1, plain }: { from?: number; plain?: boolean }) {
  const pin = (k: number) => (plain ? undefined : from + k);
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <R n={pin(0)}><p className="as-crumb">Invoices <span>/</span> Overdue in Cebu <span>/</span> <b>INV-1038</b></p></R>
        <R n={pin(1)} className="as-a-head">
          <div><p className="m-title">INV-1038 · Metro Fuels</p><p className="as-meta"><Pill tone="bad">Overdue 26 days</Pill><span>Cebu · Net 30</span></p></div>
          <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Send reminder</Btn><Btn kind="pri">Record payment</Btn></span>
        </R>
        <R n={pin(2)} className="as-a-tabs"><span className="on">Overview</span><span>Items 2</span><span>Payments 1</span><span>Documents</span></R>
        <R n={pin(3)} className="as-a-content">
          <p className="as-facts"><span><small>Amount</small>₱1,180,000</span><span><small>Balance</small><b>₱420,000</b></span><span><small>Due</small>2 Sep 2026</span></p>
          <p className="as-sech"><span className="m-k">Customer and terms</span><a className="m-link">Edit</a></p>
          <Sk w="70%" /><Sk w="56%" />
          <p className="as-sech"><span className="m-k">Items</span><a className="m-link">Edit</a></p>
          <Sk w="80%" /><Sk w="64%" />
        </R>
      </div>
      <R n={pin(4)} className="as-a-panel">
        <p className="m-k">Related</p>
        <div className="as-rel">{[['Customer', 'Metro Fuels'], ['Purchase order', 'PO-2211'], ['Delivery', 'DR-5530'], ['Payment', 'PAY-0921']].map(([k, v]) => <p key={k}><span>{k}</span><a>{v}</a></p>)}</div>
        <p className="m-k">History</p>
        <p className="as-h"><Ini n="AR" /><span><b>Ana</b> recorded ₱760,000<small>18 Sep</small></span></p>
        <p className="as-h"><Ini n="MA" agent /><span><b>Marco</b> matched PO-2211<small>28 Aug</small></span></p>
        <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> created it<small>3 Aug</small></span></p>
      </R>
    </div>
  );
}

/** The form page inside the frame: a new customer, with the action bar at the foot. */
export function FormPage({ from = 1, plain, again, more }: { from?: number; plain?: boolean; again?: boolean; more?: boolean }) {
  const pin = (k: number) => (plain ? undefined : from + k);
  return (
    <div className="as-a-page">
      <R n={pin(0)}><p className="as-crumb">Customers <span>/</span> <b>New customer</b></p></R>
      <R n={pin(1)} className="as-a-head">
        <div><p className="m-title">New customer</p><p className="as-meta"><span>Only a name is needed. Everything else can come later.</span></p></div>
      </R>
      {again && <p className="fm-banner"><b>Metro Fuels created.</b> Add the next customer, or <a className="m-link">open Metro Fuels</a>.</p>}
      <R n={pin(2)} className="as-a-content as-a-fields">
        <Field label="Customer name" value={again ? '' : 'Metro Fuels'} focus={again} />
        <Field label="Branch" value="Cebu" select hint="Filled in: your branch" />
        <Field label="Payment terms" value="Net 30" select hint="Filled in: the usual for Cebu" />
        <div className={cx('fm-more', more && 'open')}>
          <p className="fm-more-h"><b>{more ? '▾' : '▸'} More details</b><span>Optional · TIN, contact, credit limit, notes</span></p>
          {more && <>
            <Field label="TIN" value="204-311-580-000" optional />
            <Field label="Contact person" value="Joy Santos" optional />
            <Field label="Credit limit" value="₱2,000,000.00" optional />
          </>}
        </div>
      </R>
      <R n={pin(3)} className="as-a-actbar"><Btn>Cancel</Btn><span className="as-grow" /><Btn>Create and add another</Btn><Btn kind="pri">Create customer</Btn></R>
    </div>
  );
}

/** Each page type's regions, in order: [region, what goes there, keep out]. Numbered from 1 on each pattern page. */
export const pageRegions: Record<'list' | 'detail' | 'form', [string, ReactNode, ReactNode][]> = {
  list: [
    ['Breadcrumb', 'The section, then the saved view if one is open: Invoices / Overdue in Cebu.', 'Each filter as a step. Filters live in the search and filter bar.'],
    ['Page header', 'The title, and which view is open and who it’s shared with. The create action is the primary button (New invoice); Import and Export wait in •••.', 'Actions on one row: those sit on the row.'],
    ['Saved views', 'The first thing under the header: every view this person can open, as tabs, each with its count. + Save view keeps the current search, filters, sort, and columns. When someone changes an open view, say so, and offer Save or Save as new.', 'Views buried in a menu; a view that changes silently for everyone it’s shared with.'],
    ['Search and filters', 'A wide search box that searches across every field people can see: number, name, reference, amount. Below it, the active filters as chips, and + Filter.', 'A search that only checks one field; filters hidden behind a modal.'],
    ['Table', 'Sort by clicking a column header: one arrow shows which column and which way. ⊞ Columns at the end of the header adds and hides columns. Totals sit at the foot of their own column, for the whole filtered set. The record’s number first, as its link. A checkbox on every row, and one in the header to select the page. Once rows are selected, a bulk bar appears above the table: how many are selected, “Select all 12” to take in the whole filtered set, and the actions that work on many at once.', 'Sort controls away from the columns; totals in a sentence away from their numbers; bulk actions that don’t say how many they’ll touch.'],
    ['Footer', 'Which rows are showing, and pages.', 'Infinite scroll on lists people count, check, or export.'],
  ],
  detail: [
    ['Breadcrumb', 'The section, the view they came from, then the record: Invoices / Overdue in Cebu / INV-1038.', 'The clicks someone made to get here.'],
    ['Page header', 'The record’s name, its status, and the two or three facts that identify it. Right: •••, secondary, then the one primary action.', 'Actions that belong to one section: those sit on the section, as Edit.'],
    ['Tabs', 'The record’s own parts: Overview, line items, related lists, documents, each with a count.', 'Tabs that are really other records’ pages.'],
    ['Sections', 'The key facts first, then sections grouped by what people look for, each with its own Edit, which opens a drawer.', 'Every database field in a long grid.'],
    ['Side panel', 'Related: the records this one points to and the ones that point to it, each a link with a count. History: who changed what, from what, to what, and when, Agents included. Comments go here too. It runs the full height, under the top bar.', 'Anything needed to do the page’s main job: that goes in the sections.'],
  ],
  form: [
    ['Breadcrumb', 'The section, then what’s being made: Customers / New customer. An edit opens in a drawer, so the record’s own breadcrumb stays.', 'A breadcrumb that loses where the record lives.'],
    ['Page header', 'What’s being made, and one line on what’s needed now. No buttons here: they go in the action bar.', 'Save buttons at both the top and the bottom.'],
    ['Fields', 'Only what identifies the record, usually just its name, with what the system knows already filled in. Everything else sits folded under More details, optional, still there if people have it to hand.', 'Optional fields spread across the form, looking as if they must be filled in.'],
    ['Action bar', 'Stuck to the foot of the page: Cancel on the left, the create or save action on the right, and “Create and add another” when people make several.', 'Actions that scroll out of view on a long form.'],
  ],
};
