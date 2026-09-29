import { Section, Demo, Pair, Rules, Avoid, Win, Btn, Field } from '../../site/kit';
import './foundations.css';

// Works with a keyboard, a screen reader, and tired eyes: focus, labels, contrast, colour, targets.

export default function Accessibility() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="Every field has a label above it. The focused field has a clear ring. The error is words beside the field, and the required fields are the default: only the optional one is marked.">
          <Win title="Customers / New customer">
            <Field label="Customer name" value="Metro Fuels" />
            <Field label="TIN" value="204-311-58" error="A TIN has 12 digits. This one has 8." />
            <Field label="Phone" optional value="0917 555 0142" focus />
            <span className="ax-foot"><Btn>Cancel</Btn><Btn kind="pri">Create customer</Btn></span>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Placeholders as labels vanish as soon as someone types. The only sign of the error is a red border. Light grey text fails contrast, and the tiny × is hard to hit.">
          <Win title="Customers / New customer">
            <span className="ax-bad"><Field placeholder="Customer name" /></span>
            <span className="ax-bad err"><Field value="204-311-58" /></span>
            <span className="ax-bad"><Field placeholder="Phone" /></span>
            <p className="ax-grey">Fields marked * are required. Contact admin for help.</p>
            <span className="ax-foot"><span className="ax-x">×</span><Btn kind="pri">Go</Btn></span>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Everything works from the keyboard.', 'Tab reaches every control in reading order; Enter and Space use it; Esc closes. Try a screen with the mouse unplugged.'],
          ['Focus is always visible.', 'A clear ring on whatever has focus, in every component. Never remove outlines without a replacement.'],
          ['Every field has a real label.', 'Above the field, always visible. A placeholder is an example, not a label.'],
          ['Colour is never the only signal.', 'Errors have words, statuses have words, charts have labels or patterns.'],
          ['Text people read passes contrast.', 'At least 4.5:1 for body text, 3:1 for large text and control borders. --muted on --light is the lightest text we use.'],
          ['Targets are big enough to hit.', 'At least 24×24 px with a mouse, 44×44 px on touch. Space small controls apart.'],
          ['Errors are announced and linked.', 'A screen reader hears the error when it appears, and the field says which error belongs to it.'],
          ['Let people zoom and slow down.', 'Layouts hold at 200% zoom. Motion respects “reduce motion”.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'div and span as buttons. Use <button> and <a>.',
          'outline: none with nothing in its place.',
          'Information only on hover: tooltips hold nothing people need.',
          'Disabling zoom in the viewport meta tag.',
          'Auto-advancing carousels, timers, and toasts that take the only copy of a message away.',
        ]} />
      </Section>
      </div>

    </>
  );
}
