import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Saying what happened: toasts, bulk results, background work, and notifications, drawn before and after.

export default function Feedback() {
  return (
    <>
      <Examples id="feedback" />
      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Name the thing, and what happened to it.', '“Payment recorded. ₱420,000.00 left on INV-1038.”'],
            ['Offer Undo when it can.', 'Archiving, removing from a list, and reassigning can be undone from the toast for a few seconds.'],
            ['Count what worked and what didn’t.', 'After a bulk action: “18 reminders sent. 2 customers have no email.”, with a link to the two.'],
            ['Say what’s ready, and hand it over.', '“Your export is ready: 1,204 invoices.”, with Download on the toast.'],
            ['No toast for what’s already on screen.', 'If the section people are looking at shows the change, that’s the feedback.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Success!”', 'It says nothing about what happened, or to what.'],
            ['A toast with no way back.', 'One wrong click means finding the record again to put it right.'],
            ['“Operation partially completed.”', 'People can’t tell what failed, or which ones to fix.'],
            ['“Export complete.”', 'People still have to go and find the file.'],
            ['A toast for every save.', 'People learn to ignore toasts, and miss the ones that matter.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
