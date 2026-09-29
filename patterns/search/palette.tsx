import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Ini } from '../../site/kit';
import { InShell, Palette } from './palette-kit';

// The search box and ⌘K: one box in the top bar that finds any record from any page. Where it lives, how it opens,
// and what it shows before anyone types.

export default function SearchBox() {
  return (
    <>
      <Demo wide caption="⌘K, or a click on the box in the top bar, opens search over whatever page people are on. Before they type, it shows what they opened last and the places they go most, so the usual jump is two keys.">
        <InShell>
          <Palette q="" groups={[
            ['Recent', [
              { t: 'Invoice', name: 'INV-1038', facts: 'Metro Fuels · Overdue 26 days · ₱420,000.00', on: true },
              { t: 'Customer', name: 'Metro Fuels', facts: 'Cebu · 3 unpaid invoices' },
              { t: 'Loan', name: 'LN-2207', facts: 'Abad Trucking · ₱2,400,000.00 · Active' },
            ]],
            ['Go to', [
              { t: 'Page', name: 'Invoices › Overdue in Cebu', facts: 'Your saved view · 12' },
              { t: 'Page', name: 'Reports › Collections this month' },
            ]],
          ]} />
        </InShell>
      </Demo>

      <Pair>
        <Demo verdict="do" caption="One box, in the same place on every page, that says what it finds and how to open it from the keyboard.">
          <Win title="Loans OS" className="sr-top">
            <div className="sr-bar"><span className="sr-box"><span className="sr-glass">⌕</span>Search invoices, customers, loans…<kbd>⌘K</kbd></span><span className="sr-me"><span className="as-bell">3</span><Ini n="AR" /></span></div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="A search per module, a menu to choose where to look, and a Go button. People have to know where a record lives before they can find it.">
          <Win title="Loans OS" className="sr-top">
            <div className="sr-bar"><span className="sr-sel">Search in: Module 2 ▾</span><span className="sr-box bad">Enter keyword</span><Btn kind="pri">Go</Btn></div>
          </Win>
        </Demo>
      </Pair>

      <Section title="How it opens">
        <When head={['From', 'What happens']} rows={[
          ['⌘K, or Ctrl K on Windows', 'Opens over the current page, focus in the box. The same keys close it.'],
          ['/ on any page without a field in focus', 'The same.'],
          ['A click on the box in the top bar', 'The same: the box in the bar is a button that opens the palette.'],
          ['Esc, or a click outside', 'Closes it, and puts focus back where it was.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One box, in the top bar, on every page.', 'App shell region 4. It searches the whole system, not the page people are on.'],
            ['Say what it finds.', '“Search invoices, customers, loans…”, the business’s own record types, not “Search…”.'],
            ['Show something before they type.', 'Recent records, then the pages and saved views they use most. Most searches are for something opened today.'],
            ['Results as they type, over the page.', 'From the first two characters, within a quarter of a second, with no Go button. Closing it returns people exactly where they were.'],
            ['The keyboard does everything.', 'Arrows to move, Enter to open, ⌘ Enter for a new tab, Esc to close. ⌘K and / never fire inside a field.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A search per module, or a menu to pick where.', 'People must know where a record lives before they can find it.'],
            ['“Search…” or “Enter keyword”.', 'People can’t tell what the box finds.'],
            ['An empty palette with only a blinking cursor.', 'Even the record opened a minute ago has to be typed out.'],
            ['A Go button and a new page for every query.', 'Each search takes people away from the page they were on.'],
            ['Stealing ⌘K or / while someone is typing in a field.', 'The shortcut opens search instead of typing the character.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
