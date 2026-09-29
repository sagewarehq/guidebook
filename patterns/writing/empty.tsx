import { Section, Rules, Avoid } from '../../site/kit';
import { Examples } from './writing-kit';

// Empty lists, filters that hide everything, and searches that find nothing, drawn before and after.

export default function EmptyStates() {
  return (
    <>
      <Examples id="empty" />
      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Say why it’s empty, and name what’s missing.', '“No invoices yet.” and “No overdue invoices in Baguio.” need different words.'],
            ['Say what the filters are hiding.', '“31 invoices in Baguio are open or paid.” The list isn’t broken, just filtered.'],
            ['Offer the next step.', 'New invoice or Import for a new list; Clear filters for a filtered one.'],
            ['Help a search that finds nothing.', 'Repeat what was searched, then suggest a fix: check the spelling, or search by invoice number.'],
            ['Keep the page around it.', 'The header, the view tabs, and the filters stay, so people can change them.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“No data” for every empty list.', 'People can’t tell “nothing yet” from “nothing matches”.'],
            ['A filtered list that looks empty.', 'People think the invoices are gone, not hidden.'],
            ['A dead end.', 'With no button, people have to guess where to go next.'],
            ['“0 results”.', 'It doesn’t show what was searched, or what to try instead.'],
            ['Replacing the whole page with the empty state.', 'The filters go with it, so people can’t change them.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
