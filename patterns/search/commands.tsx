import { Section, Demo, Pair, Rules, Avoid } from '../../site/kit';
import { Palette, M } from './palette-kit';

// Commands in the same box: create records, go to pages, and act on a record by typing what you want to do.

export default function Commands() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>Create.</b> “new inv” offers New invoice. Commands sit above records when the words are a verb.</>}>
          <Palette q="new inv" hint={false} groups={[
            ['Create', [
              { t: 'New', name: <><M>New inv</M>oice</>, on: true, key: '↵' },
            ]],
            ['Invoices', [{ t: 'Invoice', name: <><M>INV</M>-1072</>, facts: 'Metro Fuels · Open · ₱538,000.00' }]],
          ]} />
        </Demo>
        <Demo caption={<><b>Act on a record.</b> “pay 1038” offers Record payment on INV-1038, with its balance.</>}>
          <Palette q="pay 1038" hint={false} groups={[
            ['Actions', [
              { t: 'Action', name: <>Record <M>pay</M>ment on INV-<M>1038</M></>, facts: 'Metro Fuels · ₱420,000.00 owing', on: true },
              { t: 'Action', name: <>Send <M>pay</M>ment reminder for INV-<M>1038</M></>, facts: 'To Joy Santos' },
            ]],
            ['Payments', [{ t: 'Payment', name: 'PAY-0921', facts: 'Against INV-1038 · ₱760,000.00' }]],
          ]} />
        </Demo>
        <Demo caption={<><b>Go to.</b> “rep coll” finds a page or a saved report, not just records.</>}>
          <Palette q="rep coll" hint={false} groups={[
            ['Go to', [
              { t: 'Report', name: <><M>Coll</M>ections this month</>, facts: 'Saved by Ramon · emailed Mondays', on: true },
              { t: 'Page', name: <><M>Rep</M>orts</> },
            ]],
          ]} />
        </Demo>
        <Demo caption={<><b>Not allowed.</b> A command someone can’t use doesn’t appear. Ana, in Collections, typing “void” sees no Void payment.</>}>
          <Palette q="void" hint={false} groups={[
            ['Payments', [{ t: 'Payment', name: 'PAY-0877', facts: <>Status: <M>Void</M>ed · 12 Aug 2026</> }]],
          ]} foot={<span>No actions match. Voiding payments is for Finance.</span>} />
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['The same words as the buttons.', 'A command is named exactly like the button that does it: Record payment, New invoice. One word for one thing.'],
            ['Commands open the same screen.', 'Record payment opens the same drawer as the button on INV-1038. The palette is a shortcut, never a second way to do it.'],
            ['Verbs first, then records.', 'When the query starts with a verb (new, record, send, go), show commands first; otherwise records first.'],
            ['Only what this person can do.', 'Commands follow the role, like the buttons. If it’s hidden on the page, it’s hidden here.'],
            ['Nothing destructive runs from the box.', 'Void and Delete open their confirmation, as they would from the page.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Command names that differ from the buttons.', 'People type the word they see on the page, and the palette doesn’t know it.'],
            ['A shorter form of its own in the palette.', 'It skips the checks the real screen makes, and behaves differently.'],
            ['A special syntax, like “>” or “/cmd”.', 'People must learn it first. Plain words are enough.'],
            ['Commands people can’t use.', 'Ana picks Void payment, and hits an error instead of never seeing it.'],
            ['Commands that act without opening anything.', 'A void runs with no way to check first.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
