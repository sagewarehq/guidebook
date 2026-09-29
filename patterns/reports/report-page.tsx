import { Section, Demo, Rules, Avoid, When } from '../../site/kit';
import { ReportPage, ReportFrame } from './report-kit';
import './reports.css';

// The report page: a shaped report adds up many records into one fixed layout. Its parts: the name and question,
// what it covers, the parameters people can change, the statement itself, and when it was run.

export default function ReportPageDoc() {
  return (
    <>
      <Demo wide caption="Profit and loss for Metro Lending, Q3 2026. The shape is fixed: income, provisions, expenses, net income. The reader chooses the period, how to slice it, what to compare with, and which branch. Figures are illustrative.">
        <ReportFrame><ReportPage /></ReportFrame>
      </Demo>

      <Section title="The parts">
        <When head={['Part', 'What goes there']} rows={[
          ['Name and question', 'Profit and loss, and under it the question it answers and its basis: accrual, voided invoices left out.'],
          ['Actions', 'Save report as the primary, Export beside it, and Print under •••.'],
          ['Parameters', 'The parts people can change, in one bar above the report: period, show by, compare to, branch.'],
          ['The statement', 'The fixed rows, grouped, with subtotals and a total column. Every figure opens its records.'],
          ['What it covers', 'Under the report: whose figures, in what unit, and as of when.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The shape is fixed.', 'Rows, groups, and totals are designed once, for the question. People change the period, not the layout.'],
            ['Parameters in one bar, above the report.', 'Everything people can change sits together, so they can see exactly what they’re looking at.'],
            ['Say the basis.', 'Accrual or cash, what’s left out, and the unit, on the page. Two people should read the same number the same way.'],
            ['Say when it was run.', '“As of 28 Sep 2026, 9:14 AM”, so nobody mistakes an old report for today’s.'],
            ['It opens with sensible defaults.', 'This quarter, by month, all the branches this person can see. Ready before anyone touches a thing.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Rows and columns people can drag around.', 'Every copy of the report ends up different, and none can be compared.'],
            ['Filters scattered across the page.', 'People miss one, and read the wrong numbers.'],
            ['Figures with no basis.', 'Finance and Collections argue over two numbers that were never the same thing.'],
            ['A report with no time.', 'An export from last week gets read as today’s.'],
            ['A blank report that waits for choices.', 'People have to fill in five fields before they see anything.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
