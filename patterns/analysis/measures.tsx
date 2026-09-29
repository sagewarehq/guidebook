import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { ReportStub, measures, dimensions, peso } from './analysis-kit';

// Measures and dimensions: the governed layer under reports and Agents. The system names what can be counted
// (measures) and how it can be sliced (dimensions), each with a plain definition on a page people can open. Nico
// combines only these, never invents a metric or writes a query, and counts only what the asker’s role can see.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

// Where each measure is used, for the reference page.
const usedIn: Record<string, string> = {
  Collected: 'Collections by branch, Collections this month',
  'Overdue balance': 'Overdue by branch, Receivables aging',
  'On-time rate': 'Collections this month, Branch scorecard',
  'Loans released': 'Loan releases, Branch scorecard',
};

// Baguio’s on-time rate by collector, September: installments due, and paid within 3 days of their due date.
const onTime: [string, number, number][] = [
  ['Grace Soriano', 412, 339], ['Paolo Dizon', 398, 322], ['Rey Castillo', 376, 241], ['Branch counter', 290, 262],
];
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(1)}%`;
const due = onTime.reduce((a, [, d]) => a + d, 0);
const paid = onTime.reduce((a, [, , p]) => a + p, 0);

function OnTimeTable() {
  return (
    <table className="an-pv">
      <thead><tr><th>Collector</th><th className="r">Due</th><th className="r">On time</th><th className="r tot">On-time rate</th></tr></thead>
      <tbody>{onTime.map(([n, d, p]) => <tr key={n}><td>{n}</td><td className="r">{peso(d)}</td><td className="r"><a className="rp-drill">{peso(p)}</a></td><td className="r tot">{pct(p, d)}</td></tr>)}</tbody>
      <tfoot><tr><td>Baguio</td><td className="r">{peso(due)}</td><td className="r">{peso(paid)}</td><td className="r tot">{pct(paid, due)}</td></tr></tfoot>
    </table>
  );
}

export default function Measures() {
  return (
    <>
      <Demo wide caption={<>Reports › Measures and dimensions: everything reports and Agents may count, each with one plain line saying what it counts and who defined it, and the ways it can be sliced. On-time rate’s grace period is set by Ramon in Settings; the rest come with Loans OS.</>}>
        <AgentFrame as="lead" on="Reports" loud>
          <div className="as-a-page an-ref">
            <p className="as-crumb">Reports <span>/</span> <b>Measures and dimensions</b></p>
            <div className="as-a-head"><div><p className="m-title">Measures and dimensions</p><p className="as-meta"><span>What reports and Agents may count, and how they may slice it · 4 measures · 5 dimensions</span></p></div></div>
            <div className="an-set">
              <table className="m-tbl">
                <thead><tr><th>Measure</th><th>What it counts</th><th>Defined by</th><th>Used in</th></tr></thead>
                <tbody>{measures.map(([n, d, by, u]) => (
                  <tr key={n}><td>{n}<small>{u}</small></td><td><small>{d}</small></td><td><small>{by}</small></td><td><small>{usedIn[n]}</small></td></tr>
                ))}</tbody>
              </table>
              <div className="an-dims">
                <p className="m-k">Slice by</p>
                {dimensions.map(([n, d]) => <p key={n}><b>{n}</b><small>{d}</small></p>)}
              </div>
            </div>
            <p className="an-by">Any measure can be sliced by any dimension. Each person, and each Agent working for them, sees only the branches their role allows.</p>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<>Ramon asks for something no report shows by collector. Nico says which measure, slice, and filter he used, in the words of the reference page, and the measure’s name links to its definition. The rows add up to Baguio’s 78.9%.</>}>
        <div className="an-mid">
          <AgentFrame as="lead" on="Reports" loud overlay={
            <ChatPanel agent="nico" status="Answering a question on Baguio" onPage="Reports · Collections by branch">
              <Day label="Today" />
              <Me>What was Baguio’s on-time rate by collector in September?</Me>
              <Steps items={[[true, <>Measure: <b>On-time rate</b></>], [true, <>Sliced by: <b>Collector</b></>], [true, <>Filtered to: <b>Baguio</b>, 1–30 Sep 2026</>]]} />
              <Msg>
                <span><b>Baguio’s on-time rate was {pct(paid, due)} in September.</b> Rey Castillo’s route was lowest while he was on leave.</span>
                <OnTimeTable />
                <span className="an-src"><a className="m-link">On-time rate</a>: installments paid by their due date, plus 3 days’ grace, out of all due.</span>
              </Msg>
            </ChatPanel>}>
            <ReportStub />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>Ana, in Collections at the Cebu branch, asks the same kind of question across branches. Nico works with her access, not his owner’s, so he counts Cebu and says why Baguio is left out.</>}>
        <div className="an-short">
          <AgentFrame as="staff" on="Reports" loud overlay={
            <ChatPanel agent="nico" status="Answering a question on Cebu" onPage="Reports">
              <Day label="Today" />
              <Me ini="AR">Compare Cebu and Baguio collections in September.</Me>
              <Steps items={[[true, <>Measure: <b>Collected</b>, by <b>Branch</b>, Aug and Sep 2026</>], ['flag', 'Your role sees Cebu branch only']]} />
              <Msg><span><b>Cebu collected ₱6,040,000 in September, ₱130,000 more than August.</b> I can’t show Baguio: your role covers Cebu only. Ramon Cruz sees every branch.</span></Msg>
            </ChatPanel>}>
            <ReportStub only="Cebu" />
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>A named measure, with its definition one click away. Next month’s 78.9% means the same thing, and the report counts it the same way.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Reports · Collections by branch">
              <Me>How healthy are Baguio’s collections?</Me>
              <Msg>
                <span>“Healthy” isn’t a measure. The nearest two for September:</span>
                <p className="ag-facts"><span><small>On-time rate</small>{pct(paid, due)}</span><span><small>Collected</small>₱3,420,000</span></p>
                <span className="an-src">Both as defined in <a className="m-link">Measures and dimensions</a>.</span>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Nico made up a “collection health score”, weighted it himself, and shows the query. Nobody in Finance can check it, and next week he may weigh it differently.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Ready" onPage="Reports · Collections by branch">
              <Me>How healthy are Baguio’s collections?</Me>
              <Msg>
                <p className="an-score"><b className="an-bad">72</b><span>Collection health score, out of 100</span></p>
                <pre className="an-code">{'SELECT 0.6 * on_time + 0.4 *\n  (1 - overdue / book) ...\nFROM payments p JOIN loans l ...'}</pre>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="What Nico may use">
        <When head={['', 'He may', 'He may not']} rows={[
          ['Measures', 'Use the four named ones, as defined.', 'Make up a score, a weighting, or a new formula.'],
          ['Dimensions', 'Slice by any of the five, in any combination.', 'Group by a field read straight from a table.'],
          ['Filters', 'Filter by any dimension’s values, and any period.', 'Leave out records to make a figure look better.'],
          ['Records', 'Count what the person asking may see.', 'Use his owner’s access, or all branches.'],
          ['New measures', <>Say what’s missing, and who can add it. See {link('analysis/from-reports', 'Answering from reports')}.</>, 'Define one himself, in the chat.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Named measures only.', 'Collected, Overdue balance, On-time rate, Loans released: the system defines them.'],
            ['A plain definition for each.', 'One line on Measures and dimensions, linked wherever the measure appears.'],
            ['Slice by named dimensions.', 'Branch, Month, Customer, Collector, Product, in any combination.'],
            ['The asker’s access applies.', 'Ana’s Nico counts Cebu only, and says why Baguio is missing.'],
            ['People add measures.', 'In Settings, or with us as a change to the system; never in the chat.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Metrics made up in the chat.', 'A “health score” nobody defined, weighted differently each time.'],
            ['Measures with no definition.', 'Finance and Collections read “collected” two ways.'],
            ['Queries against raw tables.', 'SQL in a chat bubble that nobody in Finance can check.'],
            ['Counting with the Agent’s access.', 'Ana sees Baguio’s figures through Nico, which her role hides.'],
            ['Agents defining measures.', 'A new figure turns up in a report without anyone deciding it.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
