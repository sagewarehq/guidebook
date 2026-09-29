// The search palette, drawn: the box, grouped results, and the key hints. Shared by the Global search pages.
// Not a page itself: catalog.ts has no "palette-kit".
import type { ReactNode } from 'react';
import { Frame } from '../shell/shell-kit';
import { Sk } from '../../site/kit';
import { cx } from '../../lib/cx';
import '../records/foundations.css';
import './search.css';

/** One result: a type badge, the name with the match marked, the facts that tell it apart, and an optional key hint. */
export type Hit = { t: string; name: ReactNode; facts?: ReactNode; on?: boolean; key?: string };
export type Group = [string, Hit[], string?];

/** Marks the matched part of a name. */
export const M = ({ children }: { children: ReactNode }) => <mark className="sr-m">{children}</mark>;

export function Palette({ q, groups, foot, hint = true, className }: { q: string; groups: Group[]; foot?: ReactNode; hint?: boolean; className?: string }) {
  return (
    <div className={cx('sr-pal', className)}>
      <p className="sr-in"><span className="sr-glass">⌕</span>{q ? <b>{q}</b> : <span className="sr-ph">Search invoices, customers, loans, or type a command…</span>}<i className="sr-caret" /><kbd>esc</kbd></p>
      <div className="sr-body">
        {groups.map(([g, hits, count]) => (
          <div key={g} className="sr-grp">
            <p className="sr-g">{g}{count && <small>{count}</small>}</p>
            {hits.map((h, i) => (
              <p key={i} className={cx('sr-row', h.on && 'on')}>
                <span className="sr-t">{h.t}</span>
                <span className="sr-main"><b>{h.name}</b>{h.facts && <small>{h.facts}</small>}</span>
                {h.key ? <kbd>{h.key}</kbd> : h.on && <kbd>↵</kbd>}
              </p>
            ))}
          </div>
        ))}
      </div>
      {foot && <p className="sr-foot">{foot}</p>}
      {hint && <p className="sr-keys"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>⌘</kbd><kbd>↵</kbd> new tab</span><span><kbd>esc</kbd> close</span></p>}
    </div>
  );
}

/** The palette open over a page in the app shell, the page dimmed behind it. */
export function InShell({ on = 'Invoices', as, children }: { on?: string; as?: 'staff' | 'lead' | 'admin'; children: ReactNode }) {
  return (
    <Frame on={on} as={as}>
      <div className="sr-over">
        <div className="as-a-page sr-behind">
          <p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p>
          <p className="m-title">Invoices</p>
          {[88, 72, 80, 66, 84, 70, 76].map((w, i) => <Sk key={i} w={`${w}%`} />)}
        </div>
        <div className="sr-float">{children}</div>
      </div>
    </Frame>
  );
}
