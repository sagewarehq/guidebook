// The standard sign-in layout, drawn: a centred card on a quiet page, in the client's name. Shared by the
// Authentication pages; not a page itself (no catalog entry).
import type { ReactNode } from 'react';
import { Win, Pin } from '../../site/kit';
import { cx } from '../../lib/cx';
import './auth.css';

/** A numbered callout beside a part of the screen, for the layout page. */
export const P = ({ n, children, className }: { n?: number; children: ReactNode; className?: string }) =>
  n == null ? <>{children}</> : <div className={cx('ah-pw', className)}><Pin n={n} className="ah-p" />{children}</div>;

/** A whole sign-in screen: the browser window, the client's name, the card, and the footer. */
export function AuthScreen({ url = 'loans.metrolending.ph', pins, children, small }: { url?: string; pins?: boolean; children: ReactNode; small?: boolean }) {
  const n = (k: number) => (pins ? k : undefined);
  return (
    <Win title={url} className={cx('ah-win', small && 'small')}>
      <div className="ah-page">
        <P n={n(1)}><p className="ah-brand"><i className="ah-logo">ML</i><span><b>Metro Lending</b><small>Loans OS</small></span></p></P>
        <div className="ah-card">{children}</div>
        <P n={n(7)}><p className="ah-foot"><a>Help</a><a>Privacy</a><span>© 2026 Metro Lending</span></p></P>
      </div>
    </Win>
  );
}

/** The card's heading and the line under it. */
export const Head = ({ title, sub }: { title: string; sub?: ReactNode }) => (
  <div className="ah-head"><p className="ah-t">{title}</p>{sub && <p className="ah-s">{sub}</p>}</div>
);

/** A full-width button in the card. */
export const Full = ({ pri, children }: { pri?: boolean; children: ReactNode }) => <span className={cx('m-btn ah-full', pri ? 'pri' : 'sec')}>{children}</span>;

/** A notice at the top of the card: an error, or information. */
export const Notice = ({ tone = 'bad', children }: { tone?: 'bad' | 'info' | 'ok'; children: ReactNode }) => <p className={cx('ah-note', tone)}>{children}</p>;

/** A row with a checkbox on the left and a link on the right. */
export const Row = ({ check, on, link }: { check?: string; on?: boolean; link?: string }) => (
  <p className="ah-row">{check && <span className="ah-chk"><i className={cx(on && 'on')}>{on && '✓'}</i>{check}</span>}{link && <a className="m-link">{link}</a>}</p>
);

/** The six boxes of a one-time code. */
export const Code = ({ digits }: { digits: string }) => (
  <p className="ah-code">{Array.from({ length: 6 }, (_, i) => <i key={i} className={cx(digits[i] && 'on', i === digits.length && 'cur')}>{digits[i] ?? ''}</i>)}</p>
);

/** A small link line under the card's button. */
export const Alt = ({ children }: { children: ReactNode }) => <p className="ah-alt">{children}</p>;
