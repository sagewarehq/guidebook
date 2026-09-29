// The three places people change how the system works, side by side. Shared by User preferences, System settings,
// and System administration. Not a page (no catalog entry).
import { When } from '../../site/kit';

const L = ({ id, children }: { id: string; children: string }) => <a className="m-link" href={`#/management/${id}`}>{children}</a>;

export function ThreePlaces() {
  return (
    <When head={['', 'User preferences', 'System settings', 'System administration']} rows={[
      ['Question', 'How do I like to work?', 'How does our business work in here?', 'Who can use it, and is it safe?'],
      ['Changes', 'Only your own experience', 'What the system does, for everyone', 'Who gets in, what they can do, and the data itself'],
      ['Who', 'Everyone, for themselves', 'Business leads: finance, operations', 'The owner and IT'],
      ['Holds', 'Name, password, two-step, notifications, language, signed-in devices', 'Payment terms, numbering, templates, loan products, approval limits, branches', 'Users and roles, audit trail, sign-in history, security, integration connections, snapshots, export everything, schedules, plan and billing'],
      ['Where', 'Profile menu, top right', 'Settings, sidebar foot', 'Administration, sidebar foot'],
      ['Page', <L id="shell/preferences">User preferences</L>, <L id="settings/overview">System settings</L>, <L id="admin/overview">System administration</L>],
    ]} />
  );
}
