// Pieces for writing a pattern page, and lo-fi mock-up pieces sized for a web page (rem, not cqi).
// Pattern pages in patterns/<chapter>/<id>.tsx build from these; styles are in site.css (.g-*) and mock.css (.m-*).
import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

/* ---------- page parts ---------- */

/** A titled section of a pattern page. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="g-sec"><h2>{title}</h2>{children}</section>;
}

/** A mock-up in a frame, with an optional Do or Avoid tag and a caption under it. */
export function Demo({ verdict, caption, wide, children }: { verdict?: 'do' | 'avoid'; caption?: ReactNode; wide?: boolean; children: ReactNode }) {
  return (
    <figure className={cx('g-demo', verdict, wide && 'wide')}>
      {verdict && <span className="g-verdict">{verdict === 'do' ? '✓ Do' : '✗ Avoid'}</span>}
      <div className="g-stage">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Two or more demos side by side, usually Do then Avoid. */
export const Pair = ({ children }: { children: ReactNode }) => <div className="g-pair">{children}</div>;

/** The guidelines: a bold rule, then a line of detail. */
export function Rules({ items }: { items: [string, ReactNode][] }) {
  return (
    <ol className="g-rules">
      {items.map(([b, t]) => <li key={b}><b>{b}</b> <span>{t}</span></li>)}
    </ol>
  );
}

/** Things to avoid. Each is a bold lead and a line, and item n is the mistake behind guideline n. */
export function Avoid({ items }: { items: (ReactNode | [string, ReactNode])[] }) {
  return (
    <ol className="g-avoid">
      {items.map((t, i) => <li key={i}>{Array.isArray(t) ? <><b>{t[0]}</b> <span>{t[1]}</span></> : t}</li>)}
    </ol>
  );
}

/** Notes for the engineer building it: Laravel, Django, React, the database. */
export function Build({ items }: { items: [string, ReactNode][] }) {
  return (
    <aside className="g-build">
      <p className="g-build-k">Build notes</p>
      <ul>{items.map(([b, t]) => <li key={b}><b>{b}</b> {t}</li>)}</ul>
    </aside>
  );
}

/** A table of options: when to use each. */
export function When({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <table className="g-when">
      <thead><tr>{head.map(h => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

/** A small tab switch for showing one of several variants of a demo, such as List, Detail, and Form. */
export function Tabs<T extends string>({ options, value, onChange, label }: { options: [T, string][]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="g-tabs" role="tablist" aria-label={label}>
      {options.map(([v, l]) => (
        <button key={v} type="button" role="tab" aria-selected={v === value} className={cx(v === value && 'on')} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}

/* ---------- mock-up pieces ---------- */

/** A lo-fi app window. */
export function Win({ title, tag, className, children }: { title?: string; tag?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cx('m-win', className)}>
      {title != null && <div className="m-win-h"><span className="m-dots"><i /><i /><i /></span><b>{title}</b>{tag}</div>}
      <div className="m-win-b">{children}</div>
    </div>
  );
}

/** A button. `pri` is the one primary action; `quiet` is a text button; `danger` only inside the dialog that confirms it. */
export function Btn({ kind = 'sec', children, className }: { kind?: 'pri' | 'sec' | 'quiet' | 'danger'; children: ReactNode; className?: string }) {
  return <span className={cx('m-btn', kind, className)}>{children}</span>;
}

/** A status pill. `ok` for done and good, `bad` for needs attention, `off` for inactive, neutral otherwise. */
export function Pill({ tone, children }: { tone?: 'ok' | 'bad' | 'off'; children: ReactNode }) {
  return <span className={cx('m-pill', tone)}>{children}</span>;
}

/** A form field: label, input, and a hint or error. */
export function Field({ label, value, placeholder, hint, error, focus, optional, calc, select }: {
  label?: string; value?: string; placeholder?: string; hint?: string; error?: string;
  focus?: boolean; optional?: boolean; calc?: boolean; select?: boolean;
}) {
  return (
    <div className="m-field">
      {label && <label>{label}{optional && <em> (optional)</em>}</label>}
      <span className={cx('m-in', error && 'bad', focus && 'focus', calc && 'calc', !value && 'ph')}>
        {value ?? placeholder}{select && <i>▾</i>}
      </span>
      {error ? <p className="m-err">{error}</p> : hint && <p className="m-hint">{hint}</p>}
    </div>
  );
}

/** A skeleton bar standing in for text. */
export const Sk = ({ w = '60%', h }: { w?: string; h?: string }) => <i className="m-sk" style={{ width: w, height: h }} />;

/** A toast at the foot of the screen. */
export function Toast({ children, action }: { children: ReactNode; action?: string }) {
  return <p className="m-toast"><span>{children}</span>{action && <b>{action}</b>}</p>;
}

/** A numbered callout on a mock-up, matched to a numbered row in the table or list beside it. */
export const Pin = ({ n, className }: { n: number; className?: string }) => <i className={cx('m-pin', className)}>{n}</i>;

/** Round initials for a person, or an Agent with its badge. */
export function Ini({ n, agent }: { n: string; agent?: boolean }) {
  return <span className={cx('m-ini', agent && 'agent')}>{n}{agent && <i>AI</i>}</span>;
}
