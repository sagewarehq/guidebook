import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Field labels, help, placeholders, menu items, statuses, and values, drawn before and after.

export default function Labels() {
  return (
    <>
      <Examples id="labels" />
      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Short labels, in the business’s words.', 'TIN, not Cust. TIN No.*. No abbreviations people have to decode.'],
            ['Help says what’s expected, where it comes from.', '“As printed on the BIR certificate: 12 digits.”'],
            ['A placeholder is an example, never the label.', 'Metro Fuels, under a Customer name label.'],
            ['Menu items name what’s inside.', 'Payments, not Transactions.'],
            ['Statuses are words, with the detail that matters.', 'Overdue 26 days, not Status: 2.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Abbreviations and asterisks.', 'People stop to decode the label before they can fill it in.'],
            ['“Enter valid data in the correct format.”', 'It could sit under any field, so it helps with none.'],
            ['“Enter customer name here…” as the only label.', 'It vanishes as people type, and the field loses its name.'],
            ['Umbrella words in the menu.', 'People have to open it to find out what it holds.'],
            ['Status codes and numbers.', 'People have to look them up, and still don’t get the detail they need.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
