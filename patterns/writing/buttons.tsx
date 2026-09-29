import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Buttons, links, and the questions asked before acting, drawn before and after.

export default function Buttons() {
  return (
    <>
      <Examples id="buttons" />
      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['A verb and its object.', 'Create customer, Record payment, Send reminder. The label says what happens when it’s pressed.'],
            ['The question names the thing, and what changes.', '“Void PAY-0921?”, then what follows: INV-1038 goes back to Overdue.'],
            ['The question and its button match.', '“Void PAY-0921?” is answered by Void payment, not Yes.'],
            ['Cancel means nothing happens.', 'Cancel is always the way out, on the left. For unsaved work, Keep editing.'],
            ['Links say where they go.', 'Put the link on the words that name the place: 3 unpaid invoices.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Submit” and “OK”.', 'They say something will happen, but not what.'],
            ['“Are you sure?”', 'It names nothing and doesn’t say what will change, so people click by habit.'],
            ['Yes and No as answers.', 'People have to reread the question to know which one does what.'],
            ['“No” or “Close” for the way out.', 'One escape with three names makes people stop and wonder.'],
            ['“Click here”.', 'Out of its sentence, the link says nothing about where it goes.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
