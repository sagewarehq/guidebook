import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import { AgentFrame, AgentHead, Source } from '../agents/agent-kit';
import { Params } from '../reports/report-kit';
import './teaching.css';

// Agent report: whether an Agent is helping, in figures a business owner can check. Time saved against a timed
// before, holds and how many were right, corrections and what they became, and the AI usage it cost. Each figure opens
// the runs behind it, and six months show the direction. Marco, September 2026 to date.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

// Six months, Sep to 28 Sep: [label, values, how to write each value]
const trend: [string, number[], (v: number) => string][] = [
  ['Hours saved', [12, 20, 26, 31, 34, 36], v => `${v}`],
  ['Holds right', [58, 67, 75, 80, 83, 86], v => `${v}%`],
  ['Corrections', [6, 4, 3, 2, 2, 2], v => `${v}`],
  ['AI usage', [7200, 9100, 10800, 12600, 14100, 18480], v => `₱${v.toLocaleString('en-US')}`],
];

// September’s decided holds: invoice, supplier, run, why Marco held it, right, what happened.
const holds: [string, string, string, string, boolean, string][] = [
  ['INV-6604', 'Danao Lumber', '#0276 · 7 Sep', 'No PO found', true, 'PO raised late; paid in #0290'],
  ['INV-3310', 'Mactan Steel Supply', '#0276 · 7 Sep', 'Looks like a resend of INV-3302', false, 'A second delivery, same amount'],
  ['INV-7731', 'Island Grains', '#0276 · 7 Sep', 'Goods not received', true, 'Delivered 9 Sep; paid in #0290'],
  ['INV-5120', 'Bohol Diesel Depot', '#0290 · 14 Sep', '₱38,000 over PO', false, 'Price agreed by email; now a skill'],
  ['INV-2240', 'Luzon Packaging', '#0304 · 21 Sep', '₱18,400 over PO', true, 'Supplier credited ₱18,400'],
  ['INV-1192', 'Negros Sugar Co.', '#0304 · 21 Sep', 'Bank details changed since the last payment', true, 'Confirmed by phone, then paid'],
];

export default function Performance() {
  return (
    <>
      <Demo wide caption={<>Marco’s report, opened from ••• on his page: Agents / Marco / Report. It’s shaped ahead of time, like every report: Ramon changes only the period, the slicing, and the comparison. Three key numbers, each opening its runs. Time saved counts only tasks timed before Marco started; the rest are listed, not counted. Every correction says what skill it became.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-page">
            <AgentHead id="marco" view="Report" acts={<Btn>Export</Btn>} />
            <Params period="1 – 28 Sep 2026" by="Task" compare="August 2026" />
            <div className="hm-kpis tc-kpis">
              <p className="hm-kpi"><small>Time saved</small><b>36 hours</b><span>Of Finance time · ▲ 2 on August</span><a className="m-link">Open 10 timed runs</a></p>
              <p className="hm-kpi"><small>Holds that were right</small><b>12 of 14</b><span>86% · 3 more waiting on you</span><a className="m-link">Open 14 holds</a></p>
              <p className="hm-kpi"><small>AI usage</small><b>₱18,480</b><span>At cost · 1,720 tasks · ₱513 an hour saved</span><a className="m-link">Open 62 runs by cost</a></p>
            </div>
            <div className="tc-two">
              <div>
                <p className="m-k">Time saved, by task</p>
                <table className="m-tbl tc-tbl">
                  <thead><tr><th>Task</th><th className="r">Runs</th><th>Before</th><th>Now</th><th className="r">Saved</th></tr></thead>
                  <tbody>
                    <tr><td><a className="m-link">Matching invoices for the payment run</a></td><td className="r">3</td><td>1 day</td><td>10 minutes</td><td className="r">24 hours</td></tr>
                    <tr><td><a className="m-link">Drafting payment reminders</a></td><td className="r">7</td><td>2 hours</td><td>15 minutes</td><td className="r">12 hours</td></tr>
                    <tr className="tc-off"><td>Other tasks<small>Remittance emails, delivery receipts</small></td><td className="r">50</td><td>Not timed</td><td>—</td><td className="r">Not counted</td></tr>
                    <tr className="tc-off"><td>Waiting on you<small>Runs #0318 and #0319, counted once approved</small></td><td className="r">2</td><td /><td /><td className="r">—</td></tr>
                  </tbody>
                  <tfoot><tr><td>This month</td><td className="r">62</td><td /><td /><td className="r">36 hours</td></tr></tfoot>
                </table>
                <p className="rp-foot">Before: timed in System Analysis, April 2026. Now: time from Marco posting the run to Ramon approving it.</p>
              </div>
              <div>
                <p className="m-k">Corrections, and what they became</p>
                <div className="tc-vers">
                  <div className="tc-ver"><p><b>Bohol Diesel price rises</b><small>14 Sep</small></p><span>Learned a skill: Paying Bohol Diesel Depot’s agreed price rises</span><small><Source>Run #0290</Source></small></div>
                  <div className="tc-ver"><p><b>No reminder when a promise to pay is due</b><small>22 Sep</small></p><span>Learned a skill: Skipping customers with a promise to pay</span><small><Source>Run #0308</Source></small></div>
                </div>
              </div>
            </div>
          </div>
        </AgentFrame>
      </Demo>

      <Demo wide caption="Further down the same report: six months, one small chart per question, September to date in green. More time saved, more holds right, fewer corrections, and a cost that rose in September with the extra invoices he matched.">
        <Win title="Marco · Report · April to September 2026">
          <div className="tc-trend">
            {trend.map(([label, vals, fmt]) => {
              const max = Math.max(...vals);
              return (
                <div key={label} className="tc-mini">
                  <small>{label}</small>
                  <div className="tc-bars">{vals.map((v, i) => <span key={i}><b>{fmt(v)}</b><em style={{ height: `${(v / max) * 72}%` }} /></span>)}</div>
                  <p className="tc-mos">{months.map(m => <span key={m}>{m}</span>)}</p>
                </div>
              );
            })}
          </div>
        </Win>
      </Demo>

      <Demo wide caption={<>Open 14 holds opens the holds themselves, each with why Marco held it and what the person found. The 2 that weren’t needed are listed with the rest, and one became a correction. See {link('explaining/holds', 'Showing the work › Holds and flags')}.</>}>
        <AgentFrame on="Agents" as="lead">
          <div className="as-a-page">
            <AgentHead id="marco" view="Report" crumb={['Holds, September']} meta={<span>14 decided: 12 right, 2 not needed · 3 waiting on you, in run #0318</span>} acts={<Btn>Export</Btn>} />
            <table className="m-tbl tc-tbl">
              <thead><tr><th>Invoice</th><th>Supplier</th><th>Run</th><th>Why Marco held it</th><th>Decided by</th><th>Result</th></tr></thead>
              <tbody>{holds.map(([inv, s, run, why, ok, then]) => (
                <tr key={inv}><td><a className="m-link">{inv}</a></td><td>{s}</td><td>{run}</td><td>{why}</td><td>Ramon Cruz</td><td><Pill tone={ok ? 'ok' : undefined}>{ok ? 'Right' : 'Not needed'}</Pill><small>{then}</small></td></tr>
              ))}</tbody>
              <tfoot><tr><td>6 of 14</td><td /><td /><td /><td /><td><a className="m-link">Show all 14</a></td></tr></tfoot>
            </table>
          </div>
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="Time saved against a real before, for one task, with the runs behind it. Ramon can check every part of it.">
          <Win title="Time saved">
            <div className="tc-ba">
              <small>Matching invoices for the payment run</small>
              <b>1 day → 10 minutes</b>
              <span>Timed in System Analysis, April 2026. 3 runs this month: about 24 hours of Finance time.</span>
              <a className="m-link">Open 3 runs</a>
            </div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Big numbers with nothing behind them. None says whether Finance’s week got shorter, and none opens anything.">
          <Win title="Marco · Impact">
            <div className="tc-vanity">
              <p><b>10,000+</b><small>tasks automated</small></p>
              <p><b>1.2M</b><small>words processed</small></p>
              <p><b>99.9%</b><small>uptime</small></p>
              <p><b>₱2.4M</b><small>estimated savings</small></p>
            </div>
          </Win>
        </Demo>
      </Pair>

      <Section title="Which number answers which question">
        <When head={['The question', 'Show', 'Not']} rows={[
          ['Is it saving time?', 'Hours saved on timed tasks: before → now, times the runs.', 'Tasks automated'],
          ['Is it right?', 'Holds a person agreed with, and the ones they didn’t.', 'A confidence score'],
          ['Is it learning?', 'Corrections this month, each with the skill it became.', 'Nothing, or only the good weeks'],
          ['Is it worth it?', 'AI usage at cost, and per hour saved.', 'Words or tokens processed'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Count time saved against a real before.', 'Timed in System Analysis: 1 day → 10 minutes, times the runs.'],
            ['Show whether it was right.', 'Holds a person agreed with, and the ones that weren’t needed.'],
            ['Show what it learned.', 'Each correction this month, and the skill it became.'],
            ['Put the cost beside the saving.', 'AI usage at cost, and what it comes to per hour saved.'],
            ['Let every figure open its runs.', 'And show six months, so the direction is plain.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Vanity counts.', '“10,000 tasks automated” says nothing about Finance’s week.'],
            ['Only the wins.', 'Nobody sees the holds that cost Ramon time for nothing.'],
            ['Corrections left out.', 'Nobody can tell whether the same mistake keeps coming back.'],
            ['Savings without the cost.', 'The AI usage is a surprise on the monthly invoice.'],
            ['Figures nobody can check.', 'People stop trusting the report the first time one won’t open.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
