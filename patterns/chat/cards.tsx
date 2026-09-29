import { Section, Demo, Pair, Rules, Avoid, When, Btn, Sk } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps } from '../agents/agent-kit';
import './chat.css';

// Tables and charts in chat: when an answer has figures, the Agent draws them with the app’s own table and bars,
// every figure a link, the rows adding up to the total. Nico answers a question about Baguio’s collections.

// Baguio collections by month, Jun to Sep 2026. September is ₱760,000 below August, and the table splits that drop.
const months: [string, number, string][] = [['Jun', 4_050_000, '₱4.05M'], ['Jul', 4_210_000, '₱4.21M'], ['Aug', 4_180_000, '₱4.18M'], ['Sep', 3_420_000, '₱3.42M']];
const top = 4_210_000;
const drop: [string, string, string][] = [
  ['Restructured loans, first payment moved to October', '6 loans', '₱310,000'],
  ['Route 3 not covered, 7–18 Sep, collector on leave', '41 accounts', '₱285,000'],
  ['Now more than 30 days late', '9 accounts', '₱165,000'],
];

/** The chart and table Nico posts: the app’s bars and table, each figure a link. */
function CollectionsCard() {
  return (
    <div className="ct-card">
      <p className="ct-card-h"><b>Baguio collections, Jun–Sep 2026</b><small>From Reports · Collections by branch</small></p>
      <div className="ct-card-b">
        <div className="ct-bars">
          {months.map(([m, v, l]) => <a key={m} className={m === 'Sep' ? 'ct-bar on' : 'ct-bar'}><b>{l}</b><em style={{ height: `${Math.round((v / top) * 78)}%` }} /></a>)}
        </div>
        <p className="ct-axis">{months.map(([m]) => <span key={m}>{m}</span>)}</p>
        <table className="m-tbl ct-tbl">
          <thead><tr><th>Where Aug → Sep’s drop came from</th><th className="r">Accounts</th><th className="r">₱</th></tr></thead>
          <tbody>{drop.map(([w, n, a]) => <tr key={w}><td>{w}</td><td className="r"><a className="m-link">{n}</a></td><td className="r"><a className="m-link">{a}</a></td></tr>)}</tbody>
          <tfoot><tr><td>Down from August</td><td className="r">56</td><td className="r"><a className="m-link">₱760,000</a></td></tr></tfoot>
        </table>
      </div>
      <p className="ct-card-f"><Btn>Open the report</Btn><span className="ag-none">Each figure opens the loans or payments behind it.</span></p>
    </div>
  );
}

export default function Cards() {
  return (
    <>
      <Demo wide caption={<>Ramon asks Nico why Baguio’s collections dropped. The answer is the app’s own bars and table: four months of collections, then the ₱760,000 drop split into three causes that add up to it. Every figure is a link, and the reply ends on what Ramon decides.</>}>
        <div className="ct-mid">
          <AgentFrame as="lead" on="Reports" loud overlay={
            <ChatPanel agent="nico" status="Answering a question on Baguio" onPage="Reports · Collections by branch">
              <Day label="Today" />
              <Me>Why did collections drop in Baguio in September?</Me>
              <Steps items={[[true, 'Pulled Baguio collections, Jun–Sep'], [true, 'Compared September’s payments with August’s, account by account'], [true, 'Grouped the difference by cause']]} />
              <Msg>
                <span><b>Baguio collected ₱3,420,000 in September, ₱760,000 (18.2%) less than August.</b> Three things explain all of it.</span>
                <CollectionsCard />
                <span className="ct-next">Route 3 is covered again since 21 Sep, and the restructured loans pay from October. <b>The 9 late accounts are your call: a field visit, or a final notice.</b></span>
              </Msg>
            </ChatPanel>}>
            <div className="ct-under">
              <p className="as-crumb">Reports <span>/</span> <b>Collections by branch</b></p>
              <div className="as-a-head"><div><p className="m-title">Collections by branch</p><p className="as-meta"><span>1 Jul – 30 Sep 2026 · by month</span></p></div></div>
              <Sk w="92%" /><Sk w="84%" /><Sk w="88%" /><Sk w="70%" /><Sk w="80%" /><Sk w="64%" />
            </div>
          </AgentFrame>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>The figures as a table and bars, drawn with the same parts as Reports. The three causes add up to the ₱760,000, and each one opens the loans or accounts behind it.</>}>
          <CollectionsCard />
        </Demo>
        <Demo verdict="avoid" caption={<>The same answer as a paragraph. “About”, “roughly”, and “some” don’t add up to anything, and there’s nothing to click to check.</>}>
          <div className="ct-box">
            <ChatPanel agent="nico" status="Ready" onPage="Reports · Collections by branch">
              <Me>Why did collections drop in Baguio in September?</Me>
              <Msg>
                <div className="ct-wall">
                  <p>Collections in Baguio fell by about 18% in September compared with August. This was mainly because a number of loans were restructured, which moved roughly ₱300k of payments into October.</p>
                  <p>There were also around 40 accounts on one of the field routes that weren’t visited for part of the month, and some borrowers have fallen further behind. Overall the drop was somewhere around three quarters of a million pesos.</p>
                </div>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Bars with the amount on each, like the bars on Home and in Reports. People read it the way they already read the app.</>}>
          <div className="ct-card">
            <p className="ct-card-h"><b>Baguio collections, Jun–Sep 2026</b></p>
            <div className="ct-card-b">
              <div className="ct-bars">
                {months.map(([m, v, l]) => <a key={m} className={m === 'Sep' ? 'ct-bar on' : 'ct-bar'}><b>{l}</b><em style={{ height: `${Math.round((v / top) * 78)}%` }} /></a>)}
              </div>
              <p className="ct-axis">{months.map(([m]) => <span key={m}>{m}</span>)}</p>
            </div>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>A chart made up for the chat: a ring with a score nobody defined, colours that mean nothing elsewhere in the app, and red used for decoration.</>}>
          <div className="ct-card">
            <p className="ct-card-h"><b>AI insights: Baguio</b></p>
            <div className="ct-card-b">
              <div className="ct-donut"><span><b>72</b>Health score</span></div>
              <p className="ct-legend"><span><i className="a" />Restructuring</span><span><i className="b" />Coverage</span><span><i className="c" />Delinquency</span></p>
            </div>
          </div>
        </Demo>
      </Pair>

      <Section title="A sentence, a table, a chart, or the report">
        <When head={['The answer is…', 'Show it as', 'Example']} rows={[
          ['One figure', 'A sentence with the figure in bold, linked.', '“Baguio collected ₱3,420,000 in September.”'],
          ['A few figures to compare or add up', 'A small table, with its total.', 'The three causes of the ₱760,000 drop'],
          ['A change over time', 'Bars by month, each labelled with its amount.', 'Baguio, June to September'],
          ['More than about 8 rows, or anything to slice', 'A line or two, and a link to the report.', '“Open Collections by branch”. See Open the real screen.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Figures go in a table.', 'A few rows and a total, under the one-line answer.'],
            ['Make them add up.', 'The rows sum to the total, and the total matches the report.'],
            ['Link every figure.', '“6 loans” opens those six loans; a bar opens that month.'],
            ['Use the app’s own parts.', 'The same table, bars, and links as Reports, so people read it the same way.'],
            ['Say what changed, why, and who decides.', 'One line before the table, one after it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Figures in a paragraph.', 'People copy them into a spreadsheet to compare them.'],
            ['“About” and “roughly”.', 'The parts don’t add up to the total, and nobody trusts either.'],
            ['Figures you can’t open.', 'People rebuild the report by hand to check one number.'],
            ['A chart invented for the chat.', 'A score and colours that mean nothing anywhere else in the app.'],
            ['A table with no conclusion.', 'Ramon has the numbers, but not the question he’s meant to answer.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
