// Small pieces for the App shell pages that place things in the frame: settings, people, tenancy, balances.
// Not a page itself: catalog.ts has no "places-kit".
import type { ReactNode } from 'react';
import { Pin } from '../../site/kit';
import { cx } from '../../lib/cx';
import './shell.css';

/** Outlines one thing in the frame, with its number on the corner. */
export const H = ({ n, children, className }: { n?: number; children: ReactNode; className?: string }) => (
  <span className={cx('sh-hl', className)}>{n != null && <Pin n={n} className="sh-hlp" />}{children}</span>
);

/** A menu drawn open over the frame, placed with `className` (sh-menu-tl, sh-menu-tr, sh-menu-bl). */
export const Menu = ({ className, children }: { className?: string; children: ReactNode }) => <div className={cx('sh-menu', className)}>{children}</div>;

/** The default sidebar nav, with an optional marked item. */
export function Nav({ on, after }: { on?: string; after?: ReactNode }) {
  return (
    <>
      <p className="as-nav">Home <em>3</em></p>
      <p className="as-grp">Work</p>
      {['Invoices', 'Payments', 'Customers', 'Loans'].map(x => <p key={x} className={x === on ? 'as-nav on' : 'as-nav'}>{x}</p>)}
      <p className="as-grp">Analytics</p>
      <p className="as-nav">Reports</p>
      {after}
    </>
  );
}
