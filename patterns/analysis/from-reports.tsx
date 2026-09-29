import { Section, Demo, Pair, Rules, Avoid, When, Btn } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, Ask } from '../agents/agent-kit';
import { CollectionsReport } from './analysis-kit';

// Answering from reports: Nico looks for a report that answers the question before he counts anything himself. His
// reply names it, and Open the report opens that report with the same period, slicing, and branch, so the figures in
// the chat are the figures everyone sees. When no report answers it, he says so and offers an analysis.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

/** Nico’s answer: the figures, the report they came from, and the button that opens it. */
function FromReport() {
  return (
    <div className="ag-card">
      <div className="ag-card-h"><b>Collections by branch</b><small>Reports · 1 Jun – 30 Sep 2026 · by month · all branches · as of 9:12 AM</small></div>
      <p className="ag-facts"><span><small>Baguio, Aug</small>₱4,180,000</span><span><small>Baguio, Sep</small>₱3,420,000</span><span><small>Change</small>−₱760,000</span></p>
      <p className="ag-acts"><Btn kind="pri">Open the report</Btn><small>Opens with this period and branch set.</small></p>
    </div>
  );
}

export default function FromReports() {
  return (
    <>
      <Demo wide caption={<>Ramon asks Nico about Baguio from the invoices list. Nico finds the report that answers it first, Collections by branch, sets its period, and reads Baguio’s row. The reply names the report and says when it ran; the figures are the report’s, not a count of his own.</>}>
        <div className="an-mid">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="nico" status="Answering a question on Baguio" onPage="Invoices · Overdue in Cebu">
              <Day label="Today" />
              <Me>Why did collections drop in Baguio in September?</Me>
              <Steps items={[[true, 'Looked for a report: Reports › Collections by branch'], [true, 'Set it to 1 Jun – 30 Sep 2026, by month'], [true, 'Read Baguio’s row']]} />
              <Msg>
                <span><b>Baguio collected ₱3,420,000 in September, ₱760,000 less than August.</b> These are the report’s own figures.</span>
                <FromReport />
                <span>The report shows the drop, not why. I can split it by collector from the same figures. Want that?</span>
              </Msg>
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>Open the report opens the report everyone uses, set to what Nico read: June to September, by month, all branches. Baguio’s September is ₱3,420,000 here too, as of the same 9:12 AM, and every figure opens its payments.</>}>
        <AgentFrame as="lead" on="Reports" loud>
          <div className="as-a-page"><CollectionsReport /></div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>The figure comes from the report, which the reply names and opens. Ramon, the branch, and the report all read ₱3,420,000.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Reports · Collections by branch">
              <Me>How much did Baguio collect in September?</Me>
              <Msg>
                <span><b>₱3,420,000</b>, from Collections by branch, as of 9:12 AM.</span>
                <FromReport />
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Nico counted the payments himself, by the date they were made rather than posted. His figure is ₱24,600 off the report, and Ramon now has two numbers for one question.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Reports · Collections by branch">
              <Me>How much did Baguio collect in September?</Me>
              <Msg>I added up 1,204 payments made in Baguio from 1 to 28 September: <b className="an-bad">₱3,395,400</b>.</Msg>
              <Me>The report says ₱3,420,000. Which is right?</Me>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>No report answers this one, and Nico says so. He names the nearest reports, then offers an analysis, and says what it would be. See {link('analysis/beyond', 'Going beyond the reports')}.</>}>
          <div className="an-box tall">
            <ChatPanel agent="nico" status="Waiting on you" onPage="Reports">
              <Me>Which customers are paying later since the rate change?</Me>
              <Steps items={[[true, 'Looked for a report: none compares customers before and after 1 Jul'], [true, 'Nearest: Collections by branch, Overdue by branch']]} />
              <Msg>No report answers this. Those two count pesos by branch, not how late each customer pays.</Msg>
              <Ask question={<>I can work it out as an analysis: <b>On-time rate</b> by customer, Apr–Jun against Jul–Sep, for loans repriced on 1 Jul. It’s read-only, and you can re-run it.</>} options={['Run the analysis', 'Open Overdue by branch']} />
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>The same question, answered as if a report said so. No report, no measure, nothing to open, and no sign that this was worked out on the spot.</>}>
          <div className="an-box tall">
            <ChatPanel agent="nico" status="Ready" onPage="Reports">
              <Me>Which customers are paying later since the rate change?</Me>
              <Msg>Customers on the new rates are paying <b className="an-bad">9 days later on average</b>, mostly in Baguio. Northstar Supply and Benguet Farms are the worst.</Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="Where the answer comes from">
        <When head={['When the question…', 'Nico', 'Example']} rows={[
          ['Is what a report answers', 'Opens that report, with the period and branch set.', '“How much did Baguio collect in September?”'],
          ['Needs a slice the report offers', 'Opens it with Show by, Compare to, or Branch changed.', '“Cebu against last year, this quarter”'],
          ['Needs a slice the report doesn’t offer', <>Builds a pivot from the same measures. See {link('analysis/pivots', 'Pivot tables')}.</>, '“Baguio by collector”'],
          ['Isn’t in any report', <>Says so, and offers an analysis. See {link('analysis/beyond', 'Going beyond the reports')}.</>, '“Who pays later since the rate change?”'],
          ['Needs something the system doesn’t count', <>Says so, and who can add it. See {link('analysis/measures', 'Measures and dimensions')}.</>, '“Which customers are happiest?”'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Look for a report first.', 'Nico searches Reports before he counts anything himself.'],
            ['Open it as it is.', 'The same report, with the period, slicing, and branch set, not rebuilt.'],
            ['The same figures as everyone.', '₱3,420,000 in the chat is ₱3,420,000 on the report, as of the same time.'],
            ['Name the report.', '“From Collections by branch, as of 9:12 AM”, and Open the report.'],
            ['Say when no report answers it.', 'Then offer an analysis, and say what it would count.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Counting from the records first.', 'Nico’s own sum and the report disagree, and nobody knows why.'],
            ['A copy of the report in the chat.', 'It looks the same, but it goes stale and nobody else can open it.'],
            ['A second number for the same thing.', '₱3,395,400 in the chat, ₱3,420,000 in the report: Ramon has to find out which is right.'],
            ['Figures with no report behind them.', 'There’s nothing to open, so nobody can check them.'],
            ['Answering anyway.', 'A confident answer with no report and no analysis behind it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
