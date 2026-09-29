import { Section, Demo, Rules, Avoid, Btn, Pill } from '../../site/kit';
import { AgentFrame, Me, Msg, Steps, Reason, Source, HeldPill } from '../agents/agent-kit';
import { AgentWindow, Flow, Saved, Who, go, type Sess } from './b-kit';

// Drafting a proposal: Liza, Cebu branch manager and Bea’s owner, met Rodel Abellana of Consolacion Rice Trading on
// Friday. Bea turns her notes into draft proposal P-0087, priced from 3 similar past loans (each cited), and flags
// the 2 terms riskier than those deals. Liza edits it and sends it from Loans OS. Bea never sends.

const sessions: Sess[] = [
  ['bea', 'Proposal for Consolacion Rice Trading', 'Waiting on you', '9:40 AM'],
  ['bea', 'Proposal for Cebu Grains', 'Waiting on you', '8:50 AM'],
  ['bea', 'Proposal for Talisay Hardware', 'Sent', 'Tue'],
];

/** Draft P-0087 as Bea leaves it: the terms, each with where it came from, and the 2 flags. */
function Draft() {
  const term = (k: string, v: string, src: string[], why?: string) => (
    <p className="exb-term"><small>{k}</small><b>{v}</b><span>{why && <Reason>{why}</Reason>}{src.map(s => <Source key={s}>{s}</Source>)}</span></p>
  );
  return (
    <div className="as-a-page">
      <p className="as-crumb">Loans <span>/</span> Proposals <span>/</span> <b>P-0087</b></p>
      <div className="as-a-head">
        <div><p className="m-title">P-0087 · Consolacion Rice Trading</p><p className="as-meta"><Pill>Draft</Pill><span>Drafted by Bea from your notes · for Rodel Abellana · not sent</span></p></div>
        <span className="as-acts"><Btn kind="quiet">•••</Btn><Btn>Edit</Btn><Btn kind="pri">Send…</Btn></span>
      </div>
      <div className="exb-prop">
        <div className="exb-terms">
          <p className="m-k">Terms</p>
          {term('Amount', '₱2,400,000.00', ['Your notes, 25 Sep'], 'Working capital, before the harvest.')}
          {term('Term', '18 months', ['LN-2139', 'LN-2167'], '2 of the 3 similar loans ran 18.')}
          {term('Rate', '1.40% a month', ['LN-2104', 'LN-2139', 'LN-2167'], '0.05 above the 18-month loans: new to us.')}
          {term('Monthly payment', '₱151,764.48', [], 'Total interest ₱331,760.64.')}
          {term('Collateral', 'Isuzu delivery truck, 2021', ['Your notes, 25 Sep'], 'Chattel mortgage.')}
        </div>
        <div className="exb-risks">
          <p className="m-k">Check before sending · 2</p>
          <div className="exb-risk"><p><HeldPill>Flag</HeldPill><b>The truck’s value is Rodel’s word</b></p><Reason>₱1,600,000 covers 67% of the loan; the similar loans were covered 80% or more.</Reason></div>
          <div className="exb-risk"><p><HeldPill>Flag</HeldPill><b>24 months would be longer than usual</b></p><Reason>Rodel asked for up to 24. Only 1 similar loan ran that long.</Reason></div>
        </div>
      </div>
    </div>
  );
}

export default function Proposal() {
  return (
    <>
      <Demo wide caption={<><b>1. From notes to a draft.</b> Liza met Rodel Abellana on Friday and typed her notes on her phone. She hands them to Bea with one line. Bea finds the past loans most like this one, prices from them, and says what to check, and who sends it: Liza.</>}>
        <AgentFrame as="lead" on="Agents" me="LT">
          <AgentWindow agent="bea" status="Waiting on you · P-0087" session="Proposal for Consolacion Rice Trading" sessions={sessions}>
            <Me ini="LT">Draft a proposal from my notes on Consolacion Rice Trading.</Me>
            <div className="exb-note">
              <p><b>Notes · Fri 25 Sep</b><small>Rodel Abellana, owner</small></p>
              <ul>
                <li>₱2.4M working capital, 18 to 24 months</li>
                <li>Collateral: Isuzu truck, 2021. Rodel says ₱1.6M</li>
              </ul>
            </div>
            <Steps items={[
              [true, 'Found 3 similar loans: rice and grain traders, last 2 years'],
              [true, 'Priced it from them: 18 months at 1.40% a month'],
              ['flag', '2 things to check: the truck’s value, and 24 months'],
            ]} />
            <Msg>P-0087 is drafted. I won’t send it; you do. <a className="m-link">Open P-0087</a></Msg>
          </AgentWindow>
        </AgentFrame>
      </Demo>

      <Demo wide caption={<><b>2. The draft, priced and cited.</b> P-0087 opens as a real proposal under Loans, marked Draft. Every term links where it came from: Liza’s notes or a past loan. What’s riskier than those loans is flagged in red, with the figures, before she sends. Send… opens a confirmation page, because the proposal goes outside; only Liza’s role has Send.</>}>
        <AgentFrame as="lead" on="Loans" me="LT">
          <Draft />
        </AgentFrame>
      </Demo>

      <Section title="The workflow">
        <Flow rows={[
          [<Who>Liza</Who>, 'Meets the borrower, types notes, and hands them to Bea.', go('agentic/chat/asking', 'Asking an Agent')],
          [<Who agent="bea">Bea</Who>, 'Finds 3 similar past loans, and drafts P-0087 priced from them, each term cited.', <>{go('agentic/explaining/sources', 'Sources')}, {go('agentic/explaining/reasons', 'Reasons')}</>],
          [<Who agent="bea">Bea</Who>, 'Flags the unappraised truck and the longer term.', go('agentic/explaining/holds', 'Holds and flags')],
          [<Who>Liza</Who>, 'Edits the draft: keeps 18 months, adds an appraisal condition.', go('agentic/approvals/edit-first', 'Changing before approving')],
          [<Who>Liza</Who>, 'Sends it from a confirmation page; it’s saved on the borrower.', go('management/artifacts/sending', 'Sending and delivery')],
        ]} />
      </Section>

      <Section title="Why it saves time">
        <Saved
          rows={[
            ['Writing it up', '2 hours turning notes into the proposal template', 'The draft is waiting when Liza opens it'],
            ['Pricing it', 'A day or two asking Finance for similar loans and their rates', '3 similar loans cited, each one click away'],
          ]}
          total={['About 3 days', 'About 30 minutes']}
          still="Liza still sets the terms and sends it. She met Rodel, she knows what he’ll accept, and she answers for the offer."
        />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Price from past deals, and cite them.', 'Every term links the loans it came from.'],
            ['Flag what’s riskier than usual.', 'Beside the terms, in red, with the figures: 67% covered, against 80%.'],
            ['Only a person sends.', 'Bea drafts. Liza sends from Loans OS, and the borrower’s record keeps it.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['A rate with no source.', '“1.40% a month”, and Credit sends it back to ask why.'],
            ['The risk buried in the text.', 'The unappraised truck is in paragraph 3, and nobody reads it until release.'],
            ['The Agent emails the borrower.', 'An offer goes out that nobody at Metro Lending agreed to.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
