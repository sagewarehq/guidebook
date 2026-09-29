import { Section, Demo, Pair, Rules, Avoid, When, Btn, Field, Win } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { cx } from '../../lib/cx';
import '../records/foundations.css';
import './forms.css';

// Wizards: a form in steps. When steps help (the answers change what comes next, or the work takes more than one
// sitting), the step bar, saving a draft, and the review step. A loan application at Metro Lending as the example.

const steps = ['Borrower', 'Loan', 'Collateral', 'Documents', 'Review'];

/** The step bar: done steps ticked and clickable, the current one marked, later ones waiting. */
function StepBar({ at }: { at: number }) {
  return (
    <ol className="wz-steps">
      {steps.map((s, i) => <li key={s} className={cx(i < at && 'done', i === at && 'on')}><i>{i < at ? '✓' : i + 1}</i>{s}</li>)}
    </ol>
  );
}

function Step() {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Loans <span>/</span> <b>New application</b></p>
      <div className="as-a-head"><div><p className="m-title">New loan application</p><p className="as-meta"><span>Metro Fuels · Draft, saved 2 minutes ago</span></p></div></div>
      <StepBar at={2} />
      <div className="as-a-content as-a-fields">
        <p className="m-k">Step 3 of 5 · Collateral</p>
        <div className="m-field"><label>Collateral</label><div className="fl-radios row">{['None', 'Vehicle', 'Real estate', 'Deposit'].map(o => <span key={o} className={cx('fl-radio', o === 'Vehicle' && 'on')}><i />{o}</span>)}</div></div>
        <Field label="Plate number" value="GAB 4721" />
        <Field label="Make and model" value="Isuzu N-Series, 2022" />
        <p className="wz-why">Asked because you chose Vehicle. Real estate asks for the title instead.</p>
      </div>
      <div className="as-a-actbar"><Btn kind="quiet">Save and close</Btn><span className="as-grow" /><Btn>Back</Btn><Btn kind="pri">Continue to documents</Btn></div>
    </div>
  );
}

function Review() {
  const rows: [string, string[]][] = [
    ['Borrower', ['Metro Fuels · Business', 'TIN 204-311-580-000']],
    ['Loan', ['₱1,180,000.00 · 12 months', '12.5% a year · Monthly']],
    ['Collateral', ['Vehicle · GAB 4721', 'Isuzu N-Series, 2022']],
    ['Documents', ['3 of 3 attached']],
  ];
  return (
    <Win title="Loans / New application" className="wz-rev">
      <StepBar at={4} />
      <p className="m-title">Check before you submit.</p>
      {rows.map(([h, l]) => (
        <div key={h} className="wz-sum"><p className="m-k">{h}</p><span>{l.map(x => <b key={x}>{x}</b>)}</span><a className="m-link">Edit</a></div>
      ))}
      <p className="wz-next">Liza, Cebu branch manager, reviews it next.</p>
      <span className="pd-foot"><Btn>Back</Btn><Btn kind="pri">Submit application</Btn></span>
    </Win>
  );
}

/** The same application crammed into one wizard badly: a step per field, no names, no way back. */
function Bad() {
  return (
    <Win title="Loan Wizard" className="wz-rev">
      <p className="wz-bad-steps">Step 7 of 23</p>
      <Field label="Plate No.*" value="" />
      <span className="pd-foot"><Btn kind="pri">Next</Btn></span>
    </Win>
  );
}

export default function Wizards() {
  return (
    <>
      <Demo wide caption="A loan application in five named steps. Done steps are ticked and can be reopened; the current step asks only what this step needs, and says why a question is there. The draft saves as they go.">
        <Frame on="Loans"><Step /></Frame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="The last step is a review: every answer, grouped by step, each with Edit. It says what happens after Submit.">
          <Review />
        </Demo>
        <Demo verdict="avoid" caption="A step per field, numbered but not named, no Back, no draft. People can’t tell how far they are or check what they said.">
          <Bad />
        </Demo>
      </Pair>

      <Section title="Steps, or one page">
        <When head={['Use', 'When', 'Example']} rows={[
          ['One form page', 'Most forms. Everything fits in a few sections, and every answer is asked of everyone.', 'New customer, New invoice'],
          ['One page with sections', 'Long, but the same for everyone. The outline lets people jump around.', 'Customer onboarding details'],
          ['Wizard', 'Earlier answers change later questions; or the work takes more than one sitting, or gathers documents; or it ends in a submit that sends it to someone.', 'Loan application, Payment run, Importing a spreadsheet'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Three to six named steps.', 'Named by what’s in them, Borrower, Loan, Collateral, not Step 1, Step 2. Fewer, and it’s a page; more, and it’s two jobs.'],
            ['Ask only what this step needs.', 'Skip questions an earlier answer made pointless, and say why a question is there when it follows from one.'],
            ['Save as they go, and Back loses nothing.', 'Every Continue saves a draft, and going back keeps every answer. Save and close returns to the same step.'],
            ['Check each step before moving on.', 'Errors show on the step they belong to, not all at the end.'],
            ['End with a review, and name the button.', 'Every answer, grouped by step, each with Edit, and who sees it next. Then Submit application, never a bare Finish.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A step per field, or a wizard for a form that’s the same for everyone.', '“Step 7 of 23” for what one page with sections would hold.'],
            ['Asking what an earlier answer made pointless.', 'Someone who chose Vehicle is still asked for a land title.'],
            ['Losing the answers on Back, a closed tab, or a timed-out session.', 'A long application has to be typed again from the start.'],
            ['Every error at the end.', 'People go back through the steps to find what’s wrong.'],
            ['Ending on a bare Next or Finish.', 'People submit without checking, or knowing what happens next.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
