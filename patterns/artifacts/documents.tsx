import { Section, Demo, Rules, Avoid, When, Pin } from '../../site/kit';
import { Doc, Lines } from './doc-kit';
import './artifacts.css';

// Documents (DOCX, PDF): what a good generated document looks like, its anatomy, the kinds a management system
// makes, and more worked examples. Every one is generated from a record, in the client's name.

export default function Documents() {
  return (
    <>
      <Demo wide caption="A statement of account for Metro Fuels, generated from its record. Numbered to match the parts below.">
        <Doc pins title="Statement of account" meta={['ST-2026-09-0412', '28 Sep 2026', 'Period: 1 to 28 Sep 2026']}
          to={<><b>Metro Fuels</b><span>Attention: Joy Santos, Accounts payable</span><span>Cebu · TIN 204-311-580-000 · Terms: Net 30</span></>}>
          <Lines head={['Invoice', 'Issued', 'Due', 'Balance']} rows={[
            ['INV-1038', '3 Aug 2026', '2 Sep 2026 · 26 days overdue', '₱420,000.00'],
            ['INV-1061', '2 Sep 2026', '2 Oct 2026', '₱684,000.00'],
            ['INV-1072', '14 Sep 2026', '14 Oct 2026', '₱538,000.00'],
          ]} total={['Total owing', '', '', '₱1,642,000.00']} />
          <div className="dc-rel"><Pin n={5} className="dc-pin" /><p className="dc-note">Please pay by bank transfer to BDO, Metro Lending, account ••4471, quoting ST-2026-09-0412. Questions: Ana Reyes, Collections, (032) 410 2200.</p></div>
        </Doc>
      </Demo>

      <Section title="Anatomy">
        <When head={['', 'Part', 'What goes there']} rows={[
          [<Pin n={1} />, 'Title, number, and date', 'Top left: what it is, its own number, and the date. Plus the period or reference it covers.'],
          [<Pin n={2} />, 'Branding', 'Top right: the client’s logo and name, address, and TIN. Nothing of ours.'],
          [<Pin n={3} />, 'Who it’s for', 'The customer’s name, the person it’s addressed to, and the details that identify them.'],
          [<Pin n={4} />, 'The body', 'The lines it’s made from, in a table that lines up, with the total ruled at the foot.'],
          [<Pin n={5} />, 'What to do next', 'How to pay, who to ask, or what to sign, with the document’s number to quote.'],
          [<Pin n={6} />, 'Footer', 'The client’s contact line on the left; what generated it, when, and the page number on the right.'],
        ]} />
      </Section>

      <Section title="More examples">
        <div className="dc-grid">
          <Demo caption={<><b>Invoice.</b> Lines, VAT, and the total, with the customer’s PO and the due date where they’ll look for them.</>}>
            <Doc small title="Invoice" meta={['INV-1038', 'Issued 3 Aug 2026', 'Due 2 Sep 2026 · Net 30']} to={<><b>Metro Fuels</b><span>PO-2211 · TIN 204-311-580-000</span></>}>
              <Lines head={['Description', '₱ Amount']} rows={[['Fleet financing charges, August 2026', '1,003,571.43'], ['Processing fee', '50,000.00']]} />
              <p className="dc-sums"><span>Subtotal</span><span>1,053,571.43</span><span>VAT, 12%</span><span>126,428.57</span><span className="t">Total due</span><span className="t">₱1,180,000.00</span></p>
            </Doc>
          </Demo>
          <Demo caption={<><b>Official receipt.</b> The amount in figures and in words, what it paid, and how it was paid.</>}>
            <Doc small title="Official receipt" meta={['OR-CEB-0921', '18 Sep 2026']} to={<><b>Received from Metro Fuels</b><span>TIN 204-311-580-000</span></>}>
              <p>The sum of <b>seven hundred sixty thousand pesos</b> (<b>₱760,000.00</b>), in part payment of <b>INV-1038</b>.</p>
              <p className="dc-sums"><span>Paid by</span><span>Bank transfer, BDO</span><span>Reference</span><span>PAY-0921</span><span className="t">Balance on INV-1038</span><span className="t">₱420,000.00</span></p>
              <p className="dc-sign"><i /><b>Ana Reyes</b><span>Collections, Cebu branch</span></p>
            </Doc>
          </Demo>
          <Demo caption={<><b>Amortization schedule.</b> Every payment, with its date, split, and running balance, totalled at the foot.</>}>
            <Doc small title="Amortization schedule" meta={['LN-2231', 'Released 28 Sep 2026', '24 months']} to={<><b>Abad Trucking</b><span>Loan of ₱2,400,000.00 · approved by Liza Tan</span></>}>
              <Lines head={['#', 'Due', '₱ Principal', '₱ Interest', '₱ Balance']} rows={[
                ['1', '28 Oct 2026', '100,000.00', '18,400.00', '2,300,000.00'],
                ['2', '28 Nov 2026', '100,000.00', '18,400.00', '2,200,000.00'],
                ['3', '28 Dec 2026', '100,000.00', '18,400.00', '2,100,000.00'],
                [<span className="dc-more">…</span>, '', '', '', ''],
                ['24', '28 Sep 2028', '100,000.00', '18,400.00', '0.00'],
              ]} total={['', 'Total', '2,400,000.00', '441,600.00', '']} />
            </Doc>
          </Demo>
          <Demo caption={<><b>Demand letter.</b> A letter, not a table: the date, who it’s to, what’s owed, by when, and who signs it.</>}>
            <Doc small title="Notice of overdue balance" meta={['DL-2026-0087', '28 Sep 2026']} to={<><b>Joy Santos</b><span>Accounts payable, Metro Fuels, Cebu</span></>}>
              <p>Dear Ms. Santos,</p>
              <p>Our records show <b>₱420,000.00</b> still owing on <b>INV-1038</b>, due on 2 Sep 2026 and now 26 days overdue.</p>
              <p>Please settle the balance by <b>5 Oct 2026</b>, or call us to agree a payment plan.</p>
              <p className="dc-sign"><i /><b>Liza Tan</b><span>Branch manager, Cebu</span></p>
            </Doc>
          </Demo>
        </div>
      </Section>

      <Section title="What a management system generates">
        <When head={['Document', 'Made from', 'Format']} rows={[
          ['Invoice, credit note', 'Issuing an invoice, or crediting one', 'PDF'],
          ['Official receipt', 'Recording a payment', 'PDF'],
          ['Statement of account', 'A customer, for a period, or the monthly schedule', 'PDF'],
          ['Quotation, proposal', 'A quote, before it becomes an order', 'PDF, or DOCX to negotiate'],
          ['Loan agreement, contract', 'Approving a loan or signing a customer', 'DOCX to edit, then the signed PDF'],
          ['Disclosure statement, amortization schedule', 'Releasing a loan', 'PDF'],
          ['Demand letter, reminder', 'An overdue invoice, or a batch of them', 'PDF'],
          ['Payment voucher, remittance advice', 'A payment run, for each supplier', 'PDF'],
          ['Certificate of full payment', 'Closing a loan', 'PDF'],
        ]} />
      </Section>

      <Section title="PDF or DOCX">
        <When head={['Use', 'For']} rows={[
          ['PDF', 'Anything sent, filed, or printed. It looks the same everywhere and can’t be changed by accident.'],
          ['DOCX', 'Only when a person must edit it first, such as a contract the other side negotiates. The final is saved back as PDF.'],
        ]} />
      </Section>

      <p className="g-see">The business sets up the parts it can change in System settings: <a className="m-link" href="#/management/settings/templates">Headers and footers</a>, and each document’s <a className="m-link" href="#/management/settings/numbering">Numbering</a>.</p>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Generated from the record.', 'A template fills in the customer, lines, and totals, so the document and the system always agree.'],
            ['In the client’s name.', 'Their logo, name, address, and TIN top right; their contact line in the footer.'],
            ['Numbered, dated, and traceable.', 'Its own number and date top left, and a footer that says what generated it, and when.'],
            ['Say what to do next.', 'How to pay, who to ask, or what to sign, with the number to quote.'],
            ['The same layout for every document.', 'Title top left, branding top right, footer at the foot: an invoice and a letter look like one company.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Documents typed up by hand.', 'They drift from the system, and mistakes slip in.'],
            ['Our branding, or none.', 'The client’s customers get paperwork that doesn’t look like it came from their supplier.'],
            ['Documents with no number or date.', 'Nobody can tell two statements apart, or which one was paid.'],
            ['A statement with no way to pay.', 'The customer has to call to ask where to send the money.'],
            ['A different look for every document.', 'Each was built separately, and the set looks like it came from five companies.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
