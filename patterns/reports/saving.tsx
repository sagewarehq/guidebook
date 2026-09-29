import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { ReportPage, ReportFrame, Params, cebuByMonth } from './report-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import './reports.css';

// Saving and sharing: every report can be saved with its period and slicing, shared with a team, and emailed on a
// schedule. The save opens in a drawer over the report.

const Radio = ({ on, children }: { on?: boolean; children: string }) => <span className={`sv-radio${on ? ' on' : ''}`}><i />{children}</span>;

export default function Saving() {
  return (
    <>
      <Demo wide caption="Save report on a saved report asks one thing first: update the one that’s open, or save a new one. Either way it saves exactly what’s on screen, shared with the people who need it, and emailed on a schedule if they want.">
        <ReportFrame>
          <div className="pd-big">
            <div className="pd-under"><ReportPage data={cebuByMonth} branch="Cebu" /></div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Save report</b><span>×</span></p>
              <p className="pd-side-s">Profit and loss · this quarter · by month · Cebu</p>
              <div className="m-field"><label>Save as</label><div className="sv-radios"><Radio>Update “Q3 by month”, for everyone it’s shared with</Radio><Radio on>A new report</Radio></div></div>
              <Field label="Name of the new report" value="Q3 by month, Cebu" />
              <div className="m-field"><label>Shared with</label><div className="sv-radios"><Radio>Only me</Radio><Radio on>Finance</Radio><Radio>Cebu branch</Radio></div></div>
              <div className="m-field"><label>Email it</label><div className="sv-radios"><Radio>Never</Radio><Radio on>Every Monday, 8:00 AM</Radio><Radio>On the 1st of the month</Radio></div></div>
              <p className="m-hint">Each person sees only the branches their role allows.</p>
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save report</Btn></span>
            </div>
          </div>
        </ReportFrame>
      </Demo>

      <Demo wide caption="Changing a saved report doesn’t change it for everyone. A line says what changed, with Save for the owner, and Save as new for anyone.">
        <ReportFrame>
          <div className="as-a-page">
            <p className="as-crumb">Reports <span>/</span> Profit and loss <span>/</span> <b>Q3 by month</b></p>
            <p className="m-title">Profit and loss</p>
            <Params branch="Cebu" />
            <p className="sv-changed">Branch changed from All branches to Cebu. <a className="m-link">Save</a> · <a className="m-link">Save as new</a> · <a className="m-link">Undo</a></p>
          </div>
        </ReportFrame>
      </Demo>

      <Section title="What’s saved">
        <When head={['Saved', 'Not saved']} rows={[
          ['The period, as a rule: “this quarter” stays this quarter', 'The figures: they’re worked out fresh every time it opens'],
          ['Show by, compare to, and branch', 'Anything the viewer’s role doesn’t allow them to see'],
          ['The name, who it’s shared with, and the email schedule', 'The shape of the report: that’s fixed for everyone'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Every report can be saved.', 'Save report is the primary action on every report page, and it saves exactly what’s on screen.'],
            ['Save the period as a rule.', '“This quarter” moves on with the calendar. Fixed dates only when people pick them.'],
            ['Share with a team, not a list of names.', 'Finance, Cebu branch. People who join the team see it too.'],
            ['Each viewer sees what their role allows.', 'A shared report shows Liza only Cebu, even when Ramon saved it for all branches.'],
            ['Update it, or save a new one.', 'Saving a changed report asks which, and says who an update reaches. Only the owner can update a shared report.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Saving only as a bookmark.', 'The link breaks when the report changes, and nobody else can find it.'],
            ['Saving fixed dates by default.', 'The Monday report still shows last quarter, three months on.'],
            ['Sharing with named people only.', 'New staff never see it, and people who leave still get it.'],
            ['Shared reports that show everything.', 'A branch manager sees every branch’s numbers through a colleague’s report.'],
            ['One Save that silently overwrites.', 'Ramon filters to Cebu once, and Finance’s report is wrong from then on.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
