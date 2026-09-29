// The Administration area, drawn: the frame signed in as Carlo (admin), with Administration's own section list and a
// page inside it. Shared by the User management, Administration, Integrations, and Schedules pages. Not a page itself (no catalog entry).
import type { ReactNode } from 'react';
import { Frame } from '../shell/shell-kit';
import '../records/foundations.css';
import '../shell/shell.css';

const groups: [string, string[]][] = [
  ['People', ['Users and roles', 'Sign-in history']],
  ['Safety', ['Security', 'Audit trail']],
  ['Data', ['Snapshots', 'Export everything']],
  ['System', ['Schedules', 'Integrations']],
  ['Account', ['Plan and billing']],
];

export function AdminPage({ on, crumb, overlay, children }: { on: string; crumb: ReactNode; overlay?: ReactNode; children: ReactNode }) {
  return (
    <Frame loud as="admin" on="" overlay={overlay}
      foot={<><p className="as-nav">Jobs</p><p className="as-nav">Settings</p><p className="as-nav on">Administration</p><p className="as-nav">Help</p></>}>
      <div className="as-a-page">
        <p className="as-crumb">Administration <span>/</span> {crumb}</p>
        <div className="sh-set">
          <div className="sh-setnav st-groups">{groups.map(([g, items]) => <div key={g}><small>{g}</small>{items.map(x => <p key={x} className={x === on ? 'on' : undefined}>{x}</p>)}</div>)}</div>
          <div className="sh-setbody">{children}</div>
        </div>
      </div>
    </Frame>
  );
}
