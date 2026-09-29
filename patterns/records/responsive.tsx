import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pill } from '../../site/kit';
import './foundations.css';

// Built for the desk, works on a phone: tables become cards, filters become a sheet, the primary action stays in reach.

const inv: [string, string, string, string][] = [
  ['INV-1038', 'Metro Fuels', '2 Sep', '₱420,000'],
  ['INV-1044', 'Northstar Supply', '9 Sep', '₱2,940,000'],
  ['INV-1047', 'Pacific Cartons', '12 Sep', '₱318,000'],
];

export default function Responsive() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>At the desk.</b> A table: many columns, compared across rows.</>}>
          <Win title="Invoices">
            <table className="m-tbl">
              <thead><tr><th>Invoice</th><th>Customer</th><th>Due</th><th className="r">Balance</th><th>Status</th></tr></thead>
              <tbody>{inv.map(([n, c, d, b]) => <tr key={n}><td>{n}</td><td>{c}</td><td>{d}</td><td className="r">{b}</td><td><Pill tone="bad">Overdue</Pill></td></tr>)}</tbody>
            </table>
          </Win>
        </Demo>
        <Demo verdict="do" caption={<><b>On a phone.</b> Each row becomes a card with the three facts that matter. Filters open in a sheet; the primary action stays at the bottom, in thumb reach.</>}>
          <div className="rs-phone">
            <p className="rs-h"><b>Invoices</b><span className="rs-f">Filters · 2</span></p>
            {inv.map(([n, c, d, b]) => (
              <div key={n} className="rs-card">
                <p className="m-row"><b>{c}</b><Pill tone="bad">Overdue</Pill></p>
                <p className="m-row rs-sub"><span>{`${n} · due ${d}`}</span><b>{b}</b></p>
              </div>
            ))}
            <span className="rs-cta"><Btn kind="pri">New invoice</Btn></span>
          </div>
        </Demo>
      </Pair>

      <Section title="How each piece adapts">
        <When head={['Piece', 'Desk', 'Phone (under 640 px)']} rows={[
          ['Sidebar', 'Always visible', 'Behind a menu button; the current section named in the top bar'],
          ['Tables', 'Columns', 'Cards with 2 or 3 key fields; tap to open the record'],
          ['Filters', 'Chips above the list', 'A sheet from the bottom, with Apply'],
          ['Drawers', 'From the right, a third of the width', 'Full screen, with a back arrow'],
          ['Dialogs', 'Centred', 'A sheet from the bottom'],
          ['Primary action', 'Top right of the page', 'Fixed at the bottom of the screen'],
          ['Reports', 'The full table', 'The total first, then the table scrolling sideways with the first column fixed'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
        <Rules items={[
          ['Design for the desk, check at 375.', 'Back-office work happens at a desk, so design there first. Then make every screen usable on a phone at 375 px wide.'],
          ['Decide what matters on the small screen.', 'Pick the two or three fields someone needs on the move. The rest is one tap away, on the record.'],
          ['Nothing only on hover.', 'Row actions, tooltips, and previews need a tap equivalent.'],
          ['Keep the primary action in thumb reach.', 'At the bottom, full width or close to it, on phones.'],
          ['Test the three widths.', '375 (phone), 768 (tablet), and 1280 (laptop), plus 200% zoom on the laptop.'],
          ['Some screens are desk-only, and say so.', 'A report builder or a bulk import can show a short note on a phone, with a link to email it to yourself.'],
        ]} />
      </Section>
        <Section title="Avoid">
        <Avoid items={[
          'Squeezing a desktop table onto a phone and calling it responsive.',
          'Horizontal scrolling for the whole page.',
          'Two separate apps for desk and phone. One app, one URL, two layouts.',
        ]} />
      </Section>
      </div>

    </>
  );
}
