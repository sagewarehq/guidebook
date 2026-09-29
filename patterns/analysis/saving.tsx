import { Section, Demo, Pair, Rules, Avoid, When, Btn, Field, Sk } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg } from '../agents/agent-kit';
import { Window, PivotChips, pivotSessions } from './analysis-kit';

// Saving an analysis: only a person turns an analysis into a report. Save as report… opens a drawer that asks for a
// name, where it goes in Reports, who sees it, and whether to email it. Once saved it’s a report like any other,
// worked out from the system each time it opens; changing it later asks update or save as new, as in Management ›
// Reports and analytics › Saving and sharing. An analysis nobody saves stays in its session.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const Radio = ({ on, children }: { on?: boolean; children: string }) => <span className={`sv-radio${on ? ' on' : ''}`}><i />{children}</span>;

/** The save drawer, in place of the pivot in the Agents window’s drawer. */
function SaveForm() {
  return (
    <>
      <p className="an-foot">Collected, by collector and month · Baguio · Jun – Sep 2026</p>
      <Field label="Name" value="Baguio collections by collector" />
      <Field label="In Reports, under" value="Collections" select />
      <div className="m-field"><label>Period</label><div className="sv-radios"><Radio on>The last 4 months, moving on with the calendar</Radio><Radio>1 Jun – 30 Sep 2026, fixed</Radio></div></div>
      <div className="m-field"><label>Shared with</label><div className="sv-radios"><Radio>Only me</Radio><Radio on>Finance</Radio><Radio>Baguio branch</Radio></div></div>
      <div className="m-field"><label>Email it</label><div className="sv-radios"><Radio on>Never</Radio><Radio>Every Monday, 8:00 AM</Radio></div></div>
      <p className="m-hint">Worked out from the system each time it opens. Each person sees only the branches their role allows.</p>
      <p className="an-acts"><Btn>Cancel</Btn><Btn kind="pri">Save report</Btn></p>
    </>
  );
}

// The Collections group in Reports, after Ramon saved the pivot.
const reports: [string, string, string, string, string, boolean?][] = [
  ['Collections by branch', 'Are we collecting what’s due? By month, by branch', 'Loans OS', 'Everyone', 'Today, 9:12 AM'],
  ['Collections this month', 'Due, collected, and on time, by officer', 'Loans OS', 'Everyone', 'Today, 8:00 AM'],
  ['Baguio collections by collector', 'Last 4 months · by collector and month · Baguio', 'Ramon Cruz, from Nico’s analysis', 'Finance', 'Today, 9:24 AM', true],
  ['Overdue by branch', 'Where is the overdue money?', 'Loans OS', 'Everyone', 'Today, 7:30 AM'],
];

export default function Saving() {
  return (
    <>
      <Demo wide caption={<>Save as report… on Nico’s pivot turns the drawer into a short form. Ramon names it, picks where it goes in Reports, saves the period as a rule, and shares it with Finance. Nico filled in what he knew; Ramon decides, and Save report is his button.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <Window sessions={pivotSessions} title="Baguio collections by collector" drawerTitle="Save as report" chat={<>
            <Day label="Today" />
            <Me>Split Baguio’s collections by collector, June to September.</Me>
            <Msg><span><b>Rey Castillo’s Route 3 fell ₱325,000 from August</b>, the most of any collector. The pivot is on the right.</span></Msg>
            <Me>Keep this for Finance.</Me>
            <Msg>I’ve filled in the save form on the right. Check it, then Save report.</Msg>
          </>} drawer={<SaveForm />} />
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>It’s now a report like any other, in Reports › Collections beside the ones that came with Loans OS. Its line says who saved it and from which analysis. Each time anyone in Finance opens it, the figures are worked out again from the system.</>}>
        <AgentFrame as="lead" loud on="Reports">
          <div className="as-a-page an-list">
            <p className="as-crumb">Reports <span>/</span> <b>Collections</b></p>
            <div className="as-a-head"><div><p className="m-title">Collections</p><p className="as-meta"><span>4 reports</span></p></div></div>
            <table className="m-tbl">
              <thead><tr><th>Report</th><th>Made by</th><th>Shared with</th><th>Last run</th></tr></thead>
              <tbody>{reports.map(([n, s, by, w, at, isNew]) => (
                <tr key={n} className={isNew ? 'an-new' : undefined}><td><a className="m-link">{n}</a><small>{s}</small></td><td>{by}</td><td>{w}</td><td>{at}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Later, Ramon switches its columns to Product. The saved report doesn’t change for Finance: a line says what changed, with Save for him as the owner, and Save as new for anyone. The same choice as Management › <a className="m-link" href="#/management/reports/saving">Saving and sharing</a>.</>}>
        <AgentFrame as="lead" loud on="Reports">
          <div className="as-a-page">
            <p className="as-crumb">Reports <span>/</span> Collections <span>/</span> <b>Baguio collections by collector</b></p>
            <div className="as-a-head"><div><p className="m-title">Baguio collections by collector</p><p className="as-meta"><span>Saved by Ramon Cruz from Nico’s analysis · shared with Finance · as of 28 Sep 2026, 2:40 PM</span></p></div></div>
            <PivotChips cols="Product" period="Last 4 months" />
            <p className="sv-changed">Columns changed from Month to Product. <a className="m-link">Save</a> · <a className="m-link">Save as new</a> · <a className="m-link">Undo</a></p>
            <Sk w="94%" /><Sk w="86%" /><Sk w="90%" /><Sk w="72%" />
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>Nico offers to save it and fills in the form. Ramon checks the name, the period, and who sees it, and saves it himself.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Agents · Baguio collections by collector">
              <Me>Keep this for Finance.</Me>
              <Msg>
                <span>I’ve filled in the save form: <b>Baguio collections by collector</b>, under Collections, shared with Finance.</span>
                <span className="an-acts"><Btn kind="pri">Check and save…</Btn></span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Nico saved it and shared it with everyone himself. A report nobody decided on is now in every branch’s Reports, under a name nobody chose.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Agents · Baguio collections by collector">
              <Me>Keep this for Finance.</Me>
              <Msg>Done. I’ve added <b>Collector report (auto)</b> to Reports and <b className="an-bad">shared it with everyone</b>.</Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="Report, pivot, analysis, or saved report">
        <When head={['When people want…', 'Use', 'Why']} rows={[
          ['A figure a report already shows', <>The report. See {link('analysis/from-reports', 'Answering from reports')}.</>, 'The same figures everyone sees'],
          ['The same figures, cut another way', <>A pivot. See {link('analysis/pivots', 'Pivot tables')}.</>, 'Named measures, and settings people change'],
          ['Something no report or pivot answers', <>An analysis. See {link('analysis/beyond', 'Going beyond the reports')}.</>, 'Labelled, read-only, and re-runnable'],
          ['The same answer every week, or for a team', 'Save as report', 'A person saves it; it refreshes like any report'],
          ['A one-off answer', 'Leave it in the session', 'It stays there, labelled, and never shows in Reports'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A person saves it.', 'Save report is Ramon’s button; Nico can fill in the form, not press it.'],
            ['It goes to Reports.', 'In a group like any other report, saying who saved it and from which analysis.'],
            ['Choose who sees it.', 'Only me, a team, or a branch; each viewer sees what their role allows.'],
            ['It refreshes like any report.', 'Worked out from the system each time, with the period saved as a rule.'],
            ['Unsaved stays in the session.', 'Labelled as an analysis, in its session, and never in Reports.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Agents publishing reports.', 'A report nobody decided on turns up for everyone.'],
            ['Saved answers kept in the chat.', 'Finance can’t find it next month without asking Nico again.'],
            ['Sharing with everyone by default.', 'Collectors’ figures reach people who never needed them.'],
            ['Saving a snapshot.', 'The report still shows September’s figures in December.'],
            ['Every analysis in Reports.', 'Each question anyone asked becomes a report, and the useful ones get lost.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
