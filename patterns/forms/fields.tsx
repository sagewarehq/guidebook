import type { ReactNode } from 'react';
import { Section, Rules, Avoid, When, Field } from '../../site/kit';
import { cx } from '../../lib/cx';
import '../records/foundations.css';
import './forms.css';

// Choosing fields: which element for which kind of data, shown, not told. Each example is drawn as the field
// itself, before and after, grouped by the kind of data. Then a table to look it up, the guidelines, and build notes.

/** One before-and-after pair, each side drawn as a field. Same look as the Writing page. */
function Ex({ where, bad, good }: { where: string; bad: ReactNode; good: ReactNode }) {
  return (
    <figure className="wr-ex">
      <figcaption>{where}</figcaption>
      <div className="wr-sides">
        <div className="wr-side bad"><span className="wr-v">✗ Instead of</span><div className="wr-ui fl-ui">{bad}</div></div>
        <div className="wr-side good"><span className="wr-v">✓ Use</span><div className="wr-ui fl-ui">{good}</div></div>
      </div>
    </figure>
  );
}

/* ---------- field mock-ups ---------- */

const L = ({ label, optional }: { label: string; optional?: boolean }) => <label>{label}{optional && <em> (optional)</em>}</label>;

/** A text input with an optional prefix or suffix, such as ₱ or %. */
const Inp = ({ label, value, pre, suf, right, ph, hint, w }: { label: string; value?: string; pre?: string; suf?: string; right?: boolean; ph?: boolean; hint?: string; w?: string }) => (
  <div className="m-field" style={{ width: w }}>
    <L label={label} />
    <span className={cx('m-in fl-aff', ph && 'ph')}>{pre && <i className="fl-pre">{pre}</i>}<span className={cx('fl-v', right && 'r')}>{value}</span>{suf && <i className="fl-suf">{suf}</i>}</span>
    {hint && <p className="m-hint">{hint}</p>}
  </div>
);

/** Radio buttons, stacked or in a row. */
const Radios = ({ label, opts, on, row }: { label: string; opts: string[]; on?: string; row?: boolean }) => (
  <div className="m-field"><L label={label} />
    <div className={cx('fl-radios', row && 'row')}>{opts.map(o => <span key={o} className={cx('fl-radio', o === on && 'on')}><i />{o}</span>)}</div>
  </div>
);

/** A select, open, showing its options. */
const OpenSel = ({ label, value, opts }: { label: string; value: string; opts: string[] }) => (
  <div className="m-field"><L label={label} />
    <span className="m-in focus">{value}<i>▴</i></span>
    <div className="fl-menu">{opts.map((o, i) => <p key={o} className={cx(o === value && 'on', i > 5 && 'fade')}>{o}</p>)}</div>
  </div>
);

/** A lookup: type to search records, with what tells them apart. */
const Lookup = () => (
  <div className="m-field"><L label="Customer" />
    <span className="m-in focus">metro<b className="fl-caret" /></span>
    <div className="fl-menu look">
      <p className="on"><b>Metro Fuels</b><small>TIN 204-311-580-000 · Cebu</small></p>
      <p><b>Metro Fuels Trading</b><small>TIN 118-902-447-000 · Baguio</small></p>
      <p><b>Metrobuild Supply</b><small>TIN 330-118-205-000 · Cebu</small></p>
      <p className="fl-new">+ New customer “metro”</p>
    </div>
  </div>
);

const Chips = ({ label, items }: { label: string; items: string[] }) => (
  <div className="m-field"><L label={label} />
    <span className="m-in fl-chips">{items.map(x => <span key={x} className="fl-chip">{x} <i>×</i></span>)}<span className="fl-add">Add…</span></span>
  </div>
);

const Check = ({ label, on, hint }: { label: string; on?: boolean; hint?: string }) => (
  <div className="m-field"><span className="fl-check"><i className={cx(on && 'on')}>{on && '✓'}</i>{label}</span>{hint && <p className="m-hint fl-ind">{hint}</p>}</div>
);

const Toggle = ({ label, on, hint }: { label: string; on?: boolean; hint?: string }) => (
  <div className="m-field fl-trow"><span><b>{label}</b>{hint && <small>{hint}</small>}</span><i className={cx('fl-tog', on && 'on')} /></div>
);

const Area = ({ label, text, optional }: { label: string; text: string; optional?: boolean }) => (
  <div className="m-field"><L label={label} optional={optional} /><span className="m-in fl-area">{text}</span></div>
);

const Drop = () => (
  <div className="m-field"><L label="Signed contract" />
    <div className="fl-drop"><b>Drop the file here, or <a className="m-link">browse</a></b><small>PDF or a photo, up to 10 MB</small></div>
    <p className="fl-file"><span>▤</span><b>Contract-MetroFuels.pdf</b><small>1.2 MB</small><a>Remove</a></p>
  </div>
);

const Native = ({ label }: { label: string }) => (
  <div className="m-field"><L label={label} /><span className="fl-native"><span className="fl-nbtn">Choose File</span> No file chosen</span></div>
);

/** A select that isn't open. */
const Sel = ({ label, value, w }: { label: string; value: string; w?: string }) => <div style={{ width: w }}><Field label={label} value={value} select /></div>;

/** Three day, month, year selects in a row. */
const Dmy = ({ label, v }: { label: string; v: [string, string, string] }) => (
  <div className="m-field"><L label={label} /><span className="fl-dmy">{v.map((x, i) => <span key={i} className="m-in">{x}<i>▾</i></span>)}</span></div>
);

const DateIn = ({ label, value, open }: { label: string; value: string; open?: boolean }) => (
  <div className="m-field"><L label={label} />
    <span className={cx('m-in', open && 'focus')}>{value}<i>▦</i></span>
    {open && (
      <div className="fl-cal">
        <p className="fl-cal-h"><span>‹</span><b>September 2026</b><span>›</span></p>
        <p className="fl-cal-g">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <small key={i}>{d}</small>)}{Array.from({ length: 30 }, (_, i) => i + 1).map(d => <i key={d} className={cx(d === 28 && 'on', d === 30 && 'due')}>{d}</i>)}</p>
      </div>
    )}
  </div>
);

const Range = () => (
  <div className="m-field"><L label="Period" />
    <span className="fl-range"><span className="m-in">1 Jan 2026</span><em>to</em><span className="m-in">28 Sep 2026</span></span>
    <span className="fl-presets">{['This month', 'Last month', 'This quarter', 'Year to date'].map(x => <i key={x} className={cx(x === 'Year to date' && 'on')}>{x}</i>)}</span>
  </div>
);

/* ---------- the examples ---------- */

const groups: [string, string, [string, ReactNode, ReactNode][]][] = [
  ['Choosing one', 'How many options there are decides the element.', [
    ['Two to five options, each worth reading',
      <Sel label="Collateral" value="Choose…" />,
      <Radios label="Collateral" opts={['None', 'Vehicle', 'Real estate', 'Deposit']} on="Vehicle" />],
    ['Two options, short, side by side',
      <Sel label="Borrower type" value="Individual" />,
      <Radios label="Borrower type" opts={['Individual', 'Business']} on="Business" row />],
    ['Six to about fifteen options',
      <Radios label="Branch" opts={['Baguio', 'Cebu', 'Davao', 'Iloilo', 'Makati', 'Pampanga', 'Quezon City', '…and 5 more']} on="Cebu" />,
      <OpenSel label="Branch" value="Cebu" opts={['Baguio', 'Cebu', 'Davao', 'Iloilo', 'Makati', 'Pampanga', 'Quezon City']} />],
    ['Another record: a customer, a loan, an invoice',
      <OpenSel label="Customer" value="Metro Fuels" opts={['A&J Hardware', 'Abad Trucking', 'Acosta Farms', 'Alba Rice Mill', 'Aling Nena’s', 'Amihan Foods', 'Anchor Feeds']} />,
      <Lookup />],
  ]],
  ['Choosing several', 'Show what’s picked, and make each one easy to remove.', [
    ['A few from a short, fixed list',
      <Sel label="Notify by" value="Email, SMS" />,
      <div className="m-field"><L label="Notify by" /><div className="fl-checks"><Check label="Email" on /><Check label="SMS" on /><Check label="Viber" /></div></div>],
    ['Any number from a long list',
      <div className="m-field"><L label="Branches" /><div className="fl-listbox">{['Baguio', 'Cebu', 'Davao', 'Iloilo', 'Makati'].map(b => <p key={b} className={cx((b === 'Cebu' || b === 'Davao') && 'on')}>{b}</p>)}</div><p className="m-hint">Hold Ctrl to select more than one.</p></div>,
      <Chips label="Branches" items={['Cebu', 'Davao']} />],
  ]],
  ['Yes or no', 'A checkbox saves with the form. A switch takes effect at once. Radio buttons when neither answer is the default.', [
    ['A yes-or-no that saves with the form',
      <Toggle label="Email statements monthly" />,
      <Check label="Email statements monthly" on hint="Sent on the 1st, to Joy Santos." />],
    ['A setting that applies at once, no Save button',
      <><Check label="Two-step sign-in" on /><span className="m-btn sec">Save</span></>,
      <Toggle label="Two-step sign-in" on hint="On. Asked for at every new device." />],
    ['A question that must be answered',
      <Check label="Self-employed" />,
      <Radios label="Is the borrower self-employed?" opts={['Yes', 'No']} row />],
  ]],
  ['Numbers', 'Money, rates, and counts are numbers. IDs that are made of digits are text.', [
    ['Money',
      <Inp label="Loan amount" value="1180000" />,
      <Inp label="Loan amount" pre="₱" value="1,180,000.00" right hint="Up to ₱2,000,000 for this customer." />],
    ['A rate',
      <Inp label="Interest" value="0.125" />,
      <Inp label="Interest" value="12.5" suf="% a year" right w="60%" />],
    ['A number made of digits: a TIN, a phone, an account',
      <Inp label="TIN" value="204311580000" suf="⇅" />,
      <Inp label="TIN" value="204-311-580-000" hint="12 digits, as on the BIR certificate." />],
    ['A phone number',
      <Inp label="Mobile" value="09177180420" />,
      <Inp label="Mobile" pre="+63" value="917 718 0420" />],
    ['A count or a term',
      <Inp label="Term" value="12" />,
      <Inp label="Term" value="12" suf="months" right w="60%" />],
  ]],
  ['Dates', 'Near today: a calendar. Far from today: type it.', [
    ['A date close to today',
      <Dmy label="Release date" v={['28', 'Sep', '2026']} />,
      <DateIn label="Release date" value="28 Sep 2026" open />],
    ['A date years away: birth, registration',
      <DateIn label="Date of birth" value="Pick a date" />,
      <div className="m-field"><L label="Date of birth" /><span className="fl-dmy typed"><span className="m-in">14</span><span className="m-in">March<i>▾</i></span><span className="m-in">1986</span></span></div>],
    ['A period, for a report or a filter',
      <><DateIn label="From" value="01/01/2026" /><DateIn label="To" value="09/28/2026" /></>,
      <Range />],
  ]],
  ['Text', 'Size the box to the answer.', [
    ['A name or a reference',
      <Area label="Customer name" text="Metro Fuels" />,
      <Inp label="Customer name" value="Metro Fuels" w="80%" />],
    ['A note, a reason, a description',
      <Inp label="Reason for write-off" value="Customer closed the Cebu depot in Aug…" />,
      <Area label="Reason for write-off" text="Customer closed the Cebu depot in August. Two calls and a letter, no reply. Legal advises against filing." />],
    ['An email address',
      <Inp label="Email" value="joy.santos@metrofuels" hint="Invalid input." />,
      <Field label="Email" value="joy.santos@metrofuels" error="That address is missing its ending, such as .com or .ph." />],
  ]],
  ['Files', 'Say what’s wanted, what’s accepted, and show what arrived.', [
    ['Attaching a document', <Native label="Signed contract" />, <Drop />],
  ]],
];

export default function Fields() {
  return (
    <>
      {groups.map(([name, lede, items]) => (
        <Section key={name} title={name}>
          <p>{lede}</p>
          <div className="wr-grid">{items.map(([w, a, b]) => <Ex key={w} where={w} bad={a} good={b} />)}</div>
        </Section>
      ))}

      <Section title="Look it up">
        <When head={['The data', 'Use', 'Not']} rows={[
          ['One of 2 to 5 options', 'Radio buttons, all visible', 'A select that hides them'],
          ['One of 6 to about 15', 'A select', 'A wall of radio buttons'],
          ['One of many, or another record', 'A lookup: type to search, with what tells records apart', 'A select with hundreds of options'],
          ['Several from a few', 'Checkboxes', 'A multi-select list'],
          ['Several from many', 'A lookup that adds chips', 'Ctrl-click lists'],
          ['Yes or no, saved with the form', 'A checkbox, worded so ticked means yes', 'A switch'],
          ['Yes or no, applied at once', 'A switch', 'A checkbox and a Save button'],
          ['Yes or no, must be answered', 'Two radio buttons, neither picked', 'A checkbox, where blank could mean no or not asked'],
          ['Money', '₱ before, two decimals, right-aligned, grouped as they type', 'A bare number box'],
          ['A rate or a count', 'A number with its unit after: %, months, units', 'A decimal like 0.125'],
          ['Digits that aren’t a number', 'Text, formatted as it’s written: TIN, phone, account', 'A number input with arrows'],
          ['A date near today', 'A date field with a calendar', 'Three selects'],
          ['A date far from today', 'Typed day, month, year', 'A calendar that starts at today'],
          ['A period', 'From and to together, with presets', 'Two unrelated date fields'],
          ['A short answer', 'A text field sized to it', 'A box the full page wide for a 4-digit code'],
          ['A long answer', 'A text area, a few lines tall, that grows', 'One line that scrolls sideways'],
          ['A file', 'A drop area that says what’s accepted, then the file with Remove', 'The browser’s bare file button'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Show options when there are few.', 'Radio buttons and checkboxes let people compare without opening anything.'],
            ['Search records, don’t scroll them.', 'A lookup that shows what tells them apart: TIN, branch, amount. “+ New customer” when it doesn’t exist yet.'],
            ['Say the unit.', '₱ before money, % or months after. The value alone is ambiguous.'],
            ['Format as they type, accept how they type.', 'Group ₱1,180,000 and TIN digits as they go; accept spaces, dashes, and pasted text.'],
            ['Size the box to the answer.', 'A field’s width hints at what goes in it: a TIN box is short, a notes box is wide and tall.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A select for yes or no, or with one option.', 'It hides the choice behind a click.'],
            ['A select with hundreds of customers.', 'People scroll, and can’t tell Metro Fuels from Metro Fuels Trading.'],
            ['A bare number box for money or a rate.', 'People can’t tell whether 0.125 is a rate or 1180000 is in pesos.'],
            ['type="number" for IDs, phones, and TINs.', 'It drops leading zeros and adds arrows.'],
            ['Every box the full page wide.', 'A 4-digit code in a page-wide box gives no hint of what goes in it.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
