import type { ReactNode } from 'react';
import { Section, Demo, Rules, Avoid, Btn, Field, Pin } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { Flow, Saves, Under, FileChip, alink, mlink } from './a-kit';

// Turning a document into a record: a walk-in leaves a paper loan application at the Cebu branch. Ana photographs
// its two pages and hands them to Bea, who drafts the application in the real New loan application form: every field
// numbered to the box on the page it came from, the smudged TIN left blank with what could be read, and the missing
// signature said before saving. Ana checks it against the photo and saves it as LN-2271, the next loan number at
// Metro Lending; it waits for the signature before credit review.

/** The fields Bea filled: label, value, where on the form it came from. The TIN is left blank. */
const fields: [label: string, value: string, from: string][] = [
  ['Applicant', 'Bantayan Seafoods', 'Page 1, business name'],
  ['TIN', '', 'Page 1, TIN'],
  ['Contact person', 'Rosa Villanueva, owner', 'Page 1, contact'],
  ['Mobile', '0917 482 3316', 'Page 1, contact'],
  ['Loan product', 'Business loan', 'Page 1, loan type'],
  ['Amount', '₱1,500,000.00', 'Page 1, amount'],
  ['Term', '24 months', 'Page 1, term'],
  ['Purpose', 'Second packing line', 'Page 1, purpose'],
];

/** Page 1 as photographed: the same numbers as the fields, the TIN smudged. */
function Photo() {
  const line = (n: number, label: string, value: ReactNode, cls?: string) => (
    <p className={cls ? `exa-pl ${cls}` : 'exa-pl'}><Pin n={n} /><span>{label}</span><em>{value}</em></p>
  );
  return (
    <div className="exa-scan">
      <p className="exa-scan-h"><b>IMG_4102.jpg</b><span className="exa-pages"><span className="on">Page 1</span><span className="bad">Page 2 · not signed</span></span></p>
      <div className="exa-paper">
        <h4>Metro Lending · Business loan application</h4>
        {line(1, 'Business name', 'Bantayan Seafoods', 'hot')}
        {line(2, 'TIN', <span className="exa-smudge">204-3▒1-580-000</span>, 'bad')}
        {line(3, 'Contact person', 'Rosa Villanueva (owner)')}
        {line(4, 'Mobile', '0917 482 3316')}
        {line(5, 'Loan type', '☒ Business  ☐ Salary  ☐ Vehicle')}
        {line(6, 'Amount', 'P1,500,000.00')}
        {line(7, 'Term', '24 mos.')}
        {line(8, 'Purpose', '2nd packing line')}
      </div>
    </div>
  );
}

/** The real New loan application page, filled in by Bea, beside the photo. Ana checks it and saves. */
function Draft() {
  return (
    <div className="exa-dpage">
      <div className="exa-dhead">
        <p className="as-crumb">Loans <span>/</span> <b>New loan application</b></p>
        <div className="as-a-head"><div><p className="m-title">New loan application</p><p className="as-meta"><span>Drafted by Bea from 2 photos, 10:48 AM · not saved yet</span></p></div></div>
      </div>
      <div className="exa-intake">
        <div className="exa-form">
          <p className="exa-banner"><b>Drafted by Bea from the photos.</b> Each field’s number matches its box on the page.</p>
          <div className="exa-grid">
            {fields.map(([label, value, from], i) => (
              <div key={label} className="exa-fld">
                {value
                  ? <Field label={label} value={value} select={label === 'Loan product'} />
                  : <Field label={label} placeholder="000-000-000-000" optional error="Smudged. It reads 204-3?1-580-000. Ask the applicant." />}
                <p className="exa-from"><Pin n={i + 1} />{from}</p>
              </div>
            ))}
          </div>
          <p className="exa-miss"><b>Page 2 isn’t signed.</b> It saves as a draft application, and goes to credit review once it is.</p>
          <p className="exa-bar2"><Btn>Cancel</Btn><span className="as-grow" /><small>Saves as LN-2271, and adds Bantayan Seafoods as a customer</small><Btn kind="pri">Save application</Btn></p>
        </div>
        <Photo />
      </div>
    </div>
  );
}

export default function Intake() {
  return (
    <>
      <Demo wide caption={<><b>1. Hand it the paper.</b> A walk-in leaves a paper application at the Cebu branch. Ana photographs both pages and gives them to Bea, who drafts the application and says up front what she couldn’t fill.</>}>
        <div className="exa-mid">
          <AgentFrame as="staff" loud on="Loans" overlay={
            <ChatPanel agent="bea" status="Ready" onPage="Loans · Cebu branch">
              <Day label="Today" />
              <p className="exa-files"><FileChip name="IMG_4102.jpg" meta="Page 1" /><FileChip name="IMG_4103.jpg" meta="Page 2" /></p>
              <Me ini="AR">A walk-in left this. Make it into a loan application.</Me>
              <Steps items={[[true, 'Filled 11 of 13 fields, each from its box on the form'], ['flag', 'The TIN is smudged on page 1'], ['flag', 'Page 2 isn’t signed']]} />
              <Msg>The draft is in the New loan application form for you to check. <a className="m-link">Open the draft</a></Msg>
            </ChatPanel>
          }>
            <Under crumb={['Loans']} title="Loans" meta={<span>Cebu branch · 312 open</span>} />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<><b>2. Check the draft against the page.</b> The draft opens in the real New loan application form, with the photo beside it, each field numbered to its box. The TIN is left blank, with what could be read, rather than guessed; the missing signature is said before saving. Only the name is needed to save, as on any {mlink('records/create', 'Create record')} page. Ana saves it; the photos go with the record.</>}>
        <AgentFrame as="staff" loud on="Loans">
          <Draft />
        </AgentFrame>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          ['Ana', 'Photographs the paper form, or forwards the PDF, and hands it to Bea.', alink('chat/asking', 'Asking an Agent')],
          ['Bea', 'Reads each page and fills the real form, noting where each value came from.', alink('explaining/sources', 'Sources')],
          ['Bea', 'Leaves blank what she can’t read, and flags what’s missing.', alink('explaining/holds', 'Holds and flags')],
          ['Ana', 'Checks each field against the photo, and corrects any.', <>{alink('chat/open-screen', 'Open the real screen')}, {alink('approvals/edit-first', 'Changing before approving')}</>],
          ['Ana', 'Saves it. The record keeps the photos, and says Bea drafted it.', <>{mlink('records/create', 'Create record')}, {alink('explaining/history', 'In the history')}</>],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saves rows={[
          ['Type the form in', '13 fields by hand: 12 minutes', 'Checking 11 filled fields: 3 minutes'],
          ['Find what’s missing', 'At credit review, 2 days later', 'Before saving, today'],
        ]} total={['15 minutes, and a 2-day bounce', 'About 3 minutes']} />
        <p className="g-see">Ana still checks every field and saves it: a wrong amount or name follows the customer everywhere.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Draft into the real form, with sources.', 'Each field is numbered to its box, and the photo beside it has the same numbers.'],
            ['Leave blank what it can’t read.', 'The smudged TIN stays empty, with what could be read beside it.'],
            ['A person saves it.', 'Ana checks the fields against the photo and clicks Save application.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A record written out in the chat.', 'Ana types it into the form anyway, with nothing to check it against.'],
            ['A best guess in the field.', '204-381-580-000, filled in, looking just as sure as the rest.'],
            ['The Agent creating the record.', 'An application appears that nobody at the branch has checked.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
