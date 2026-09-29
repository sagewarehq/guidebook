import { Section, Demo, Rules, Avoid, When, Btn, Pill, Field } from '../../site/kit';
import { Frame, DetailPage } from '../shell/shell-kit';
import { Doc, Lines } from '../artifacts/doc-kit';
import '../records/foundations.css';
import '../forms/forms.css';
import '../shell/shell.css';
import '../artifacts/artifacts.css';

// Headers and footers: one template per record type (invoice, statement, receipt), with a layout we fix. What the business controls is
// deliberately small: its logo, and reusable footers (payment instructions, terms, notes) that can be stacked on any
// record and set as defaults per customer. Always with a preview.

const footers: [string, string, string][] = [
  ['BDO bank transfer', 'Every invoice', 'Please pay by bank transfer to BDO, Metro Lending, account ••4471, quoting the invoice number.'],
  ['Late payment penalty', 'Every invoice', 'Balances unpaid after the due date incur a penalty of 2% a month.'],
  ['Metro Fuels: quote the PO', 'Metro Fuels', 'Metro Fuels pays only invoices that quote its PO number. PO: PO-2211.'],
  ['VAT-exempt sale', 'None', 'VAT-exempt sale under Sec. 109 of the Tax Code.'],
];

function InvoicePreview({ stacked }: { stacked: string[] }) {
  return (
    <Doc small title="Invoice" meta={['INV-1038', 'Issued 3 Aug 2026', 'Due 2 Sep 2026']} to={<><b>Metro Fuels</b><span>PO-2211 · TIN 204-311-580-000</span></>}>
      <Lines head={['Description', '₱ Amount']} rows={[['Fleet financing charges, August 2026', '1,003,571.43'], ['Processing fee', '50,000.00']]} />
      <p className="dc-sums"><span>Subtotal</span><span>1,053,571.43</span><span>VAT, 12%</span><span>126,428.57</span><span className="t">Total due</span><span className="t">₱1,180,000.00</span></p>
      <div className="tp-foots">{footers.filter(f => stacked.includes(f[0])).map(([n, , t]) => <p key={n}>{t}</p>)}</div>
    </Doc>
  );
}

export default function Templates() {
  const onInvoice = ['BDO bank transfer', 'Late payment penalty', 'Metro Fuels: quote the PO'];
  return (
    <>
      <Demo wide caption="Settings › Documents › Headers and footers, for invoices. The header is the client’s logo and company details, set once. Footers are where flexibility lives: each is a named block of text, with where it’s added by default: every invoice, one customer, or only when someone picks it. Editing one shows it on a real invoice before saving.">
        <Frame loud as="lead" on="" foot={<><p className="as-nav">Jobs</p><p className="as-nav on">Settings</p><p className="as-nav">Help</p></>}>
          <div className="pd-big">
            <div className="as-a-page pd-under">
              <p className="as-crumb">Settings <span>/</span> Documents <span>/</span> Headers and footers <span>/</span> <b>Invoice</b></p>
              <div className="as-a-head"><div><p className="m-title">Invoice footers</p><p className="as-meta"><span>Added to the foot of invoices, in this order.</span></p></div><Btn kind="pri">New footer</Btn></div>
              <table className="m-tbl">
                <thead><tr><th>Footer</th><th>Added by default to</th></tr></thead>
                <tbody>{footers.map(([n, d]) => <tr key={n}><td><a className="m-link">{n}</a></td><td>{d === 'None' ? <Pill tone="off">Only when picked</Pill> : d}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="pd-side tp-side">
              <p className="pd-side-h"><b>Metro Fuels: quote the PO</b><span>×</span></p>
              <Field label="Name" value="Metro Fuels: quote the PO" />
              <div className="m-field"><label>Text</label><span className="m-in tp-area">Metro Fuels pays only invoices that quote its PO number. PO: <em>{'{invoice.po}'}</em>.</span></div>
              <Field label="Add by default to" value="Metro Fuels" select />
              <p className="m-k">Preview on INV-1038</p>
              <div className="tp-mini"><InvoicePreview stacked={onInvoice} /></div>
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save footer</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Demo wide caption="On the invoice: its footers, in order. The defaults for Metro Fuels arrive on their own; + Add footer picks another from the list. The preview shows exactly what the customer will get.">
        <Frame on="Invoices">
          <div className="pd-big">
            <div className="pd-under"><DetailPage plain /></div>
            <div className="pd-side tp-side">
              <p className="pd-side-h"><b>Footers on INV-1038</b><span>×</span></p>
              <div className="tp-stack">
                {onInvoice.map(n => <p key={n}><i>⋮⋮</i><span>{n}</span><em>×</em></p>)}
                <p className="tp-add">+ Add footer</p>
              </div>
              <p className="m-k">Preview</p>
              <div className="tp-mini"><InvoicePreview stacked={onInvoice} /></div>
              <span className="pd-foot"><Btn>Cancel</Btn><Btn kind="pri">Save footers</Btn></span>
            </div>
          </div>
        </Frame>
      </Demo>

      <Section title="What’s fixed, and what the business chooses">
        <When head={['Fixed by us, per record type', 'Chosen by the business']} rows={[
          ['The layout: title and number top left, branding top right, footer at the foot', 'The logo, and the company details in the header'],
          ['Which fields show, and every amount, from the record', 'Footers: named blocks of text, such as payment instructions, terms, and notes'],
          ['The table, totals, and taxes', 'Which footers go on every invoice, on one customer’s, or only when picked'],
          ['Numbering and the document footer line', 'The order of footers on a record, and extra ones for this record only'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One fixed layout per record type.', 'Designed with us, the same for every invoice. The business sets its logo and details in the header once.'],
            ['Footers are the flexible part.', 'Named blocks of text, kept in Settings, added to the foot of any record.'],
            ['Defaults per customer.', 'A footer can go on every invoice, on one customer’s invoices, or only when someone picks it.'],
            ['Stack and order them on the record.', 'The record lists its footers; people add, remove, and drag them into order for that record only.'],
            ['Always preview on a real record.', 'Editing a footer, or changing a record’s footers, shows the actual document first.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A template builder.', 'Every invoice ends up looking different, and one bad edit breaks all of them.'],
            ['One footer box for everything.', 'Payment details, penalties, and a customer’s PO rule crowd into one paragraph nobody maintains.'],
            ['Retyping the same note on every invoice.', 'Metro Fuels’ PO rule is forgotten on the one invoice they reject.'],
            ['Footers that can only be set globally.', 'A note for one customer goes to every customer.'],
            ['Saving without seeing it.', 'The first person to read the new footer is the customer.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
