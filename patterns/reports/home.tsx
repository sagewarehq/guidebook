import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import './reports.css';

// Home and key numbers: the first page people see is their work for today, then the few numbers that matter to their
// role, each with its comparison and a link to the report behind it. Charts only where they help.

const bars = [62, 70, 58, 74, 81, 88];

export default function Home() {
  return (
    <>
      <Demo wide caption="Ana’s Home, in Collections. First, what needs her today, each a link to the work. Then three numbers for her role, each with what it’s compared to and a link to its report.">
        <Frame on="Home">
          <div className="as-a-page">
            <p className="m-title">Good morning, Ana</p>
            <div className="hm-queue">
              <p className="m-k">Needs you today</p>
              <a className="hm-q"><b>5 promises to pay due today</b><span>₱1,240,000 · Metro Fuels and 4 more</span></a>
              <a className="hm-q"><b>3 invoices went overdue overnight</b><span>INV-1057, INV-1058, INV-1059</span></a>
              <a className="hm-q"><b>Marco flagged 2 payments to check</b><span>Possible duplicates, from Pacific Cartons</span></a>
            </div>
            <div className="hm-kpis">
              <p className="hm-kpi"><small>Collected this month</small><b>₱18.2M</b><span>▲ ₱1.4M on August, same day</span><a className="m-link">Collections this month</a></p>
              <p className="hm-kpi"><small>On time</small><b>87.5%</b><span>Target 90% · ▼ 1.2 points</span><a className="m-link">Collections this month</a></p>
              <p className="hm-kpi"><small>Overdue in Cebu</small><b>₱11.6M</b><span>12 invoices · 6-month trend</span><a className="m-link">Overdue by branch</a><i className="hm-bars">{bars.map((h, i) => <em key={i} style={{ height: `${h}%` }} />)}</i></p>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="When to use a chart">
        <When head={['The question', 'Show', 'Not']} rows={[
          ['How is it moving over time?', 'A line, or small bars by month', 'A pie'],
          ['Which is biggest?', 'Bars, sorted, labelled with the amount', 'A pie with ten slices'],
          ['What’s the exact figure?', 'A table, or one big number', 'A chart people have to read values off'],
          ['Is it on target?', 'The number, the target, and the gap', 'A gauge'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Work first, numbers second.', 'Home opens on what needs this person today, each item a link to the work.'],
            ['A few numbers, for this role.', 'Three or four that Ana acts on. Finance sees different ones.'],
            ['Every number has its comparison.', 'Against last month, the same day last month, or the target, with the direction.'],
            ['Every number opens its report.', 'The card links to the saved report behind it, with the same period.'],
            ['Charts only where they answer the question.', 'A trend as small bars; everything else as a number or a table.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A dashboard of charts as Home.', 'People scan it every morning, and still have to find their work.'],
            ['The same twelve numbers for everyone.', 'Each person ignores the nine that aren’t theirs, then all twelve.'],
            ['A number on its own.', '₱18.2M: good or bad? People can’t tell.'],
            ['Cards that go nowhere.', 'People see a number drop, and can’t find out why.'],
            ['Pies, gauges, and 3D.', 'They look busy and make figures harder to compare.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
