import { Section, Demo, Rules, Avoid, When, Btn, Field } from '../../site/kit';
import { ReportPage, ReportFrame, Params, byMonth, byBranch, vsLastYear } from './report-kit';
import './reports.css';

// Slicing reports: the period is picked from presets or typed, then the same report is sliced by month,
// by branch, or compared with last year. The rows never change; the columns do.


const PeriodPop = () => (
  <div className="rp-pop">
    <ul>{['This month', 'Last month', 'This quarter', 'Last quarter', 'Year to date', 'Last year', 'Custom'].map(x => <li key={x} className={x === 'This quarter' ? 'on' : undefined}>{x}</li>)}</ul>
    <div>
      <Field label="From" value="1 Jul 2026" />
      <Field label="To" value="30 Sep 2026" />
      <Btn kind="pri">Apply</Btn>
    </div>
  </div>
);

export default function Parameters() {
  return (
    <>
      <Demo wide caption="Opening Period shows the presets people use most, and a from and to for anything else. This quarter is picked; the dates follow it.">
        <ReportFrame>
          <div className="as-a-page rp-tall">
            <p className="as-crumb">Reports <span>/</span> Profit and loss <span>/</span> <b>Q3 by month</b></p>
            <p className="m-title">Profit and loss</p>
            <Params open={<PeriodPop />} />
          </div>
        </ReportFrame>
      </Demo>

      <Demo wide caption="Show by Month: a column per month, and the quarter’s total set apart on the right.">
        <ReportFrame><ReportPage data={byMonth} params={<Params />} /></ReportFrame>
      </Demo>

      <Demo wide caption="Show by Branch: the same quarter, a column per branch, and all branches on the right. The columns still add up to the total.">
        <ReportFrame><ReportPage data={byBranch} params={<Params by="Branch" />} /></ReportFrame>
      </Demo>

      <Demo wide caption="Compare to Same period last year: this quarter, last year’s, the change in pesos and in percent.">
        <ReportFrame><ReportPage data={vsLastYear} params={<Params by="Total" compare="Same period last year" />} /></ReportFrame>
      </Demo>

      <Section title="What people can choose">
        <When head={['Parameter', 'Options', 'Default']} rows={[
          ['Period', 'This month, last month, this quarter, last quarter, year to date, last year, or from and to', 'This quarter'],
          ['Show by', 'Total, month, quarter, branch, officer: whatever the report was shaped to allow', 'Month'],
          ['Compare to', 'None, the previous period, the same period last year', 'None'],
          ['Branch', 'The branches this person’s role can see, or all of them', 'All they can see'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Presets first, dates when needed.', 'This quarter, Last month, Year to date cover most reports. From and to are there for the rest.'],
            ['Slice with columns, keep the rows.', 'By month, by branch, or against last year: the rows stay the same, so the report still reads the same way.'],
            ['The total column always adds up.', 'Months add to the quarter, branches to all branches. People check it, so make it true.'],
            ['Show the change two ways.', 'Against last year: the pesos and the percent, side by side.'],
            ['The choices live in the URL.', '?period=2026-Q3&by=month, so a link, a saved report, and Back all show the same thing.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Two blank date fields.', 'People type the same quarter again every time, and get the end date wrong.'],
            ['Slicing that rebuilds the layout.', 'The report by branch looks nothing like the report by month, and can’t be compared.'],
            ['Columns that don’t add up to the total.', 'One rounding difference, and nobody trusts the report again.'],
            ['A percent with no amount, or an amount with no percent.', '+21.8% of a small number, or ₱1.4M of a big one, both mislead.'],
            ['Choices kept only on the screen.', 'A pasted link shows a different period from the one they meant.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
