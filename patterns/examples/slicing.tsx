import { Section, Demo, Rules, Avoid, Btn } from '../../site/kit';
import { AgentFrame, Day, Me, Msg, Steps } from '../agents/agent-kit';
import { Window, Label, peso, type Session } from '../analysis/analysis-kit';
import { Flow, Saves, alink } from './a-kit';

// Slicing the numbers: Ramon asks Nico for loans released this quarter, then asks for it again by month. Each answer
// is built from the same defined measure, Loans released, sliced by defined dimensions (Branch, Product, Month), and
// both cuts come to the same ₱71,290,000 for the quarter, 1 Jul to 28 Sep 2026.

const sessions: Session[] = [
  ['nico', 'Loans released, Q3', 'Analysis, not saved', true],
  ['marco', 'BDO ••4471, September statement', 'Waiting on you'],
  ['marco', 'Payment run #0318', 'Waiting on you'],
  ['bea', 'Proposal for Abad Trucking', 'Waiting on Liza'],
];

const title = 'Loans released, Q3';
const products = ['Business', 'Salary', 'Vehicle'];

/** Loans released, 1 Jul – 28 Sep 2026, in pesos, by branch and product, with the number of loans per branch. */
const byBranch: [string, number[], number][] = [
  ['Cebu', [18_400_000, 6_240_000, 9_150_000], 269],
  ['Baguio', [11_200_000, 4_380_000, 5_400_000], 183],
  ['Davao', [8_600_000, 3_720_000, 4_200_000], 153],
];

/** The same quarter by month, all branches. September runs to today, 28 Sep. */
const byMonth: [string, number, string][] = [['Jul', 22_480_000, '₱22.48M'], ['Aug', 24_160_000, '₱24.16M'], ['Sep', 24_650_000, '₱24.65M']];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** How the cut is set, in the names of the measure and dimensions, with the one thing this ask changed. */
const Cut = ({ by, changed }: { by: string; changed?: string }) => (
  <p className="exa-changed">{`Loans released · by ${by} · 1 Jul – 28 Sep 2026`}{changed && <> · changed: <b>{changed}</b></>}</p>
);

const Foot = ({ note }: { note: string }) => (
  <p className="exa-foot"><small>{note}</small><Btn>Re-run</Btn><Btn kind="pri">Save as report…</Btn></p>
);

/** Ask 1: branch by product, a table. */
function ByBranch() {
  const cols = products.map((_, i) => sum(byBranch.map(([, v]) => v[i])));
  return (
    <div className="exa-dr">
      <Label at="10:40 AM" />
      <Cut by="Branch and Product" />
      <table className="exa-tbl">
        <thead><tr><th>Branch</th>{products.map(p => <th key={p} className="r">{p}</th>)}<th className="r tot">Total</th></tr></thead>
        <tbody>{byBranch.map(([b, v, n]) => (
          <tr key={b}><td>{b}</td>{v.map((x, i) => <td key={i} className="r"><a className="m-link">{peso(x)}</a></td>)}<td className="r tot">{peso(sum(v))}<small>{`${n} loans`}</small></td></tr>
        ))}</tbody>
        <tfoot><tr><td>All branches</td>{cols.map((x, i) => <td key={i} className="r">{peso(x)}</td>)}<td className="r tot">{peso(sum(cols))}<small>605 loans</small></td></tr></tfoot>
      </table>
      <Foot note="Every figure opens the loans behind it." />
    </div>
  );
}

/** Ask 2: the same total by month, as bars. */
function ByMonth() {
  const top = Math.max(...byMonth.map(([, v]) => v));
  return (
    <div className="exa-dr">
      <Label at="10:42 AM" />
      <Cut by="Month" changed="Branch and Product → Month" />
      <div className="exa-bars">
        {byMonth.map(([m, v, l]) => <a key={m} className={m === 'Sep' ? 'exa-bar on' : 'exa-bar'}><b>{l}</b><em style={{ height: `${Math.round((v / top) * 82)}%` }} /></a>)}
      </div>
      <p className="exa-axis">{byMonth.map(([m]) => <span key={m}>{m === 'Sep' ? 'Sep, to 28th' : m}</span>)}</p>
      <p className="an-foot">{`Together ₱${peso(sum(byMonth.map(([, v]) => v)))}, the same total as by branch.`}</p>
      <Foot note="Each bar opens that month’s loans." />
    </div>
  );
}

export default function Slicing() {
  return (
    <>
      <Demo wide caption={<><b>1. Ask for the cut.</b> Loans released by branch has no product split, so Nico builds the cut from the same measure, sliced by Branch and Product. It opens beside the chat, labelled as an analysis, with totals across and down.</>}>
        <div className="exa-short"><AgentFrame as="lead" loud on="Agents">
            <Window agent="nico" sessions={sessions} title={title} drawerTitle="Loans released, by branch and product" chat={<>
              <Day label="Today" />
              <Me>Loans released by branch and product this quarter.</Me>
              <Steps items={[[true, 'Checked Reports: no product split there'], [true, <>Values: <b>Loans released</b> · Rows: <b>Branch</b> · Columns: <b>Product</b></>]]} />
              <Msg>₱71,290,000 across 605 loans; Cebu is almost half.</Msg>
            </>} drawer={<ByBranch />} />
        </AgentFrame></div>
      </Demo>

      <Demo wide caption={<><b>2. Change one thing.</b> “Now by month, as a bar chart.” Nico keeps the measure and the quarter, swaps the dimension, and says what changed. The bars add up to the same ₱71,290,000. If Ramon wants it every quarter, Save as report… is his to press.</>}>
        <div className="exa-short"><AgentFrame as="lead" loud on="Agents">
            <Window agent="nico" sessions={sessions} title={title} drawerTitle="Loans released, by month" chat={<>
              <Me>Now by month, as a bar chart.</Me>
              <Steps items={[[true, <>Same measure and period · Columns: <b>Month</b></>]]} />
              <Msg>Up every month: ₱24.65M in September, with two days to go.</Msg>
            </>} drawer={<ByMonth />} />
        </AgentFrame></div>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          ['Ramon', 'Asks for the cut in his own words: a measure, how to split it, and a period.', alink('chat/asking', 'Asking an Agent')],
          ['Nico', 'Looks for a report that already answers it, and opens that if there is one.', alink('analysis/from-reports', 'Answering from reports')],
          ['Nico', 'Otherwise builds the cut from a defined measure and dimensions, labelled as an analysis.', <>{alink('analysis/measures', 'Measures and dimensions')}, {alink('analysis/pivots', 'Pivot tables')}</>],
          ['Ramon', 'Asks again to change one thing; each answer keeps the rest.', alink('analysis/beyond', 'Going beyond the reports')],
          ['Ramon', 'Saves the one he’ll want again as a report.', alink('analysis/saving', 'Saving an analysis')],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saves rows={[
          ['Build the cut', 'Export, pivot, and check against the report: 30 minutes', 'One sentence, 30 seconds'],
          ['Cut it again, as a chart', 'Rebuild the pivot and format a chart: 15 minutes', 'One more sentence'],
        ]} total={['About 45 minutes a question', 'About 2 minutes']} />
        <p className="g-see">Ramon still decides what the figures mean, and only he saves a cut as a report others will rely on.</p>
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Build every cut from what the system defines.', 'Loans released, by Branch, Product, or Month; no formulas typed in.'],
            ['Change one thing per ask, and keep the totals.', '“By month” keeps the measure and the quarter: ₱71,290,000 both ways.'],
            ['A person saves it.', 'Save as report… turns the cut Ramon wants again into a report.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Slicing by a field nobody defined.', '“By loan officer” from a free-text column no report agrees with.'],
            ['Starting over on every ask.', 'The follow-up quietly drops the quarter, and the totals jump.'],
            ['The Agent saving reports itself.', 'The Reports list fills with cuts nobody asked to keep.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
