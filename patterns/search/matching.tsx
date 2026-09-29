import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { Palette, M } from './palette-kit';

// What global search matches: whatever people remember about a record. A number, part of a name, a TIN, an amount,
// a contact, or a typo. What each kind of query finds, and how results are ranked.

export default function Matching() {
  return (
    <>
      <Pair>
        <Demo caption={<><b>A record number.</b> An exact number goes first, and Enter opens it. Without the prefix, too: 1038 finds INV-1038.</>}>
          <Palette q="1038" hint={false} groups={[
            ['Invoices', [{ t: 'Invoice', name: <>INV-<M>1038</M></>, facts: 'Metro Fuels · Overdue 26 days · ₱420,000.00', on: true }]],
            ['Payments', [{ t: 'Payment', name: 'PAY-0921', facts: <>Against INV-<M>1038</M> · ₱760,000.00</> }]],
          ]} />
        </Demo>
        <Demo caption={<><b>A typo.</b> Close spellings still match, and the palette says what it matched.</>}>
          <Palette q="metro fule" hint={false} groups={[
            ['Customers', [{ t: 'Customer', name: <><M>Metro Fuel</M>s</>, facts: 'Cebu · 3 unpaid invoices', on: true }]],
          ]} foot={<>Showing results for <b>metro fuel</b></>} />
        </Demo>
        <Demo caption={<><b>An amount.</b> Money typed any way, 420000, 420,000, or ₱420k, finds the records with that amount.</>}>
          <Palette q="420000" hint={false} groups={[
            ['Invoices', [
              { t: 'Invoice', name: 'INV-1038', facts: <>Balance <M>₱420,000.00</M> · Metro Fuels</>, on: true },
              { t: 'Invoice', name: 'INV-0954', facts: <>Total <M>₱420,000.00</M> · Amihan Foods · Paid</> },
            ]],
          ]} />
        </Demo>
        <Demo caption={<><b>A person.</b> A contact’s name finds the contact, and the customer they belong to.</>}>
          <Palette q="joy" hint={false} groups={[
            ['Contacts', [{ t: 'Contact', name: <><M>Joy</M> Santos</>, facts: 'Metro Fuels · Accounts payable', on: true }]],
            ['Customers', [{ t: 'Customer', name: 'Metro Fuels', facts: <>Contact: <M>Joy</M> Santos</> }]],
          ]} />
        </Demo>
      </Pair>

      <Section title="What each query finds">
        <When head={['People type', 'It finds', 'Matched on']} rows={[
          ['INV-1038, 1038, inv1038', 'INV-1038, first, and opens on Enter', 'Record numbers, with or without prefix, spaces, or dashes'],
          ['metro', 'Metro Fuels, Metro Fuels Trading, Metrobuild Supply', 'The start of any word in a name'],
          ['metro fule', 'Metro Fuels, with “Showing results for metro fuel”', 'Close spellings, when nothing matches exactly'],
          ['204-311-580', 'Metro Fuels', 'TINs, phone numbers, and account numbers, digits only'],
          ['PO-2211, DR-5530', 'INV-1038, and the purchase order and delivery themselves', 'References on other records'],
          ['420000, ₱420k', 'INV-1038, INV-0954', 'Totals and balances, typed any way'],
          ['joy santos', 'Joy Santos, and Metro Fuels', 'Contacts, and the records they belong to'],
          ['GAB 4721', 'LN-2207, the loan it secures', 'Collateral: plate numbers, title numbers'],
        ]} />
      </Section>

      <Section title="In what order">
        <Rules items={[
          ['Exact numbers first.', 'A query that is a record’s number puts that record at the top, alone, ready for Enter.'],
          ['Then starts of names.', 'Metro Fuels before Petro-Metro Supply.'],
          ['Then what’s open and recent.', 'Unpaid before paid, active before closed, this year before last. Inactive records last, marked Inactive.'],
          ['Then what this person touches.', 'Their branch, and records they opened lately, rank higher.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Search what people remember.', 'Numbers, names, references, amounts, contacts, plates. In System Analysis, ask staff how they look things up today, and index that.'],
            ['Match the start of any word.', '“metro” finds Metro Fuels, Metro Fuels Trading, and Metrobuild Supply.'],
            ['Forgive formatting.', 'Ignore case, spaces, dashes, prefixes, commas, and the ₱ sign.'],
            ['Say when it guessed.', '“Showing results for metro fuel” when it corrected a typo, so nobody trusts a wrong match.'],
            ['Same matching everywhere.', 'The global search, a list’s search box, and a lookup field match the same way.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Searching notes and long text by default.', 'They flood the results. Offer them on the All results page.'],
            ['Matching only whole words, or only the start of the whole name.', 'People must type the name exactly as it was saved.'],
            ['A search that needs the exact prefix.', 'INV-1038 is found, 1038 isn’t.'],
            ['Correcting a typo silently.', 'People trust a wrong match without knowing it was a guess.'],
            ['A different search in each box.', 'A lookup misses what the global search finds, and people stop trusting either.'],
          ]} />
        </Section>
      </div>

    </>
  );
}
