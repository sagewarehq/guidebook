import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, When, Btn, Pill, Field, Ini, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import '../shell/shell.css';

// Custom fields: the business adds its own fields to most record types, in Settings › Custom fields. A custom field
// then behaves like a built-in one (detail page, create form, lists, filters, reports, exports, search), stays inside
// the record's access, and never changes the core: no renaming built-in fields, no formulas, no money logic.

const groups: [string, string[]][] = [
  ['Business', ['General', 'Branches', 'Record IDs', 'Custom fields']],
  ['Money', ['Payment terms', 'Numbering', 'Taxes']],
  ['Lending', ['Loan products', 'Penalties']],
  ['Work', ['Approval limits']],
  ['Documents', ['Headers and footers']],
];

/** Settings, open on a section, as Ramon (Finance lead). With `drawer`, a drawer from the right sits over the section. */
function SettingsPage({ on, drawer, children }: { on: string; drawer?: ReactNode; children: ReactNode }) {
  const page = (
    <div className="as-a-page">
      <p className="as-crumb">Settings <span>/</span> <b>{on}</b></p>
      <div className="sh-set">
        <div className="sh-setnav st-groups">{groups.map(([g, items]) => <div key={g}><small>{g}</small>{items.map(x => <p key={x} className={x === on ? 'on' : undefined}>{x}</p>)}</div>)}</div>
        <div className="sh-setbody">{children}</div>
      </div>
    </div>
  );
  return (
    <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
      {drawer ? <div className="pd-big cfd-big"><div className="pd-under">{page}</div>{drawer}</div> : page}
    </Frame>
  );
}

// The custom fields on Customers: field, type, required, who sees it, on the create form.
const fields: [string, string, boolean, string, string][] = [
  ['Industry', 'Choice: Fuel, Food, Construction, +4', false, 'Everyone who sees the customer', 'Under More details'],
  ['Account officer', 'Person', true, 'Everyone who sees the customer', 'Always'],
  ['Year established', 'Number', false, 'Everyone who sees the customer', 'Under More details'],
  ['Collateral appraised', 'Yes/no', false, 'Finance only', 'Not shown: set later'],
];

function FieldsList() {
  return (
    <>
      <div className="m-row"><div><p className="m-title">Custom fields</p><p className="as-meta"><span>Fields your business adds to its records. Changed by Ramon, 14 Sep.</span></p></div><Btn kind="pri">Add field</Btn></div>
      <p className="as-a-tabs"><span className="on">Customers 4</span><span>Loans 3</span><span>Invoices 2</span><span>Payments 0</span></p>
      <table className="m-tbl">
        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Who sees it</th><th>On the create form</th><th /></tr></thead>
        <tbody>
          {fields.map(([f, t, req, who, form]) => <tr key={f}><td>{f}</td><td>{t}</td><td>{req ? <Pill tone="ok">Required</Pill> : <span className="cfd-muted">Optional</span>}</td><td>{who}</td><td>{form}</td><td className="r"><a className="m-link">Edit</a></td></tr>)}
        </tbody>
      </table>
    </>
  );
}

function AddField() {
  return (
    <div className="pd-side">
      <p className="pd-side-h"><b>Add a field to Customers</b><span>×</span></p>
      <Field label="Label" value="Risk grade" focus />
      <Field label="Type" value="Choice" select hint="Text, number, money, date, choice, yes/no, person, or a link to a record." />
      <Field label="Choices" value="A · B · C · D" />
      <Field label="Help text" value="Set by Finance after the yearly credit review." optional />
      <Field label="Who can see it" value="Everyone who sees the customer" select />
      <Field label="Who can change it" value="Finance" select hint="Chosen from people who can already see the customer." />
      <p className="cfd-sw"><i /><span><b>Required</b>Off. 1,204 customers have no risk grade yet: if it were required, none of them could be saved until someone filled it in.</span></p>
      <div className="cfd-prev"><small>Preview</small><Field label="Risk grade" placeholder="Choose A, B, C, or D" select hint="Set by Finance after the yearly credit review." /></div>
      <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Add field</Btn></span>
    </div>
  );
}

function CustomerDetail() {
  return (
    <div className="as-a-work">
      <div className="as-a-page">
        <p className="as-crumb">Customers <span>/</span> <b>Metro Fuels</b></p>
        <div className="as-a-head">
          <div><p className="m-title">Metro Fuels · CUS-0088</p><p className="as-meta"><span>Cebu · Net 30</span></p></div>
          <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn kind="pri">New invoice</Btn></span>
        </div>
        <p className="as-a-tabs"><span className="on">Overview</span><span>Loans 2</span><span>Invoices 14</span><span>Documents</span></p>
        <div className="as-a-content">
          <p className="as-facts"><span><small>Balance</small>₱420,000</span><span><small>Credit limit</small>₱2,000,000</span><span><small>Terms</small>Net 30</span></p>
          <p className="as-sech"><span className="m-k">Contact and terms</span><a className="m-link">Edit</a></p>
          <Sk w="70%" /><Sk w="56%" />
          <p className="as-sech"><span className="m-k">More about this customer</span><a className="m-link">Edit</a></p>
          <div className="cfd-kv">
            <p><small>Industry</small>Fuel</p>
            <p><small>Account officer</small>Ana Reyes</p>
            <p><small>Year established</small>2004</p>
            <p><small>Collateral appraised <em>· Finance only</em></small>Yes</p>
          </div>
        </div>
      </div>
      <div className="as-a-panel">
        <p className="m-k">Related</p>
        <div className="as-rel">{[['Loans', '2'], ['Invoices', '14'], ['Payments', '9']].map(([k, v]) => <p key={k}><span>{k}</span><a>{v}</a></p>)}</div>
        <p className="m-k">History</p>
        <p className="as-h"><Ini n="RC" /><span><b>Ramon</b> set Collateral appraised to Yes<small>22 Sep</small></span></p>
        <p className="as-h"><Ini n="AR" /><span><b>Ana</b> set Industry to Fuel<small>14 Sep</small></span></p>
      </div>
    </div>
  );
}

function NewCustomer() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>New customer</b></p>
      <div><p className="m-title">New customer</p><p className="as-meta"><span>A name and an account officer are needed. Everything else can come later.</span></p></div>
      <div className="as-a-content as-a-fields">
        <Field label="Customer name" value="Tamarind Foods" />
        <Field label="Branch" value="Cebu" select hint="Filled in: your branch" />
        <Field label="Account officer" value="Ana Reyes" select hint="Your business asks for this on every customer." />
        <div className="fm-more open">
          <p className="fm-more-h"><b>▾ More details</b><span>Optional · TIN, contact, credit limit, industry, year established</span></p>
          <Field label="Industry" value="Food" select optional />
          <Field label="Year established" placeholder="e.g. 2004" optional />
        </div>
      </div>
      <div className="as-a-actbar"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Create customer</Btn></div>
    </div>
  );
}

function FuelCustomers() {
  const rows: [string, string, string, string][] = [
    ['Metro Fuels', 'Cebu', 'Ana Reyes', '₱420,000'],
    ['Consolacion Fuels', 'Cebu', 'Ana Reyes', '₱1,150,000'],
    ['Talisay Fuel Depot', 'Cebu', 'Liza Tan', '₱0'],
  ];
  return (
    <div className="as-a-page">
      <p className="as-crumb">Customers <span>/</span> <b>All</b></p>
      <div className="as-a-head"><div><p className="m-title">Customers</p><p className="as-meta"><span>38 in Cebu match</span></p></div><span className="as-acts"><Btn kind="quiet">•••</Btn><Btn kind="pri">New customer</Btn></span></div>
      <p className="as-filters"><span className="as-chip">Industry: Fuel ×</span><span className="as-chip">Branch: Cebu ×</span><span className="as-chip add">+ Filter</span></p>
      <table className="m-tbl">
        <thead><tr><th>Customer</th><th>Branch</th><th>Industry</th><th>Account officer</th><th className="r">Balance</th></tr></thead>
        <tbody>{rows.map(([c, b, ao, bal]) => <tr key={c}><td><a className="m-link">{c}</a></td><td>{b}</td><td>Fuel</td><td>{ao}</td><td className="r">{bal}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function CustomFields() {
  return (
    <>
      <Demo wide caption="Settings › Custom fields, one tab per record type. Each field says its type, whether it’s required, who sees it, and whether it’s on the create form. Collateral appraised is for Finance only.">
        <SettingsPage on="Custom fields"><FieldsList /></SettingsPage>
      </Demo>

      <Demo wide caption={<><b>Add field,</b> a drawer. A label, a type, help text, who can see and change it, and Required, which is off by default. The preview shows the field as people will meet it.</>}>
        <SettingsPage on="Custom fields" drawer={<AddField />}><FieldsList /></SettingsPage>
      </Demo>

      <Section title="Types">
        <When head={['Type', 'For', 'Example']} rows={[
          ['Text', 'Names, codes, short notes', 'Trade name'],
          ['Number', 'Counts and years', 'Year established'],
          ['Money', 'A peso amount, shown as ₱ with two decimals. It’s kept, not used in any sum the system makes', 'Collateral value'],
          ['Date', 'A day', 'Business permit expires'],
          ['Choice', 'One of a short list. Reports can slice by it', 'Industry'],
          ['Yes/no', 'A fact that’s true or not', 'Collateral appraised'],
          ['Person', 'Someone who uses the system', 'Account officer'],
          ['Link to a record', 'Another record, shown as a link and in Related', 'Guarantor, a customer'],
        ]} />
      </Section>

      <Demo wide caption={<><b>On the record,</b> custom fields sit in their own section, More about this customer, with its own Edit, and look like any other field. Ramon is in Finance, so he sees Collateral appraised; Ana doesn’t. Changes go in the history.</>}>
        <Frame as="lead" on="Customers"><CustomerDetail /></Frame>
      </Demo>

      <Section title="Everywhere a field goes">
        <div className="cfd-ex">
          <Demo caption={<><b>The create form.</b> A required custom field sits with the name; the rest fold under More details, which names them. Ana doesn’t see Collateral appraised at all.</>}>
            <Frame on="Customers"><NewCustomer /></Frame>
          </Demo>
          <Demo caption={<><b>A list.</b> Custom fields can be added as columns from ⊞ Columns, and filtered by, like any other field.</>}>
            <Frame on="Customers"><FuelCustomers /></Frame>
          </Demo>
        </div>
        <When head={['Where', 'What a custom field does there']} rows={[
          ['Detail page', 'Shows in More about this customer, with its own Edit drawer'],
          ['Create form', 'Under More details, unless it’s required'],
          ['Lists', 'Can be a column, and a filter'],
          ['Reports', 'Choice, yes/no, and person fields can slice a report: collections by industry'],
          ['Exports', 'A column each, for people who can see the field'],
          ['Search', 'Text values are found: “Consolacion” finds a trade name'],
        ]} />
      </Section>

      <Section title="What a custom field can’t do">
        <When head={['Someone wants to…', 'Custom field?', 'Instead']} rows={[
          ['Keep a fact the business tracks: industry, account officer', 'Yes', '—'],
          ['Rename or remove a built-in field, such as TIN or Balance', 'No', 'Ask for a change to the system'],
          ['Change how money is worked out: interest, penalties, balances', 'No', <>Settings › Loan products and Penalties, or a change to the system</>],
          ['Hold a formula, such as balance × 2%', 'No', 'A report'],
          ['Show a field to people who can’t see the record', 'No', <>Nothing: a field is never wider than its record. See <a className="m-link" href="#/management/access/record-access">Access › Record access</a></>],
          ['Add fields to users, roles, or settings', 'No', 'Those belong to the system, not the business’s records'],
          ['Remove a field', 'Archive it', 'Its values are kept, and it can be restored'],
        ]} />
      </Section>

      <Demo wide caption={<><b>Removing a field archives it,</b> on a confirmation page. It leaves forms, pages, and lists; its values stay, and Restore brings it back with all of them.</>}>
        <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
          <ConfirmPage crumb={['Settings', 'Custom fields', 'Year established', 'Archive']} title="Archive Year established?" meta="A number field on Customers, added by Ramon, 14 Sep"
            facts={[['Customers with a value', '812'], ['Saved views showing it', '2'], ['Required', 'No']]}
            what={[
              <><b>It leaves forms, detail pages, lists, and new exports.</b></>,
              <><b>The 812 values are kept,</b> and stay in each customer’s history.</>,
              <><b>The 2 saved views drop its column.</b> Their owners are told.</>,
              <><b>Restore it from Archived fields,</b> values and all.</>,
            ]}
            back="Back to custom fields" action="Archive field" danger={false} />
        </Frame>
      </Demo>

      <p className="g-see">Agents read and fill custom fields like any other field, as a draft a person checks: see <a className="m-link" href="#/agentic/examples/by-asking">Examples › Changing records by asking</a>.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Most records can have their own fields.', 'Customers, loans, invoices, payments: one tab each in Settings › Custom fields.'],
            ['A custom field is a field.', 'It shows on the record, the create form, lists, filters, reports, exports, and search, like a built-in one.'],
            ['Optional unless you say so.', 'Required is off by default: existing records without a value couldn’t be saved.'],
            ['Never wider than its record.', 'Who sees and changes a field is chosen from people who can see the record, everywhere it shows.'],
            ['It adds, never changes the core.', 'No renaming built-in fields, no formulas, no money logic. Removing one archives it, values kept.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Extra facts typed into Notes.', 'Nobody can filter, report, or search on “fuel, est. 2004, AO Ana”.'],
            ['A “Custom” tab at the end.', 'The fields sit where nobody looks, and never reach a list or a report.'],
            ['Required from the day it’s added.', 'Ana can’t fix a phone number until she invents an industry.'],
            ['A hidden field the export gives away.', 'Collateral appraised stays off the page but turns up in a spreadsheet.'],
            ['Custom fields that change the numbers.', 'A formula disagrees with the balance, and nobody can say which is right.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
