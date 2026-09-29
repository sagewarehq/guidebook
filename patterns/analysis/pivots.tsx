import { Section, Demo, Pair, Rules, Avoid, When, Btn } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { Window, PivotChips, PivotDrawer, pivotSessions } from './analysis-kit';

// Pivot tables: when a report has the figures but not the cut, Nico builds a pivot from the same measures and
// dimensions. It opens in the Agents window’s detail drawer, its settings drawn as chips people change themselves,
// its totals adding up to the report, and every cell opening the records behind it.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

export default function Pivots() {
  return (
    <>
      <Demo wide caption={<>Ramon asks for September’s drop by collector, which Collections by branch can’t show. Nico builds a pivot from the same measure, Collected, and opens it in the drawer: collectors down the side, months across, Baguio and June to September as filters. Rey Castillo’s route fell ₱325,000 while he was on leave.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <Window sessions={pivotSessions} title="Baguio collections by collector" drawerTitle="Collected, by collector and month" chat={<>
            <Day label="Today" />
            <Me>Split Baguio’s collections by collector, June to September.</Me>
            <Steps items={[[true, <>Values: <b>Collected</b></>], [true, <>Rows: <b>Collector</b> · Columns: <b>Month</b></>], [true, <>Filtered to <b>Baguio</b>, 1 Jun – 30 Sep 2026</>]]} />
            <Msg><span><b>Rey Castillo’s Route 3 fell ₱325,000 from August</b>, the most of any collector; he was on leave 7–18 Sep. The pivot is on the right. Change any setting there.</span></Msg>
          </>} drawer={<PivotDrawer hot={['Rey Castillo', 3]} tip={false} />} />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption={<>Rows opens the five dimensions the system defines, with how many values each has. Picking Customer redraws the pivot at once; Ramon doesn’t have to ask again.</>}>
          <div className="an-solo">
            <PivotChips open="rows" />
          </div>
        </Demo>
        <Demo caption={<>Values opens the four named measures, and nothing else. There’s no field to type a formula into. See {link('analysis/measures', 'Measures and dimensions')}.</>}>
          <div className="an-solo">
            <PivotChips open="values" />
          </div>
        </Demo>
      </Pair>

      <Demo wide caption={<>Clicking Rey Castillo’s September opens Payments, filtered to him, Baguio, and September, as chips people can see and change. 168 payments, ₱655,000.00: the figure they clicked, to the peso. Back to the pivot returns to the drawer as it was.</>}>
        <AgentFrame as="lead" loud on="Payments">
          <div className="as-a-page">
            <p className="as-crumb">Payments <span>/</span> <b>Rey Castillo, Sep 2026</b></p>
            <div className="as-a-head"><div><p className="m-title">Payments</p><p className="as-meta"><span>From Nico’s pivot · Collected, by collector and month</span></p></div><span className="as-acts"><a className="m-link">Back to the pivot</a></span></div>
            <p className="as-filters"><span className="as-chip">Collector: Rey Castillo ×</span><span className="as-chip">Branch: Baguio ×</span><span className="as-chip">Posted: 1–30 Sep 2026 ×</span></p>
            <table className="m-tbl dd-tbl">
              <thead><tr><th>Payment</th><th>Posted</th><th>Loan</th><th>Customer</th><th className="r">Amount</th></tr></thead>
              <tbody>
                <tr><td><a className="m-link">PAY-3418</a></td><td>28 Sep 2026</td><td><a className="m-link">LN-2186</a></td><td>Amihan Foods</td><td className="r">12,400.00</td></tr>
                <tr><td><a className="m-link">PAY-3402</a></td><td>26 Sep 2026</td><td><a className="m-link">LN-2244</a></td><td>La Trinidad Growers</td><td className="r">6,850.00</td></tr>
                <tr><td><a className="m-link">PAY-3371</a></td><td>25 Sep 2026</td><td><a className="m-link">LN-2263</a></td><td>Benguet Farms Co-op</td><td className="r">4,120.00</td></tr>
                <tr className="dd-more"><td colSpan={5}>…and 165 more</td></tr>
              </tbody>
              <tfoot><tr><td colSpan={4}>168 payments</td><td className="r">₱655,000.00</td></tr></tfoot>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>The reply says how the pivot is cut, in the names of measures and dimensions, and opens it in the drawer, where people change it themselves.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Agents">
              <Me>Split Baguio’s collections by collector.</Me>
              <Msg>
                <span>Rey Castillo’s Route 3 fell the most: ₱325,000 from August.</span>
                <div className="ag-card">
                  <div className="ag-card-h"><b>Collected, by collector and month</b><small>Pivot · Baguio · Jun – Sep 2026 · worked out 9:20 AM</small></div>
                  <p className="ag-facts"><span><small>Rows</small>Collector</span><span><small>Columns</small>Month</span><span><small>Values</small>Collected</span></p>
                  <p className="ag-acts"><Btn kind="pri">Open the pivot</Btn></p>
                </div>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>A table typed into the chat. It doesn’t say how it was cut, the rounded rows come to ₱3.43M under a total of ₱3.4M, nothing opens, and every change is another message.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Agents">
              <Me>Split Baguio’s collections by collector.</Me>
              <Msg>
                <table className="an-pv">
                  <tbody>
                    <tr><td>Grace</td><td className="r">₱0.88M</td></tr>
                    <tr><td>Paolo</td><td className="r">₱0.86M</td></tr>
                    <tr><td>Rey</td><td className="r">₱0.66M</td></tr>
                    <tr><td>Counter</td><td className="r">₱1.03M</td></tr>
                  </tbody>
                  <tfoot><tr><td>Total</td><td className="r an-bad">₱3.4M</td></tr></tfoot>
                </table>
                <span>Tell me if you want it another way.</span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="The parts of a pivot">
        <When head={['Part', 'Set to', 'People can choose']} rows={[
          ['Rows', 'Collector', 'Any dimension: Branch, Month, Customer, Collector, Product'],
          ['Columns', 'Month', 'Any other dimension, or None for one total column'],
          ['Values', 'Collected', 'Any named measure: Collected, Overdue balance, On-time rate, Loans released'],
          ['Filters', 'Baguio · Jun – Sep 2026', 'Any dimension’s values, and any period, within what their role sees'],
          ['Cells', 'Pesos, with totals across and down', <>Open any one: it lists the records behind it. See {link('analysis/beyond', 'Going beyond the reports')} for anything a pivot can’t cut.</>],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Build it from measures and dimensions.', 'Values are a named measure; rows and columns are named dimensions.'],
            ['Show the settings as chips.', 'Rows, Columns, Values, and filters sit above the table.'],
            ['People change it themselves.', 'Each chip is a menu; picking Customer redraws it without asking Nico.'],
            ['Totals add up.', 'Across, down, and to the report’s ₱15,860,000 for Baguio.'],
            ['Every cell opens its records.', 'Rey Castillo, September opens his 168 payments, ₱655,000.00.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Grouping by any field there is.', 'A pivot by a raw column nobody defined, which no report agrees with.'],
            ['Settings hidden in the chat.', 'Nobody can tell how the table was cut.'],
            ['Changing it only by asking.', 'Every tweak is another message, and another wait.'],
            ['Rounded rows that don’t add up.', '₱3.43M of rows under a total of ₱3.4M.'],
            ['Cells you can’t open.', 'People rebuild it in a spreadsheet to check one number.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
