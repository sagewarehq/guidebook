// A shaped report, drawn: Metro Lending's profit and loss for Q3 2026, sliced by month, by branch, or compared with
// last year. Shared by the Reports pages; not a page itself (no catalog entry). Figures are illustrative and add up.
import type { ReactNode } from 'react';
import { Btn } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import { cx } from '../../lib/cx';
import './reports.css';

type Row = [label: string, values: string[], kind?: 'head' | 'sub' | 'total' | 'grand' | 'indent'];

export const byMonth: { cols: string[]; rows: Row[] } = {
  cols: ['Jul 2026', 'Aug 2026', 'Sep 2026', 'Q3 2026'],
  rows: [
    ['Income', [], 'head'],
    ['Interest income', ['4,820,000', '5,010,000', '5,240,000', '15,070,000'], 'indent'],
    ['Fees and penalties', ['612,000', '655,000', '701,000', '1,968,000'], 'indent'],
    ['Total income', ['5,432,000', '5,665,000', '5,941,000', '17,038,000'], 'sub'],
    ['Provision for loan losses', ['(380,000)', '(402,000)', '(455,000)', '(1,237,000)'], 'indent'],
    ['Net revenue', ['5,052,000', '5,263,000', '5,486,000', '15,801,000'], 'sub'],
    ['Operating expenses', [], 'head'],
    ['Salaries', ['1,850,000', '1,850,000', '1,910,000', '5,610,000'], 'indent'],
    ['Rent and utilities', ['420,000', '428,000', '431,000', '1,279,000'], 'indent'],
    ['Other expenses', ['310,000', '295,000', '342,000', '947,000'], 'indent'],
    ['Total expenses', ['2,580,000', '2,573,000', '2,683,000', '7,836,000'], 'sub'],
    ['Net income', ['2,472,000', '2,690,000', '2,803,000', '7,965,000'], 'grand'],
  ],
};

export const byBranch: { cols: string[]; rows: Row[] } = {
  cols: ['Cebu', 'Baguio', 'Davao', 'All branches'],
  rows: [
    ['Total income', ['7,300,000', '5,690,000', '4,048,000', '17,038,000'], 'sub'],
    ['Provisions and expenses', ['(3,890,000)', '(3,035,000)', '(2,148,000)', '(9,073,000)'], 'indent'],
    ['Net income', ['3,410,000', '2,655,000', '1,900,000', '7,965,000'], 'grand'],
  ],
};

export const vsLastYear: { cols: string[]; rows: Row[] } = {
  cols: ['Q3 2026', 'Q3 2025', 'Change', ''],
  rows: [
    ['Total income', ['17,038,000', '14,900,000', '+2,138,000', '+14.3%'], 'sub'],
    ['Provisions and expenses', ['(9,073,000)', '(8,360,000)', '+713,000', '+8.5%'], 'indent'],
    ['Net income', ['7,965,000', '6,540,000', '+1,425,000', '+21.8%'], 'grand'],
  ],
};

// Cebu alone, by month: the Cebu column of byBranch, split across the quarter.
export const cebuByMonth: { cols: string[]; rows: Row[] } = {
  cols: ['Jul 2026', 'Aug 2026', 'Sep 2026', 'Q3 2026'],
  rows: [
    ['Total income', ['2,340,000', '2,430,000', '2,530,000', '7,300,000'], 'sub'],
    ['Provisions and expenses', ['(1,260,000)', '(1,290,000)', '(1,340,000)', '(3,890,000)'], 'indent'],
    ['Net income', ['1,080,000', '1,140,000', '1,190,000', '3,410,000'], 'grand'],
  ],
};

/** The frame for a report page: Ramon, Finance lead, looking at all branches. */
export function ReportFrame({ on = '', children }: { on?: string; children: ReactNode }) {
  return <Frame as="lead" on={on}>{children}</Frame>;
}

/** The statement table. The last column is the total, set apart. */
export function Statement({ data, link, links }: { data: { cols: string[]; rows: Row[] }; link?: string; links?: boolean }) {
  return (
    <table className="rp-tbl">
      <thead><tr><th>₱</th>{data.cols.map((c, i) => <th key={i} className={cx('r', i === data.cols.length - 1 && 'last')}>{c}</th>)}</tr></thead>
      <tbody>
        {data.rows.map(([l, v, k]) => (
          <tr key={l} className={k}>
            <td>{l}</td>
            {k === 'head' ? <td colSpan={data.cols.length} /> : v.map((x, i) => <td key={i} className={cx('r', i === v.length - 1 && 'last')}>{link && l === link && i === 2 ? <a className="rp-drill hot">{x}<span className="rp-tip">Open 1,318 interest postings, Sep 2026 →</span></a> : links ? <a className="rp-drill">{x}</a> : x}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The parameter bar: the parts of a report people can change. */
export function Params({ period = '1 Jul – 30 Sep 2026', by = 'Month', compare = 'None', branch = 'All branches', open }: { period?: string; by?: string; compare?: string; branch?: string; open?: ReactNode }) {
  return (
    <div className="rp-params">
      <label><small>Period</small><span className={cx('rp-sel', !!open && 'on')}>{period} ▾</span>{open}</label>
      <label><small>Show by</small><span className="rp-sel">{by} ▾</span></label>
      <label><small>Compare to</small><span className="rp-sel">{compare} ▾</span></label>
      <label><small>Branch</small><span className="rp-sel">{branch} ▾</span></label>
    </div>
  );
}

/** A whole report page's content: header, what it covers, parameters, the statement, and its footnote. */
export function ReportPage({ data = byMonth, params, link, branch }: { data?: { cols: string[]; rows: Row[] }; params?: ReactNode; link?: string; branch?: string }) {
  return (
    <div className="as-a-page">
      <p className="as-crumb">Reports <span>/</span> Profit and loss <span>/</span> <b>Q3 by month</b></p>
      <div className="as-a-head">
        <div><p className="m-title">Profit and loss</p><p className="as-meta"><span>Is the business making money, and where? Accrual basis · voided invoices left out</span></p></div>
        <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Export</Btn><Btn kind="pri">Save report</Btn></span>
      </div>
      {params ?? <Params branch={branch} />}
      <Statement data={data} link={link} />
      <p className="rp-foot">{`Metro Lending, ${branch ? `${branch} branch` : 'all branches'} · figures in pesos · as of 28 Sep 2026, 9:14 AM`}</p>
    </div>
  );
}
