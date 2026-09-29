import { Section, Demo, Rules, Avoid, When, Btn, Sk, Win } from '../../site/kit';
import { Frame } from '../shell/shell-kit';
import '../records/foundations.css';
import '../auth/auth.css';

// No access: what people see when they reach a page, a record, or an action their role doesn't allow. Say who can,
// offer a way to ask, and never give away a record they aren't meant to know exists.

export default function NoAccess() {
  return (
    <>
      <Demo wide caption="A page their role can’t open, reached from a link. The frame stays, the page says what they can’t do, who can, and offers a way to ask, and a way back.">
        <Frame on="Payments">
          <div className="as-a-page">
            <p className="as-crumb">Payments <span>/</span> <b>Payment runs</b></p>
            <div className="ah-no">
              <p className="m-title">You can’t open payment runs.</p>
              <p>Payment runs are for Finance. You’re in Collections, Cebu branch.</p>
              <p className="ah-no-b"><Btn kind="pri">Ask Ramon for access</Btn><Btn>Go to Payments</Btn></p>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="Say the record’s real state">
        <p>When someone opens a record they can’t work on, tell them why, exactly. Only a record that’s gone for good is Not found.</p>
        <div className="na-grid">
          <Demo caption={<><b>Archived.</b> The record opens, read-only, with who archived it and when, and Restore for those allowed.</>}>
            <Win title="Invoices / INV-0954" className="na-win">
              <p className="na-banner arch"><b>Archived</b> by Ramon on 3 Sep 2026. It’s read-only. <a className="m-link">Restore</a></p>
              <p className="m-title">INV-0954 · Amihan Foods</p>
              <Sk w="70%" /><Sk w="52%" />
            </Win>
          </Demo>
          <Demo caption={<><b>In the trash.</b> Deleted, but not yet for good: when it goes, and Restore until then.</>}>
            <Win title="Invoices / INV-1090" className="na-win">
              <p className="na-banner trash"><b>In the trash</b> since 20 Sep, deleted by Ana. Gone for good on 20 Oct. <a className="m-link">Restore</a></p>
              <p className="m-title">INV-1090 · Draft</p>
              <Sk w="64%" /><Sk w="40%" />
            </Win>
          </Demo>
          <Demo caption={<><b>In another branch.</b> Which branch it’s in, and who can help, instead of pretending it isn’t there.</>}>
            <Win title="Invoices / INV-2107" className="na-win">
              <div className="ah-no na-no"><p className="m-title">INV-2107 is in the Baguio branch.</p><p>You work in Cebu. The Baguio branch manager can open it, or give you access.</p><p className="ah-no-b"><Btn kind="pri">Ask for access</Btn><Btn>Go to Invoices</Btn></p></div>
            </Win>
          </Demo>
          <Demo caption={<><b>Deleted.</b> Gone for good, or never existed: the only case that’s Not found.</>}>
            <Win title="Invoices / INV-2199" className="na-win">
              <div className="ah-no na-no"><p className="m-title">We can’t find INV-2199.</p><p>It was deleted, or the number is wrong.</p><p className="ah-no-b"><Btn kind="pri">Search invoices</Btn><Btn>Go to Invoices</Btn></p></div>
            </Win>
          </Demo>
        </div>
      </Section>

      <Section title="What to show">
        <When head={['They reach', 'Show', 'Example']} rows={[
          ['A section their role doesn’t have', 'Nothing in the sidebar. From a link: the No access page, saying who can.', 'Collections opening Payment runs'],
          ['A record outside their branch or scope', 'Which branch it’s in, and who can help', 'INV-2107, in Baguio, opened by Ana in Cebu'],
          ['An archived or trashed record', 'The record, read-only, with its state, who, when, and Restore', 'INV-0954, archived; INV-1090, in the trash'],
          ['A deleted record', 'Not found', 'INV-2199, deleted for good'],
          ['An action on a record they can see', 'No button. From a link: its confirmation page says who can.', '“You can’t void payments. Finance can.”'],
          ['Something an admin turned off for everyone', 'The page, with a line saying it’s switched off and who to ask', 'Online payments, off until the new provider is set up'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Hide what a role can’t use.', 'No menu items, tabs, or buttons for things people can’t open or do.'],
            ['From a link, say what and who.', 'What they can’t do, which role can, and a named person to ask.'],
            ['Offer a way to ask, and a way back.', 'Ask Ramon for access sends a request; Go to Payments keeps them working.'],
            ['Say the record’s real state.', 'Archived, in the trash, or in another branch, with who and when. Not found only when it’s deleted.'],
            ['Keep the frame.', 'The sidebar, top bar, and breadcrumb stay, so people are still somewhere they know.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Greyed-out items people can never use.', 'They clutter every screen and invite clicks that go nowhere.'],
            ['“403 Forbidden.”', 'It says nothing about why, or who could help.'],
            ['A dead end.', 'With no one to ask and no way back, people close the tab.'],
            ['“Not found” for everything.', 'Ana thinks INV-0954 is lost, when it was only archived.'],
            ['The framework’s bare error page.', 'No sidebar, no breadcrumb: people think the system broke.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
