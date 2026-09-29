// Pieces for the Integrations pages: a job's providers in order, and the drawer that adds one. Not a page.
import type { ReactNode } from 'react';
import { Btn, Pill } from '../../site/kit';
import { AdminPage } from '../admin/admin-kit';
import './integrations.css';

export type Prov = [logo: string, name: string, detail: string, state: string, tone?: 'ok' | 'bad' | 'off'];

/** One integration's page: its providers in order, with Add provider, and an optional drawer. */
export function ProviderPage({ job, desc, note, rows, drawer }: { job: string; desc: string; note: string; rows: Prov[]; drawer?: ReactNode }) {
  return (
    <AdminPage on="Integrations" crumb={<>Integrations <span>/</span> <b>{job}</b></>} overlay={drawer}>
      <div className="m-row"><div><p className="m-title">{job}</p><p className="as-meta"><span>{desc}</span></p></div><span className="ig-bar"><Btn>View logs</Btn><Btn kind="pri">Add provider</Btn></span></div>
      <p className="ig-note">{note}</p>
      <div className="ig-order">{rows.map(([l, n, d, st, tone], i) => <p key={n}><i>⋮⋮</i><em>{i + 1}</em><span className="ig-pn"><i className="ig-logo sm">{l}</i><span><b>{n}</b><small>{d}</small></span></span><Pill tone={tone}>{st}</Pill></p>)}</div>
    </AdminPage>
  );
}
