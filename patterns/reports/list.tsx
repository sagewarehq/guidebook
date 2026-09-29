import { Section, Demo, Rules, Avoid, When, Btn } from '../../site/kit';
import { ReportFrame } from './report-kit';
import './reports.css';

// The reports list: every report is shaped for one purpose. Grouped by the team that uses it, each named for its
// question. Opening a report shows its saved versions first; people open the one they need.

const groups: [string, [string, string, string][]][] = [
  ['Finance', [
    ['Profit and loss', 'Is the business making money, and where?', 'By month, branch, or against last year'],
    ['Cash position', 'How much can we release this week?', 'Today, by bank account'],
    ['Receivables aging', 'Who owes us, and for how long?', 'Current, 1–30, 31–60, 61–90, over 90 days'],
  ]],
  ['Collections', [
    ['Collections this month', 'Are we collecting what’s due?', 'Due, collected, and on time, by officer'],
    ['Overdue by branch', 'Where is the overdue money?', 'Amount and count, by branch and customer'],
    ['Promises to pay', 'Who said they’d pay, and did they?', 'Promises due this week, kept and broken'],
  ]],
  ['Branches', [
    ['Loan releases', 'How much did we lend?', 'Count and amount, by product and branch'],
    ['Portfolio by status', 'How healthy is the loan book?', 'Current, overdue, restructured, written off'],
    ['Branch scorecard', 'How is each branch doing this month?', 'Releases, collections, and overdue, side by side'],
  ]],
];

export default function ReportsList() {
  return (
    <>
      <Demo wide caption="Reports, grouped by the team that uses them. Each is named for what it shows, with the question it answers under it, and what it can be sliced by. Reports people saved sit at the top.">
        <ReportFrame>
          <div className="as-a-page">
            <p className="as-crumb"><b>Reports</b></p>
            <p className="m-title">Reports</p>
            <div><p className="m-k">Saved by you</p><p className="rp-saved"><span>Collections this month <em>· Cebu</em></span><span>Profit and loss <em>· Q3, by month</em></span><span>Overdue by branch <em>· over 60 days</em></span></p></div>
            <div className="rp-list">
              {groups.map(([g, items]) => (
                <div key={g} className="rp-grp">
                  <h4>{g}</h4>
                  {items.map(([n, q, by]) => <p key={n} className="rp-item"><b>{n}</b><span>{q}</span><small>{by}</small></p>)}
                </div>
              ))}
            </div>
          </div>
        </ReportFrame>
      </Demo>

      <Demo wide caption="Opening Profit and loss shows its saved reports first: each one a period and a way of slicing it, who made it, who it’s shared with, and when it last ran. People open the one they need; New profit and loss starts from the defaults.">
        <ReportFrame>
          <div className="as-a-page">
            <p className="as-crumb">Reports <span>/</span> <b>Profit and loss</b></p>
            <div className="as-a-head">
              <div><p className="m-title">Profit and loss</p><p className="as-meta"><span>Is the business making money, and where? 4 saved reports</span></p></div>
              <span className="as-acts"><Btn kind="pri">New profit and loss</Btn></span>
            </div>
            <table className="m-tbl rp-savedtbl">
              <thead><tr><th>Saved report</th><th>Period and slicing</th><th>Made by</th><th>Shared with</th><th>Last run</th></tr></thead>
              <tbody>
                <tr><td><a className="m-link">Q3 by month</a></td><td>This quarter · by month</td><td>Ramon</td><td>Finance</td><td>Today, 9:14 AM</td></tr>
                <tr><td><a className="m-link">Year against last year</a></td><td>Year to date · against last year</td><td>Ramon</td><td>Only Ramon</td><td>26 Sep 2026</td></tr>
                <tr><td><a className="m-link">Cebu this quarter</a></td><td>This quarter · Cebu · by month</td><td>Liza</td><td>Cebu branch</td><td>25 Sep 2026</td></tr>
                <tr><td><a className="m-link">Board pack</a></td><td>Last month · by branch</td><td>Ramon</td><td>Leadership, emailed on the 1st</td><td>1 Sep 2026</td></tr>
              </tbody>
            </table>
          </div>
        </ReportFrame>
      </Demo>

      <Section title="What makes a report">
        <When head={['Fixed, by us', 'Chosen, by the reader']} rows={[
          ['The question it answers, and its name', 'The period: from and to'],
          ['Which records it adds up, and how', 'How it’s sliced: by month, quarter, branch, or officer'],
          ['The rows, groups, subtotals, and totals', 'What it’s compared with: the previous period, or last year'],
          ['The basis: accrual or cash, what’s left out', 'Which branch, when their role sees more than one'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One report, one purpose.', 'Each is shaped in System Analysis around a question the business asks, and the records that answer it.'],
            ['Name it for what it shows.', 'Profit and loss, Receivables aging: the business’s own words, with the question under it.'],
            ['Group by who uses it.', 'Finance, Collections, Branches. People find their reports without reading them all.'],
            ['Say what it can be sliced by.', 'A line under each name, so people pick the right report before opening it.'],
            ['Opening a report shows its saved versions.', 'Each with its period and slicing, who made it, and who it’s shared with. New starts from the defaults.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A report builder instead of reports.', 'People are left to design what the business should have shaped for them.'],
            ['Names like RPT-014 or Sales Summary v2.', 'Nobody can tell what they show without opening each one.'],
            ['One long list of every report.', 'Collections officers scroll past Finance reports they can’t use.'],
            ['Reports that look the same from the list.', 'People open three before finding the one they need.'],
            ['Opening straight into a blank report.', 'People set the same period and slicing again every Monday, and miss the one a colleague saved.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
