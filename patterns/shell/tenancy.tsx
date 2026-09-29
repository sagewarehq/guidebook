import { Section, Demo, Rules, Avoid, When, Sk } from '../../site/kit';
import { Frame } from './shell-kit';
import { H, Menu } from './places-kit';
import './shell.css';

// Multi-tenancy: the account (tenant) switcher, with branches inside an account, top left above the sidebar, always showing which account people are in.

export default function Tenancy() {
  return (
    <>
      <Demo wide caption="The switcher sits top left, above the sidebar (1), and always shows the account and the branch. Opening it lists every account and branch this person can use, with search once there are more than 7. Switching keeps them in the same section: Invoices in Cebu becomes Invoices in Davao.">
        <Frame loud as="lead" on="Invoices"
          org={<H n={1} className="block"><p className="as-org sh-org"><i className="sh-orgmark">ML</i><span><b>Metro Lending</b><small>Cebu branch ▾</small></span></p></H>}
          overlay={<Menu className="sh-menu-tl">
            <p className="sh-mhead">Metro Lending</p>
            <p>All branches</p><p>Baguio</p><p className="on">Cebu <span>✓</span></p><p>Davao</p>
            <p className="sh-mhead">Metro Leasing Corp.</p>
            <p>Makati</p>
            <p className="sep sh-mnote">Switching keeps you on Invoices.</p>
          </Menu>}>
          <div className="as-a-page sh-dimpage">
            <p className="as-crumb">Invoices <span>/</span> <b>Overdue in Cebu</b></p>
            <p className="m-title">Invoices</p>
            {[80, 66, 74, 58].map(w => <Sk key={w} w={`${w}%`} />)}
          </div>
        </Frame>
      </Demo>

      <Section title="Two levels of place">
        <When head={['Level', 'What it is', 'How it shows']} rows={[
          ['Account (the tenant)', 'A separate business, with its own data, users, and settings. Nothing mixes between accounts.', 'Its name and mark at the top of the switcher. Each account can have its own colour mark.'],
          ['Branch (a scope)', 'Part of one account. Some roles see one branch, some see all.', 'Under the account name: Cebu branch. “All branches” only for roles that can see them.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Top left, always visible.', 'Above the sidebar: Metro Lending, Cebu branch, on every page. People check it before they act.'],
            ['Two clicks to switch.', 'Open, pick. Search appears once there are more than 7 places.'],
            ['Switch in place.', 'Stay in the same section, on its list. A record from the old branch never shows in the new one.'],
            ['Only what they can use.', 'The list holds only the accounts and branches this person has access to. With one place, there’s no ▾ at all.'],
            ['Mark training and test accounts.', 'A banner across the top: “Training account. Nothing here is real.”'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['The switcher in the profile menu, or only at sign-in.', 'People can’t see which account they’re in, or change it.'],
            ['A long list with no search.', 'Past 7 places, people scroll to find their branch.'],
            ['Mixing branches silently.', 'An old record shows in the new branch, or an all-branches list has no branch column.'],
            ['Places they can’t open, or a ▾ with one place.', 'People click into a dead end, or a menu with nothing to pick.'],
            ['Training accounts that look real.', 'People do real work where nothing counts.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
