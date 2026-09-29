import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Error messages, drawn before and after: fields, the server, permissions, signing in, and colleagues.

export default function Errors() {
  return (
    <>
      <Examples id="errors" />
      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['What’s wrong, then how to fix it.', 'In one or two short sentences, in that order.'],
            ['Never blame the person.', '“A TIN has 12 digits. This one has 8.”'],
            ['Say what was kept.', 'When saving fails, say their changes are still there, and offer Try again.'],
            ['Say who can.', 'When something isn’t allowed, name the role or person who can do it.'],
            ['No codes on screen.', '500, 403, and exception names go in the logs, with a reference people can quote to support.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Invalid input.”', 'It says something is wrong, but not what, or what to do.'],
            ['“You entered an invalid TIN.”', 'It puts the fault on the person, and still doesn’t say what a TIN needs.'],
            ['Failing without saying what was kept.', 'People assume their work is lost, and type it all again.'],
            ['A “no” with no one to ask.', 'People hit a wall and don’t know who can help.'],
            ['“Error 500: Internal Server Error”.', 'It means nothing to the reader, and gives support nothing to trace.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
