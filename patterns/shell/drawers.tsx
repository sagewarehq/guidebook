import { Section, Demo, Rules, Avoid, When, Btn, Field, Pill, Sk } from '../../site/kit';
import { Frame, DetailPage } from './shell-kit';
import '../forms/forms.css';
import './shell.css';

// Drawers: our preference is a drawer from the right. It works on a desktop, where the record stays in
// view beside it, and on a phone, where it becomes a full screen that slides in from the right and swipes back.

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`sh-phone ${className ?? ''}`}><i className="sh-notch" />{children}</div>;
}

export default function Drawers() {
  return (
    <>
      <Demo wide caption="On a desktop: the drawer comes in from the right, the full height of the window, about a third of the width, with × at its top right. The invoice stays readable beside it.">
        <Frame on="Invoices">
          <div className="pd-big">
            <div className="pd-under"><DetailPage plain /></div>
            <div className="pd-side">
              <p className="pd-side-h"><b>Edit customer and terms</b><span>×</span></p>
              <p className="pd-side-s">INV-1038 · Metro Fuels</p>
              <Field label="Payment terms" value="Net 45" select focus />
              <Field label="Due date" value="17 Sep 2026" calc />
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save terms</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="On a phone, the same drawer: it slides in from the right edge and takes the full screen, with its title and the same × at the top right. Tapping ×, swiping right, or the phone’s back gesture slides it away again.">
        <div className="sh-phones">
          <Phone>
            <p className="sh-ph-top"><span>☰</span><b>INV-1038</b><span /></p>
            <div className="sh-ph-body">
              <p className="m-title">INV-1038 · Metro Fuels</p>
              <Pill tone="bad">Overdue 26 days</Pill>
              <p className="as-sech"><span className="m-k">Customer and terms</span><a className="m-link sh-tap">Edit</a></p>
              <Sk w="70%" /><Sk w="50%" /><Sk w="62%" />
            </div>
          </Phone>
          <p className="sh-arrow">Tap Edit<br />→</p>
          <Phone className="sliding">
            <div className="sh-ph-drawer">
              <p className="sh-ph-top sh-ph-dh"><b>Edit terms</b><span className="sh-x">×</span></p>
              <div className="sh-ph-body">
                <Field label="Payment terms" value="Net 45" select />
                <Field label="Due date" value="17 Sep 2026" calc />
                <span className="sh-ph-foot"><Btn kind="pri">Save terms</Btn></span>
              </div>
            </div>
          </Phone>
          <p className="sh-arrow">Tap ×, or<br />swipe right →</p>
          <Phone>
            <p className="sh-ph-top"><span>☰</span><b>INV-1038</b><span /></p>
            <div className="sh-ph-body">
              <p className="m-title">INV-1038 · Metro Fuels</p>
              <p className="sh-ph-toast">Terms saved. Due 17 Sep.</p>
              <Sk w="70%" /><Sk w="50%" />
            </div>
          </Phone>
        </div>
      </Demo>

      <Section title="Drawer, page, or modal, on each screen">
        <When head={['', 'Desktop', 'Phone']} rows={[
          ['Drawer', 'From the right, a third of the width, the full height of the window. The page stays in view.', 'Full screen, sliding in from the right. × at the top right, a swipe right, or Back close it.'],
          ['Confirmation page', 'A page in the shell, at its own URL: /invoices/1072/void.', 'The whole screen, with the action at the bottom.'],
          ['Modal', 'Small, centred, the page dimmed. Only for unsaved work: see App shell › Modals.', 'Still small and centred.'],
          ['Page', 'The whole content area.', 'The whole screen.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Prefer a drawer from the right.', 'For editing a section or anything with fields. On a phone it becomes the full screen, sliding in from the right.'],
            ['× at the top right, and a swipe right closes it.', 'The same corner on desktop and phone; Cancel and Back close it too. With unsaved changes, ask first.'],
            ['Confirmations are pages.', 'Void, approve, send, delete: each opens its own page that checks first. See Records › Record actions.'],
            ['Fields go in a drawer, not a modal.', 'Anything to fill in slides in from the right. A modal only asks about unsaved work: see Modals.'],
            ['One at a time, each with a URL.', 'Never a drawer on a drawer. Back closes it, and a link opens it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Drawers from the left or the bottom on a desktop.', 'The left is the sidebar’s side, so a drawer there reads as navigation.'],
            ['Closing on a tap outside with unsaved changes.', 'One stray tap, and the work is gone.'],
            ['Confirming in a modal.', 'A modal can’t check what depends on the record, or say what will happen.'],
            ['A centred modal full of fields.', 'On a phone it turns into a small scrolling box.'],
            ['A drawer on a drawer.', 'People lose track of which one they’re in, and Back can’t tell them apart.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
