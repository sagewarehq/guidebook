import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, When, Btn, Pill, Pin, Field } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { H } from '../shell/places-kit';
import { ThreePlaces } from '../shell/three-kit';
import '../shell/shell.css';

// System settings: how the business works in the system, for business leads. How the area is laid out (an entry at
// the sidebar foot, sections grouped by part of the business, each section a list or a short form), then a few
// examples of sections.

const groups: [string, string[]][] = [
  ['Business', ['General', 'Branches', 'Record IDs', 'Custom fields']],
  ['Money', ['Payment terms', 'Numbering', 'Taxes']],
  ['Lending', ['Loan products', 'Penalties']],
  ['Work', ['Approval limits']],
  ['Documents', ['Headers and footers']],
];

function SettingsPage({ on, pins, children }: { on: string; pins?: boolean; children: ReactNode }) {
  const nav = <div className="sh-setnav st-groups">{groups.map(([g, items]) => <div key={g}><small>{g}</small>{items.map(x => <p key={x} className={x === on ? 'on' : undefined}>{x}</p>)}</div>)}</div>;
  return (
    <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p>{pins ? <H n={1}><p className="as-nav on">Settings</p></H> : <p className="as-nav on">Settings</p>}<p className="as-nav">Help</p></>}>
      <div className="as-a-page">
        <p className="as-crumb">Settings <span>/</span> <b>{on}</b></p>
        <div className="sh-set">
          {pins ? <H n={2} className="block">{nav}</H> : nav}
          <div className="sh-setbody">{children}</div>
        </div>
      </div>
    </Frame>
  );
}

export default function Settings() {
  return (
    <>
      <Demo wide caption="How Settings is laid out. The entry sits at the sidebar foot, for business leads (1). Inside, sections are grouped by the part of the business they shape (2). Each section is its own page: a header that says what it affects and who changed it last (3), then a list or a short form (4).">
        <SettingsPage on="Payment terms" pins>
          <div className="sh-rel"><Pin n={3} className="sh-bp" /><div className="m-row"><div><p className="m-title">Payment terms</p><p className="as-meta"><span>Offered on new invoices. Changed by Ramon, 12 Sep.</span></p></div><Btn kind="pri">New payment term</Btn></div></div>
          <div className="sh-rel"><Pin n={4} className="sh-bp" />
            <table className="m-tbl">
              <thead><tr><th>Term</th><th>Due after</th><th>Used by</th><th /></tr></thead>
              <tbody>
                <tr><td>Net 30 <Pill tone="ok">Default</Pill></td><td>30 days</td><td>112 customers</td><td className="r"><a className="m-link">Edit</a></td></tr>
                <tr><td>Net 45</td><td>45 days</td><td>14 customers</td><td className="r"><a className="m-link">Edit</a></td></tr>
                <tr><td>Cash on delivery</td><td>—</td><td>0 customers</td><td className="r"><a className="m-link">Edit</a></td></tr>
              </tbody>
            </table>
          </div>
        </SettingsPage>
      </Demo>

      <Section title="How it’s laid out">
        <When head={['Level', 'What it is', 'Example']} rows={[
          ['Entry', 'Settings, at the sidebar foot, only for roles given a section', 'Ramon sees Settings; Ana doesn’t'],
          ['Groups', 'Sections grouped by the part of the business they shape, in the owner’s words', 'Business, Money, Lending, Work, Documents'],
          ['A list section', 'Things the business keeps several of, each edited in a drawer', 'Payment terms, loan products, footers'],
          ['A form section', 'One set of choices, saved together, confirmed when it affects money or access', 'General, numbering, approval limits'],
        ]} />
      </Section>

      <Section title="A few examples">
        <div className="st-ex">
          <Demo caption={<><b>Approval limits,</b> a form. Each limit says who approves above it. Saving says who gains or loses approvals first.</>}>
            <SettingsPage on="Approval limits">
              <div><p className="m-title">Approval limits</p><p className="as-meta"><span>Above these, a person must approve. Changed by Ramon, 1 Sep.</span></p></div>
              <div className="st-form">
                <Field label="Payments above" value="₱500,000.00" hint="Approved by Finance" />
                <Field label="Loan releases above" value="₱2,000,000.00" hint="Approved by two branch managers" />
                <Field label="Discounts above" value="10%" hint="Approved by Finance" />
              </div>
              <p className="st-save"><Btn kind="pri">Save limits</Btn></p>
            </SettingsPage>
          </Demo>
          <Demo caption={<><b>Loan products,</b> a list. Each product is edited in a drawer; a change applies to loans released after it.</>}>
            <SettingsPage on="Loan products">
              <div className="m-row"><div><p className="m-title">Loan products</p><p className="as-meta"><span>Offered on new loans. Changed by Ramon, 3 Sep.</span></p></div><Btn kind="pri">New product</Btn></div>
              <table className="m-tbl">
                <thead><tr><th>Product</th><th>Rate</th><th>Terms</th><th>Loans</th></tr></thead>
                <tbody>
                  <tr><td>Business loan</td><td>12.5% a year</td><td>6 to 36 months</td><td>1,204</td></tr>
                  <tr><td>Vehicle loan</td><td>10% a year</td><td>12 to 48 months</td><td>418</td></tr>
                  <tr><td>Salary loan <Pill tone="off">Archived</Pill></td><td>18% a year</td><td>3 to 12 months</td><td>96</td></tr>
                </tbody>
              </table>
            </SettingsPage>
          </Demo>
        </div>
      </Section>

      <Section title="Three places, three jobs">
        <ThreePlaces />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['How the business works, nothing else.', 'Terms, numbering, products, limits, headers and footers. People, security, and schedules are System administration.'],
            ['Grouped by the part of the business.', 'Money, Lending, Work, Documents: the owner’s words, not the tables behind them.'],
            ['Each section says what it affects, and who changed it.', 'A line in the header: “Offered on new invoices. Changed by Ramon, 12 Sep.”'],
            ['Lists for many, forms for one.', 'Several of a thing is a list, edited in a drawer; one set of choices is a short form, saved together.'],
            ['Given by section, to the right leads.', 'Finance manages Money and Work; branch managers only Branches.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Users and passwords mixed in with payment terms.', 'A finance lead can lock people out while fixing a template.'],
            ['“Configuration”, “Masterfiles”, “Parameters”.', 'Nobody knows which one holds the invoice numbers.'],
            ['Settings with no explanation.', 'People change one to see what happens, on the live system.'],
            ['One long form of everything.', 'Saving a changed footer also saves a half-edited approval limit.'],
            ['All of Settings, or none.', 'Either Finance can’t fix a template, or everyone can change everything.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
