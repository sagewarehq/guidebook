import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// The voice every screen shares: the rules behind all the examples in this chapter, what to avoid, and where copy lives.

export default function Voice() {
  return (
    <>
      <Examples pick={[['buttons', 1], ['errors', 1], ['empty', 1], ['feedback', 2]]} />
      <p className="wr-more">One from each page in this chapter. Each page has the full set.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Use the business’s words.', 'The names from System Analysis: Loan release, not Disbursement entity. One word for one thing, everywhere.'],
            ['Buttons say what happens.', 'A verb and its object: Record payment, Archive customer. The button label answers the question above it.'],
            ['Errors say what’s wrong, how to fix it, and who can.', '“You can’t void payments. Finance can.” Never blame the person.'],
            ['Name the thing and the count.', '“Void PAY-0921? INV-1038 goes back to Overdue.” “18 reminders sent. 2 customers have no email.” Specifics are what people check.'],
            ['Short, plain, and calm.', 'Cut it in half, then check it still says what it must. Sentence case, and figures for numbers: 3 unpaid invoices.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Jargon and codes: null, invalid, exception, 422, UUID.', 'People have to translate them before they can act.'],
            ['Yes, No, OK, and Submit.', 'People have to reread the question to know what each one does.'],
            ['“Oops” and “Please”.', 'Be polite by being clear. Neither says what’s wrong or what to do.'],
            ['“Are you sure?” and “Success!”', 'People can’t check what the message doesn’t name.'],
            ['Exclamation marks, Title Case, and ALL CAPS.', 'Emphasis everywhere reads as noise, and slows reading.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
