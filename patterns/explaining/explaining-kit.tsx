// Drawings shared by the Showing the work pages: payment run #0318 as a page in the app, its held invoices, a source
// chip for a record the viewer can’t open, and a drawer beside the work. Not a page itself: catalog.ts has no
// "explaining-kit".
import type { ReactNode } from 'react';
import { Btn, Pill } from '../../site/kit';
import { AgentAva, HeldPill, Reason, Source } from '../agents/agent-kit';
import { cx } from '../../lib/cx';
import './explaining.css';

/** The top of run #0318’s page: breadcrumb, title, state, who prepared it, the two answers, and the key figures. */
export function RunHead({ acts = true }: { acts?: boolean }) {
  return (
    <>
      <p className="as-crumb">Agents <span>/</span> Runs <span>/</span> <b>#0318</b></p>
      <div className="as-a-head">
        <div>
          <p className="m-title">Payment run #0318</p>
          <p className="as-meta"><Pill>Waiting on you</Pill><span className="sw-by"><AgentAva id="marco" size="sm" />Marco · today, 7:40 AM · pays Tue 29 Sep, 9:00 AM, from BDO ••4471</span></p>
        </div>
        {acts && <span className="as-acts"><Btn>Suggest changes</Btn><Btn kind="pri">Approve…</Btn></span>}
      </div>
      <p className="sw-facts"><span><small>To pay</small>₱48,650,000.00</span><span><small>Suppliers</small>32 of 35</span><span><small>Held</small>3 · ₱3,911,150.00</span></p>
    </>
  );
}

/** One held invoice: what, how much, why (with its records), what would clear it, and the person’s ways out. */
export type HeldItem = { supplier: string; inv: string; amount: string; why: ReactNode; sources: string[]; clears: ReactNode; acts: string[] };

export const heldItems: HeldItem[] = [
  {
    supplier: 'Cebu Paperworks', inv: 'INV-8863', amount: '₱186,400.00',
    why: 'Same items and amount as INV-8807, paid Tue 22 Sep. Looks like a resend.', sources: ['INV-8807', 'PAY-7712'],
    clears: 'Cebu Paperworks says it’s a new order. If it’s a resend, mark it a duplicate.',
    acts: ['Mark as duplicate…', 'Pay anyway…'],
  },
  {
    supplier: 'Luzon Packaging', inv: 'INV-2291', amount: '₱1,318,750.00',
    why: 'Still ₱68,750 over PO-4431. Their corrected invoice hasn’t come in.', sources: ['PO-4431', 'Email, 23 Sep'],
    clears: 'A corrected invoice for ₱1,250,000.00 arrives. Marco matches it and adds it to the next run.',
    acts: ['Ask Luzon for a corrected invoice', 'Pay anyway…'],
  },
  {
    supplier: 'Island Grains', inv: 'INV-3317', amount: '₱2,406,000.00',
    why: 'Billed in full, but the warehouse hasn’t received the goods.', sources: ['PO-4452'],
    clears: 'The warehouse confirms PO-4452. Marco adds it to the next run.',
    acts: ['Ask the warehouse', 'Pay anyway…'],
  },
];

/** A held invoice, drawn in full: the Held block’s row. `bare` leaves out what clears it and the buttons. */
export function Held({ item, bare }: { item: HeldItem; bare?: boolean }) {
  return (
    <div className="sw-hold">
      <p className="sw-hold-h"><span><HeldPill /><b>{item.supplier}</b><a className="m-link">{item.inv}</a></span><b>{item.amount}</b></p>
      <p className="sw-hold-why"><Reason>{item.why}</Reason>{item.sources.map(s => <Source key={s}>{s}</Source>)}</p>
      {!bare && <>
        <p className="sw-clears"><small>Clears when</small>{item.clears}</p>
        <p className="sw-hold-acts">{item.acts.map((a, i) => <Btn key={a} kind={i === 0 ? 'sec' : 'quiet'}>{a}</Btn>)}</p>
      </>}
    </div>
  );
}

/** A source the viewer can’t open: counted, never named, and not a link. */
export const Locked = ({ n = 1 }: { n?: number }) => <span className="sw-locked">{n === 1 ? '1 record you can’t open' : `${n} records you can’t open`}</span>;

/** A box of lines, the width of the page: a proposal outside the chat, with its own heading. */
export function Box({ title, note, tone, children }: { title: ReactNode; note?: ReactNode; tone?: 'held'; children: ReactNode }) {
  return (
    <div className={cx('sw-box', tone)}>
      <p className="sw-box-h"><span className="m-k">{title}</span>{note && <small>{note}</small>}</p>
      {children}
    </div>
  );
}

/** A drawer from the right, full window height: pass as AgentFrame’s `overlay`. The page behind makes room for it. */
export function Drawer({ title, sub, tabs, children }: { title: ReactNode; sub?: ReactNode; tabs?: [string, boolean?][]; children: ReactNode }) {
  return (
    <div className="sw-drawer">
      <p className="sw-drawer-h"><b>{title}</b><span>×</span></p>
      {sub && <p className="sw-drawer-s">{sub}</p>}
      {tabs && <p className="sw-drawer-tabs">{tabs.map(([t, on]) => <span key={t} className={cx(on && 'on')}>{t}</span>)}</p>}
      {children}
    </div>
  );
}
