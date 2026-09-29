import { Section, Demo, Pair, Rules, Avoid, When, Btn } from '../../site/kit';
import { AgentFrame, ChatPanel, Day, Me, Msg, Steps, Ask } from '../agents/agent-kit';
import { Window, Label, type Session } from './analysis-kit';

// Going beyond the reports: when no report or pivot answers it, Nico works it out as an analysis. It reads, never
// writes; it carries a label saying it isn’t a saved report and as of when; it says how it was worked out in plain
// steps; Re-run repeats it on today’s data; every figure opens its records; and it stays small enough to check.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;

const sessions: Session[] = [
  ['nico', 'Customers paying later since July', 'Analysis, not saved', true],
  ['nico', 'Baguio collections by collector', 'Analysis, not saved'],
  ['nico', 'Baguio collections in September', 'Answered'],
  ['marco', 'Payment run #0318', 'Waiting on you'],
];

// On-time rate over 13 weekly installments, before and after the 1 Jul repricing: the 5 steepest falls of 38.
const later: [string, string, number, number][] = [
  ['Benguet Farms Co-op', 'Baguio', 13, 7],
  ['Northstar Supply', 'Cebu', 12, 8],
  ['La Trinidad Growers', 'Baguio', 13, 9],
  ['Sagada Coffee Traders', 'Baguio', 11, 8],
  ['Pacific Cartons', 'Cebu', 12, 9],
];
const rate = (n: number) => Math.round((n / 13) * 100);

/** The analysis in the drawer: its label, three numbers, the table, how it was worked out, and what people can do. */
function Analysis() {
  return (
    <>
      <Label at="10:05 AM" />
      <p className="ag-facts"><span><small>Repriced customers</small>214</span><span><small>Fell 20 points or more</small>38</span><span><small>Their on-time rate</small>88.2% → 79.5%</span></p>
      <table className="an-pv">
        <thead><tr><th>Customer</th><th>Branch</th><th className="r">Apr–Jun</th><th className="r">Jul–Sep</th><th className="r tot">Change</th></tr></thead>
        <tbody>
          {later.map(([c, b, before, after]) => (
            <tr key={c}><td><a className="m-link">{c}</a></td><td>{b}</td><td className="r"><a className="rp-drill">{`${rate(before)}%`}</a></td><td className="r"><a className="rp-drill">{`${rate(after)}%`}</a></td><td className="r tot">{`−${rate(before) - rate(after)} pts`}</td></tr>
          ))}
          <tr className="dd-more"><td colSpan={5}><a className="m-link">Open all 38 customers</a></td></tr>
        </tbody>
      </table>
      <div>
        <p className="an-k">How this was worked out</p>
        <ol className="an-how">
          <li>Measure: <b>On-time rate</b>, by <b>Customer</b>, all branches.</li>
          <li>Customers with a loan repriced on 1 Jul 2026: <b>214</b>.</li>
          <li>Compared <b>1 Apr – 30 Jun</b> with <b>1 Jul – 28 Sep 2026</b>.</li>
          <li>Kept those whose rate fell 20 points or more: <b>38</b>.</li>
        </ol>
      </div>
      <p className="an-lim">Read-only · 9,842 installments read in 14 s</p>
      <p className="an-acts"><Btn>Re-run</Btn><Btn kind="pri">Save as report…</Btn></p>
    </>
  );
}

export default function Beyond() {
  return (
    <>
      <Demo wide caption={<>No report compares customers before and after the rate change, so Ramon asked Nico to run an analysis. It opens in the drawer, labelled as Nico’s and not a saved report, with the time and the data it used. The steps under it say exactly what was counted; Re-run works it out again the same way.</>}>
        <AgentFrame as="lead" loud on="Agents">
          <Window sessions={sessions} title="Customers paying later since July" drawerTitle="Customers paying later since 1 Jul" chat={<>
            <Day label="Today" />
            <Me>Which customers are paying later since the rate change?</Me>
            <Ask question="No report answers this. I can work it out as an analysis." options={['Run the analysis', 'Open Overdue by branch']} picked="Run the analysis" />
            <Steps items={[[true, 'Found 214 customers repriced on 1 Jul'], [true, 'Compared their on-time rate, Apr–Jun and Jul–Sep'], [true, 'Kept the 38 that fell 20 points or more']]} />
            <Msg><span><b>38 of the 214 repriced customers are paying later</b>; the rest of the book barely moved, 87.9% to 87.1%. Whether to review their terms is your call.</span></Msg>
          </>} drawer={<Analysis />} />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>An analysis with its label, the steps behind it, and figures that open their installments. Next week, Re-run gives the same kind of answer on newer data.</>}>
          <div className="an-solo"><Analysis /></div>
        </Demo>
        <Demo verdict="avoid" caption={<>A confident paragraph. Nothing says it was worked out on the spot, “23% later” and “₱1.2M a month” trace to nothing, and asking again gives different numbers.</>}>
          <div className="an-box tall">
            <ChatPanel agent="nico" status="Ready" onPage="Agents">
              <Me>Which customers are paying later since the rate change?</Me>
              <Msg>
                <div className="an-wall">
                  <p>Customers on the new rates are paying <b className="an-bad">23% later</b> than before, mostly in Baguio, which is costing about <b className="an-bad">₱1.2M a month</b> in late payments.</p>
                  <p>Benguet Farms is the worst offender. I’d recommend tightening terms for this segment.</p>
                </div>
              </Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption={<>Too big for an analysis, and Nico says so before starting. He offers a smaller cut that fits, or the Payments export, which runs as a background job.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Waiting on you" onPage="Agents">
              <Me>Show every payment since 2019, by customer and by day.</Me>
              <Steps items={[['flag', 'That’s 1.8 million payments: over the 50,000-row limit for an analysis']]} />
              <Ask question="I can do it by customer and month for 2026 so far (43,308 rows), or you can export the payments." options={['By month, 2026', 'Export Payments']} />
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Nico started anyway. Forty minutes in, it’s still reading, the app is slow for everyone, and nobody said how much it would use.</>}>
          <div className="an-box">
            <ChatPanel agent="nico" status="Working · 41 min" onPage="Agents">
              <Me>Show every payment since 2019, by customer and by day.</Me>
              <Steps items={[[true, 'Reading every payment since Jan 2019'], [false, <span className="an-bad">1,240,000 of 1,800,000 read · 41 min so far</span>]]} />
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="What an analysis may do">
        <When head={['', 'An analysis', 'Past it']} rows={[
          ['Reads', 'Named measures and dimensions, as the person asking may see them.', <>Anything else. See {link('analysis/measures', 'Measures and dimensions')}.</>],
          ['Writes', 'Nothing. To act on it, people start from the list: Open all 38 customers.', 'Letters, calls, and changed terms go through their own screens.'],
          ['Size', 'Up to 50,000 rows.', 'A smaller cut, or an export as a background job.'],
          ['Time', 'Up to 60 seconds.', 'Nico stops, says how far he got, and offers a smaller cut.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Label it as an analysis.', '“Analysis by Nico — not a saved report”, when it was worked out, and the data as of.'],
            ['Say how it was worked out.', 'The measures, filters, and periods, in plain numbered steps.'],
            ['Make it repeatable.', 'Re-run works it out again the same way, on today’s data.'],
            ['Read-only, and linked.', 'It changes nothing, and every figure opens its records.'],
            ['Keep it a size people can check.', 'Up to 50,000 rows and a minute; past that, a smaller cut or an export.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['An analysis that looks like a report.', 'People quote it as if Finance had signed it off.'],
            ['A confident paragraph.', '“About ₱1.2M a month” that nobody can trace or check.'],
            ['One-off answers.', 'Asked again next week, it gives a different number, and nobody knows why.'],
            ['Acting on it straight away.', 'Nico sends 38 letters on a figure nobody has looked at.'],
            ['Running anything, however big.', '41 minutes on 1.8 million payments, and the app slows for everyone.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
