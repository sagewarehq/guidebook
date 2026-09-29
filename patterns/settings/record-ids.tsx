import { Section, Demo, Rules, Avoid, When, Btn, Field, Pill, Sk } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import '../shell/shell.css';

// Record IDs: every record type has a readable ID people use to find and quote it. The format is set per record type,
// IDs are suggested but can be typed (to keep codes from an old system), and changing one never breaks a link.

export default function RecordIds() {
  return (
    <>
      <Demo wide caption="Settings › Record IDs: each record type, its format, whether people can type their own, and the next suggested ID. Customers can keep the codes they had in their old system.">
        <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb">Settings <span>/</span> <b>Record IDs</b></p>
            <div className="as-a-head"><div><p className="m-title">Record IDs</p><p className="as-meta"><span>The ID people see and quote. Changed by Ramon, 1 Jan 2026.</span></p></div></div>
            <table className="m-tbl nb-tbl">
              <thead><tr><th>Record</th><th>Format</th><th>People can type their own</th><th>Next suggested</th><th /></tr></thead>
              <tbody>
                <tr><td>Customer</td><td>CUS-0000</td><td><Pill tone="ok">Yes</Pill></td><td><b>CUS-1205</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                <tr><td>Loan</td><td>LN-0000</td><td><Pill tone="off">No</Pill></td><td><b>LN-2241</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                <tr><td>Payment</td><td>PAY-0000</td><td><Pill tone="off">No</Pill></td><td><b>PAY-0955</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                <tr><td>Branch</td><td>Three letters</td><td><Pill tone="ok">Yes, required</Pill></td><td>—</td><td className="r"><a className="m-link">Change</a></td></tr>
              </tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="On the create page, the ID is filled in with the next suggestion, and can be typed over. It’s checked as they type: TF-001 is free.">
        <Frame on="Customers">
          <div className="as-a-page">
            <p className="as-crumb">Customers <span>/</span> <b>New customer</b></p>
            <p className="m-title">New customer</p>
            <div className="as-a-fields ri-fields">
              <Field label="Customer name" value="Tamarind Foods" />
              <Field label="Customer ID" value="TF-001" focus hint="✓ Free. Suggested: CUS-1205. You can keep the code from your old system." />
            </div>
            <div className="as-a-actbar"><Btn>Cancel</Btn><span className="as-grow" /><Btn kind="pri">Create customer</Btn></div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="Changing an ID, in a drawer on the record. Links, history, and documents keep working, and the old ID still finds the record in search.">
        <Frame on="Customers">
          <div className="pd-big">
            <div className="pd-under"><div className="as-a-page"><p className="as-crumb">Customers <span>/</span> <b>Metro Fuels</b></p><div className="as-a-head"><div><p className="m-title">Metro Fuels · CUS-0088</p><p className="as-meta"><span>Cebu · Net 30</span></p></div></div><div className="as-a-content"><Sk w="70%" /><Sk w="56%" /><Sk w="80%" /><Sk w="64%" /></div></div></div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Change customer ID</b><span>×</span></p>
              <Field label="Customer ID" value="MF-001" focus />
              <p className="ri-note">Was <b>CUS-0088</b>. Searching CUS-0088 still finds Metro Fuels, and the change is in its history. Invoices and documents already issued keep the ID they were made with.</p>
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Change ID</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="Record IDs and document numbers">
        <When head={['', 'Record ID', 'Document number']} rows={[
          ['What it names', 'A record people work with: a customer, a loan, a branch', 'A document that’s issued: an invoice, a receipt'],
          ['Can people type it?', 'Yes, where the business has its own codes', 'No: always the next in the series'],
          ['Can it change?', 'Yes, with the old ID kept for search', 'No: gaps and reuse break the audit'],
          ['See', 'This page', <a className="m-link" href="#/management/settings/numbering">System settings › Numbering</a>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every record type has a readable ID.', 'CUS-1205, LN-2241: the ID people see, quote, and search. The database id stays hidden.'],
            ['Formats set per record type.', 'In Settings › Record IDs: a prefix and a number, or the business’s own codes.'],
            ['Suggested, and typed over when it matters.', 'The next ID is filled in; where allowed, people can type their own, such as codes from an old system.'],
            ['Unique, checked as they type.', '“✓ Free”, or “MF-002 is Metro Fuels Trading”, beside the field.'],
            ['Changing an ID breaks nothing.', 'Links use the hidden id; the old ID stays searchable and the change goes in the history.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Showing the database id.', '#88412 means nothing to anyone, and gives away how many records there are.'],
            ['One fixed format for every business.', 'A client that has called customers MF-001 for ten years has to learn new codes.'],
            ['IDs nobody can set.', 'Migrated customers lose the codes on every printed form and cheque.'],
            ['Duplicates found on save.', 'People lose the form, or two customers share MF-001.'],
            ['IDs that are links.', 'Changing CUS-0088 to MF-001 breaks every bookmark and email that pointed to it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
