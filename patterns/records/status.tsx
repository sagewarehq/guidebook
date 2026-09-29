import { Section, Demo, Pair, Rules, Avoid, When, Win, Pill } from '../../site/kit';
import './foundations.css';

// One set of status pills, the same everywhere: words first, colour second, and only three tones.

const rows: [string, string, string, 'ok' | 'bad' | 'off' | undefined][] = [
  ['INV-1038', 'Metro Fuels', '₱420,000', 'bad'],
  ['INV-1041', 'Island Grains', '₱0', 'ok'],
  ['INV-1044', 'Northstar Supply', '₱1,200,000', undefined],
  ['INV-1036', 'Pacific Cartons', '₱0', 'off'],
];
const label = { bad: 'Overdue', ok: 'Paid', off: 'Void' } as const;

export default function Status() {
  return (
    <>
      <Pair>
        <Demo verdict="do" caption="Each status is a word, and the colour only backs it up. Red for what needs attention, green for done, grey for everything in between, an outline for what’s no longer active.">
          <Win title="Invoices">
            <table className="m-tbl">
              <thead><tr><th>Invoice</th><th>Customer</th><th className="r">Balance</th><th>Status</th></tr></thead>
              <tbody>
                {rows.map(([n, c, b, t]) => (
                  <tr key={n}><td>{n}</td><td>{c}</td><td className="r">{b}</td><td><Pill tone={t}>{t ? label[t] : 'Partial'}</Pill></td></tr>
                ))}
              </tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="Colour alone: people who can’t tell red from green, and everyone printing in black and white, lose the meaning. Five colours for five statuses means nothing stands out.">
          <Win title="Invoices">
            <table className="m-tbl">
              <thead><tr><th>Invoice</th><th>Customer</th><th className="r">Balance</th><th /></tr></thead>
              <tbody>
                {rows.map(([n, c, b], i) => (
                  <tr key={n}><td>{n}</td><td>{c}</td><td className="r">{b}</td><td><i className={`st-dot c${i}`} /></td></tr>
                ))}
              </tbody>
            </table>
          </Win>
        </Demo>
      </Pair>

      <Section title="The tones">
        <When head={['Tone', 'Means', 'Examples']} rows={[
          [<Pill tone="bad">Needs attention</Pill>, 'Someone should act on it.', 'Overdue, Held, Failed, Rejected'],
          [<Pill>In progress</Pill>, 'Normal, and still moving.', 'Draft, Open, Partial, Pending approval, Scheduled'],
          [<Pill tone="ok">Done</Pill>, 'Finished, and finished well.', 'Paid, Approved, Released, Active'],
          [<Pill tone="off">Inactive</Pill>, 'No longer counts.', 'Void, Archived, Expired, Deactivated'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Words first, colour second.', 'The pill always carries its word. Colour is there to scan by, never the only signal.'],
          ['Four tones, no more.', 'Needs attention, in progress, done, inactive. A status picks its tone by what it asks of the reader.'],
          ['One word, maybe two.', '“Overdue”, “Pending approval”. The detail goes beside it: “Overdue 26 days”.'],
          ['The same status looks the same everywhere.', 'List, detail, board, report, and email. Define each status once, with its word and tone.'],
          ['Few statuses per record type.', 'Six at most. More than that is a stage (see Board views) or a second field.'],
          ['Calculated statuses say so.', 'Where a status is worked out, not chosen (Paid, Overdue), don’t offer to change it. Show what it came from.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'Coloured dots or row backgrounds with no word.',
          'A new colour for every status.',
          'Red for anything that isn’t a problem: Void is inactive, not an error.',
          'A status dropdown on a record whose status is calculated.',
        ]} />
      </Section>
      </div>

    </>
  );
}
