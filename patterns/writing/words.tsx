import { Section, When } from '../../site/kit';

// One word for one thing: the words we use on screen, and the ones we don't.

export default function Words() {
  return (
    <>
      <Section title="Say, not">
        <When head={['Say', 'Not']} rows={[
          ['Archive, for a record finished with; Deactivate, for a person who left', 'Delete, for either: Delete sends a record to the Trash, and people are never deleted'],
          ['Void', 'Delete, for money records'],
          ['Sign in, sign out', 'Log in, log on, logout'],
          ['Customer, Invoice, Payment', 'Entity, Object, Item, Record (on screen)'],
          ['Can’t', 'Unable to, Not permitted to'],
          ['Try again', 'Retry, Resubmit'],
        ]} />
      </Section>

    </>
  );
}
