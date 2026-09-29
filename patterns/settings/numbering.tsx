import { Section, Demo, Rules, Avoid, When, Btn } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { ConfirmPage } from '../records/confirm-kit';
import '../records/foundations.css';
import '../shell/shell.css';
import '../artifacts/artifacts.css';

// Numbering: every document type has its own series, with a format people can read. Numbers are given when a document
// is issued, never skipped and never reused. Set in Settings › Numbering.

export default function Numbering() {
  return (
    <>
      <Demo wide caption="Settings › Numbering: each document type, its format, what the series runs by, and the next number. Changing a series opens a confirmation page.">
        <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
          <div className="as-a-page">
            <p className="as-crumb">Settings <span>/</span> <b>Numbering</b></p>
            <div className="as-a-head"><div><p className="m-title">Numbering</p><p className="as-meta"><span>Numbers are given when a document is issued. Changed by Ramon, 1 Jan 2026.</span></p></div></div>
            <table className="m-tbl nb-tbl">
              <thead><tr><th>Document</th><th>Format</th><th>Series runs by</th><th>Next number</th><th /></tr></thead>
              <tbody>
                <tr><td>Invoice</td><td>INV-0000</td><td>Whole company</td><td><b>INV-1095</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                <tr><td>Official receipt</td><td>OR-BRANCH-0000</td><td>Branch</td><td><b>OR-CEB-0923</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                <tr><td>Statement</td><td>ST-YYYY-MM-0000</td><td>Month</td><td><b>ST-2026-09-0413</b></td><td className="r"><a className="m-link">Change</a></td></tr>
                              </tbody>
            </table>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="Changing a series says what the next document will be numbered, and what it means for the numbers in between.">
        <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
          <ConfirmPage crumb={['Settings', 'Numbering', 'Invoice']} title="Start invoices at INV-2000?" meta="From the next invoice issued"
            facts={[['Last issued', 'INV-1094'], ['Next', 'INV-2000'], ['Numbers left unused', '905']]}
            what={[
              <><b>The next invoice is INV-2000,</b> and the series carries on from there.</>,
              <><b>INV-1095 to INV-1999 are never used.</b> The gap is recorded, with your reason, for the auditor.</>,
              <><b>Existing invoices keep their numbers.</b></>,
            ]}
            reason="New financial year, as agreed with our accountant"
            back="Back to numbering" action="Start at INV-2000" danger={false} />
        </Frame>
      </Demo>

      <p className="g-see">Records people work with, like customers and loans, have IDs instead, which can be typed and changed: see <a className="m-link" href="#/management/settings/record-ids">System settings › Record IDs</a>.</p>

      <Section title="When a number is given">
        <When head={['Moment', 'Gets a number?']} rows={[
          ['Draft saved', 'No. Drafts show “Draft”, so no numbers are used up by work that’s thrown away.'],
          ['Issued, released, or recorded', 'Yes: the next in its series, at that moment.'],
          ['Voided', 'Keeps its number, marked Void. The number is never given again.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One series per document type.', 'Invoices, receipts, and statements each run their own series.'],
            ['A format people can read.', 'A short prefix and the number: INV-1095, OR-CEB-0923. Add the branch or month only when the business needs it.'],
            ['Number on issue, not on draft.', 'Drafts show “Draft”; the number is given when the document is issued.'],
            ['No gaps, never reused.', 'Voided documents keep their number. A deliberate jump is confirmed and recorded.'],
            ['Show the next number.', 'Settings › Numbering says what the next document will be, for every type.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['One number for everything.', 'Invoice 1095 and receipt 1096 are hard to tell apart, and gaps appear in both.'],
            ['Database ids as document numbers.', '#88412 means nothing, and jumps whenever anything else is saved.'],
            ['Numbering drafts.', 'Thrown-away drafts leave gaps the auditor asks about.'],
            ['Reusing a voided number.', 'Two different invoices with the same number, and nobody can tell which was paid.'],
            ['A series nobody can see.', 'People only find out the numbering changed when a customer asks.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
