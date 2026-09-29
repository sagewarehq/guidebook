// Drawings for the Reports and analysis chapter: Metro Lending’s collections, June to September 2026, as the report
// everyone uses and as Nico’s pivot, plus the Agents window with a detail drawer wide enough for a table. Not a page
// itself: catalog.ts has no "analysis-kit". Figures are illustrative and add up; September is ₱760,000 below August
// in Baguio, split ₱310,000 restructured + ₱285,000 Route 3 not covered + ₱165,000 now more than 30 days late.
import type { ReactNode } from 'react';
import { AgentAva, agentsCast, type AgentId } from '../agents/agent-kit';
import { Statement, Params } from '../reports/report-kit';
import { Btn, Sk } from '../../site/kit';
import { cx } from '../../lib/cx';
import './analysis.css';

export const peso = (n: number) => n.toLocaleString('en-US');

/* ---------- the report: Collections by branch ---------- */

export const months = ['Jun', 'Jul', 'Aug', 'Sep'];

/** Collected, by branch and month. Baguio’s row is the one in Nico’s answer in Chat › Tables and charts. */
export const branches: [string, number[]][] = [
  ['Cebu', [5_620_000, 5_780_000, 5_910_000, 6_040_000]],
  ['Baguio', [4_050_000, 4_210_000, 4_180_000, 3_420_000]],
  ['Davao', [3_110_000, 3_190_000, 3_240_000, 3_300_000]],
];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const colSums = (rows: number[][]) => rows[0].map((_, i) => sum(rows.map(r => r[i])));

type Data = Parameters<typeof Statement>[0]['data'];

/** The report’s table: a row per branch, a column per month, the four months’ total on the right. */
export function collectionsData(only?: string): Data {
  const rows = branches.filter(([b]) => !only || b === only);
  const all = colSums(rows.map(([, v]) => v));
  return {
    cols: [...months.map(m => `${m} 2026`), 'Jun–Sep'],
    rows: [
      ...rows.map(([b, v]): Data['rows'][number] => [b, [...v, sum(v)].map(peso)]),
      ...(only ? [] : [['All branches', [...all, sum(all)].map(peso), 'grand'] as Data['rows'][number]]),
    ],
  };
}

/** The Collections by branch report page, as anyone opens it from Reports. `only` is the Branch parameter. */
export function CollectionsReport({ only, at = '9:12 AM' }: { only?: string; at?: string }) {
  return (
    <>
      <p className="as-crumb">Reports <span>/</span> Collections <span>/</span> <b>Collections by branch</b></p>
      <div className="as-a-head"><div><p className="m-title">Collections by branch</p><p className="as-meta"><span>Are we collecting what’s due? Payments posted, reversals left out</span></p></div></div>
      <Params period="1 Jun – 30 Sep 2026" by="Month" branch={only ?? 'All branches'} />
      <Statement data={collectionsData(only)} links />
      <p className="rp-foot">{`Metro Lending, ${only ? `${only} branch` : 'all branches'} · Collected, in pesos · as of 28 Sep 2026, ${at}`}</p>
    </>
  );
}

/** The same report, drawn quietly under a chat panel: its header and parameters, the table as skeleton bars. */
export function ReportStub({ only }: { only?: string }) {
  return (
    <div className="an-under">
      <p className="as-crumb">Reports <span>/</span> Collections <span>/</span> <b>Collections by branch</b></p>
      <div className="as-a-head"><div><p className="m-title">Collections by branch</p><p className="as-meta"><span>{`1 Jun – 30 Sep 2026 · by month · ${only ?? 'all branches'}`}</span></p></div></div>
      <Sk w="92%" /><Sk w="84%" /><Sk w="88%" /><Sk w="70%" /><Sk w="80%" />
    </div>
  );
}

/* ---------- the pivot: Baguio, by collector ---------- */

/** Baguio’s collectors, Jun to Sep. Each month adds up to Baguio’s row in the report above. */
export const collectors: [string, string, number[]][] = [
  ['Grace Soriano', 'Route 1', [1_080_000, 1_130_000, 1_120_000, 880_000]],
  ['Paolo Dizon', 'Route 2', [1_010_000, 1_060_000, 1_050_000, 855_000]],
  ['Rey Castillo', 'Route 3 · on leave 7–18 Sep', [960_000, 990_000, 980_000, 655_000]],
  ['Branch counter', 'Walk-ins and transfers', [1_000_000, 1_030_000, 1_030_000, 1_030_000]],
];

export type Slot = 'rows' | 'cols' | 'values' | 'branch' | 'period';

/** A pivot setting as a chip: its slot, and what it’s set to. Filters show an ×; `open` draws its menu under it. */
function Chip({ label, value, filter, on, children }: { label: string; value: string; filter?: boolean; on?: boolean; children?: ReactNode }) {
  return <span className={cx('an-chip', filter && 'flt', on && 'on')}><small>{label}</small><b>{value}</b>{filter ? '×' : '▾'}{children}</span>;
}

/** The pivot’s settings, in one line above it. `open` shows that chip’s menu: dimensions for rows and columns, measures for values. */
export function PivotChips({ open, rows = 'Collector', cols = 'Month', values = 'Collected', period = 'Jun – Sep 2026' }: { open?: Slot; rows?: string; cols?: string; values?: string; period?: string }) {
  const menu = (head: string, items: [string, string][], picked: string, end?: boolean) => (
    <span className={cx('an-pop', end && 'end')}><span className="m-k">{head}</span>{items.map(([n, d]) => <p key={n} className={n === picked ? 'on' : undefined}><span>{n}</span><small>{d}</small></p>)}</span>
  );
  return (
    <p className="an-chips">
      <Chip label="Rows" value={rows} on={open === 'rows'}>{open === 'rows' && menu('Dimensions', dimensions.map(([n, , v]) => [n, v]), rows)}</Chip>
      <Chip label="Columns" value={cols} on={open === 'cols'}>{open === 'cols' && menu('Dimensions', [...dimensions.map(([n, , v]): [string, string] => [n, v]), ['None', 'one total column']], cols)}</Chip>
      <Chip label="Values" value={values} on={open === 'values'}>{open === 'values' && menu('Measures', measures.map(([n, , , u]) => [n, u]), values, true)}</Chip>
      <Chip label="Branch" value="Baguio" filter on={open === 'branch'} />
      <Chip label="Period" value={period} filter on={open === 'period'} />
    </p>
  );
}

/** The pivot table: a row per collector, a column per month, totals on the right and at the foot. `hot` is the cell being opened. */
export function PivotTable({ hot, tip = true }: { hot?: [string, number]; tip?: boolean }) {
  const tot = colSums(collectors.map(([, , v]) => v));
  return (
    <table className="an-pv">
      <thead><tr><th>Collector</th>{months.map(m => <th key={m} className="r">{m}</th>)}<th className="r tot">Total</th></tr></thead>
      <tbody>
        {collectors.map(([n, route, v]) => (
          <tr key={n}>
            <td>{n}<small>{route}</small></td>
            {v.map((x, i) => {
              const isHot = hot && hot[0] === n && hot[1] === i;
              return <td key={i} className="r"><a className={cx('rp-drill', isHot && 'hot')}>{peso(x)}{isHot && tip && <span className="rp-tip">{`Open 168 payments, ${n}, Sep →`}</span>}</a></td>;
            })}
            <td className="r tot"><a className="rp-drill">{peso(sum(v))}</a></td>
          </tr>
        ))}
      </tbody>
      <tfoot><tr><td>Baguio</td>{tot.map((x, i) => <td key={i} className="r">{peso(x)}</td>)}<td className="r tot">{peso(sum(tot))}</td></tr></tfoot>
    </table>
  );
}

/** The line every analysis carries: who worked it out, that it isn’t a saved report, and when. */
export const Label = ({ agent = 'nico', at }: { agent?: AgentId; at: string }) => (
  <p className="an-label"><b>{`Analysis by ${agentsCast[agent].name} — not a saved report`}</b><span>{`Worked out 28 Sep 2026, ${at} · data as of ${at}`}</span></p>
);

/* ---------- the governed layer ---------- */

/** The measures the system defines: name, plain definition, who defined it, and its unit. */
export const measures: [string, string, string, string][] = [
  ['Collected', 'Payments posted in the period. Reversed payments are left out.', 'Loans OS', 'pesos'],
  ['Overdue balance', 'Unpaid amounts past their due date, at the end of the period.', 'Loans OS', 'pesos'],
  ['On-time rate', 'Installments paid by their due date, plus 3 days’ grace, out of all due in the period.', 'Ramon Cruz, in Settings › Loan terms', 'percent'],
  ['Loans released', 'Loans paid out in the period: how many, and how much.', 'Loans OS', 'count and pesos'],
];

/** The dimensions every measure can be sliced by: name, what it holds, and a short line for menus. */
export const dimensions: [string, string, string][] = [
  ['Branch', 'Cebu, Baguio, Davao: the branch that holds the loan.', '3 branches'],
  ['Month', 'The calendar month the payment or installment falls in.', 'from Jan 2019'],
  ['Customer', 'The borrower on the loan.', '4,812 customers'],
  ['Collector', 'Who took the payment, or Branch counter.', '14 collectors'],
  ['Product', 'Business loan, Salary loan, Vehicle loan.', '3 products'],
];

/* ---------- the Agents window ---------- */

export type Session = [agent: AgentId, title: string, state: string, on?: boolean];

/**
 * The Agents window, as in Agents in the app › Where Agents show up, with a detail drawer wide enough for a table.
 * While the drawer holds a table, the sessions fold to a rail of avatars (hover shows each title).
 */
export function Window({ sessions, title, agent = 'nico', chat, drawer, drawerTitle }: {
  sessions: Session[]; title: string; agent?: AgentId; chat: ReactNode; drawer: ReactNode; drawerTitle: ReactNode;
}) {
  return (
    <div className="an-ws">
      <div className="an-sess">
        <p className="an-sess-h" title="Sessions">☰</p>
        {sessions.map(([id, t, st, on]) => (
          <p key={t} className={cx('an-s', on && 'on')} title={t}>
            <AgentAva id={id} size="sm" />
            <span><b>{t}</b><small>{`${agentsCast[id].name} · ${st}`}</small></span>
          </p>
        ))}
      </div>
      <div className="an-chat">
        <p className="an-chat-h"><AgentAva id={agent} size="sm" /><b>{title}</b><small>{`with ${agentsCast[agent].name}`}</small></p>
        <div className="ag-feed">{chat}</div>
        <div className="ag-in"><span>{`Ask ${agentsCast[agent].name}, or tell ${agentsCast[agent].him} what to change…`}</span><i>↑</i></div>
      </div>
      <div className="an-dr">
        <p className="an-dr-h"><b>{drawerTitle}</b><span>×</span></p>
        {drawer}
      </div>
    </div>
  );
}

/* ---------- the pivot, in its drawer ---------- */

/** The Agents window’s sessions while Nico’s pivot is open. */
export const pivotSessions: Session[] = [
  ['nico', 'Baguio collections by collector', 'Analysis, not saved', true],
  ['nico', 'Baguio collections in September', 'Answered'],
  ['marco', 'Payment run #0318', 'Waiting on you'],
  ['bea', 'Proposal for Abad Trucking', 'Waiting on Liza'],
];

/** The pivot as the drawer shows it: the label, the settings, the table, and what people can do with it. */
export function PivotDrawer({ hot, tip }: { hot?: [string, number]; tip?: boolean }) {
  return (
    <>
      <Label at="9:20 AM" />
      <PivotChips />
      <PivotTable hot={hot} tip={tip} />
      <p className="an-foot">Baguio’s total, ₱15,860,000, is the Baguio row of Collections by branch.</p>
      <p className="an-acts"><small>Every figure opens its payments.</small><Btn>Re-run</Btn><Btn kind="pri">Save as report…</Btn></p>
    </>
  );
}
