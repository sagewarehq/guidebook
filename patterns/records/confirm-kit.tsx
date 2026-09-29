// The confirmation page, drawn: a routed page inside the shell (/invoices/1072/void) that says what an action will
// do before it does it. Shared by Record actions, Batch actions, and the shell pages; Delete page has its own.
// Not a page itself: catalog.ts has no "confirm-kit".
import type { ReactNode } from 'react';
import { Btn, Field } from '../../site/kit';
import './foundations.css';

export function ConfirmPage({ crumb, title, meta, facts, what, reason, typeName, back, action, danger = true, blocked }: {
  crumb: string[]; title: string; meta: string; facts?: [string, string][]; what: ReactNode[]; reason?: string; typeName?: string; back: string; action?: string; danger?: boolean; blocked?: ReactNode;
}) {
  return (
    <div className="as-a-page cf-page">
      <p className="as-crumb">{crumb.map((c, i) => i < crumb.length - 1 ? <span key={c}>{c}<span className="cf-sep">/</span></span> : <b key={c}>{c}</b>)}</p>
      <div className="cf-col">
        <div><p className="m-title">{title}</p><p className="cf-meta">{meta}</p></div>
        {facts && <p className="cf-facts">{facts.map(([k, v]) => <span key={k}><small>{k}</small>{v}</span>)}</p>}
        <div>
          <p className="m-k">{blocked ? 'Why not' : 'What happens'}</p>
          <ul className={`cf-what${blocked ? ' blocked' : ''}`}>{what.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
        {blocked && <div className="dl-alt">{blocked}</div>}
        {reason != null && <Field label="Reason" value={reason} hint="Kept in the history, with your name." />}
        {typeName != null && <Field label="Type the account name to confirm" value={typeName} hint="For actions this big, a click isn’t enough." />}
        <div className="cf-bar"><Btn>{back}</Btn><span className="as-grow" />{action && <Btn kind={danger ? 'danger' : 'pri'}>{action}</Btn>}</div>
      </div>
    </div>
  );
}
