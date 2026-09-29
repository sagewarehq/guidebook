import { Section, Demo, Pair, Rules, Avoid, When, Win, Btn, Pin } from '../../site/kit';
import { AgentFrame, ChatPage, Day, Me, Msg, Steps, ApprovalCard, Line } from '../agents/agent-kit';
import { RunCard, ApproveRun, link } from './approval-kit';

// The approval card: what an Agent posts when a person must decide. Its parts, pinned; Approve… opening the
// confirmation page; the card once answered; and the bare “Approve?” to avoid.

export default function Card() {
  return (
    <>
      <Demo wide caption={<>Marco’s card for payment run #0318, in his chat. Everything Ramon needs to decide is on the card itself: what’s proposed, the totals, each call with its reason and the records behind it, what was held, the two answers, and who decides. The parts are numbered in the table below.</>}>
        <AgentFrame on="Agents" as="lead">
          <ChatPage agent="marco" status="Waiting on you · payment run #0318">
            <Day label="Today" />
            <Me>Prepare this week’s payment run. Hold anything you’re not sure about.</Me>
            <Steps items={[[true, 'Read the invoices from 35 suppliers due this week'], [true, 'Matched each to its PO and delivery'], [true, '30 matched cleanly; 5 needed a call']]} />
            <Msg>Payment run #0318 is ready. 5 suppliers needed a judgment call: I paid 2 and held 3. Here’s why.</Msg>
            <div className="apv-w apv-pins"><RunCard /></div>
          </ChatPage>
        </AgentFrame>
      </Demo>

      <Section title="The parts of the card">
        <When head={['', 'Part', 'What goes in it']} rows={[
          [<Pin n={1} />, 'What and when', 'What the Agent proposes, in the record’s own name (Payment run #0318), when it takes effect, and who prepared it.'],
          [<Pin n={2} />, 'Key facts', 'The three or four numbers the decision turns on: how much, to how many, and how many held.'],
          [<Pin n={3} />, 'Lines', 'What will happen, line by line. Routine lines summed into one; each judgment call with its one-line reason and links to its sources.'],
          [<Pin n={4} />, 'Held', 'What the Agent wouldn’t decide, in red, each with why and what would clear it. Held lines aren’t part of the approval.'],
          [<Pin n={5} />, 'Three answers', 'Approve… (it opens the confirmation page, hence the “…”), Suggest changes (sends it back to the Agent), and Reject… (drops the draft, with a reason).'],
          [<Pin n={6} />, 'Who decides', 'Whose call it is, and what happens to what’s held. The same person, whichever device they answer from.'],
        ]} />
      </Section>

      <Demo wide caption={<>Approve… opens /payments/runs/0318/approve, a page like any other money action. It checks the run first, says what will happen, and the button names the amount. Back returns to the card, still waiting. See {link('approvals/partial', 'Approving part')} for leaving some lines out.</>}>
        <AgentFrame on="Payments" as="lead">
          <ApproveRun />
        </AgentFrame>
      </Demo>

      <Pair>
        <Demo caption="Once answered, the buttons give way to the answer: who, when, and what happens next. Anyone scrolling back sees the decision, not a live Approve.">
          <Win title="Marco · Chat">
            <div className="ag-card">
              <div className="ag-card-h"><b>Payment run #0318</b><small>Pays Tue 29 Sep, 9:00 AM · prepared by Marco, 7:40 AM</small></div>
              <p className="ag-facts"><span><small>To pay</small>₱48,650,000.00</span><span><small>Suppliers</small>32 of 35</span><span><small>Held</small>3</span></p>
              <p className="apv-done"><b>✓ Approved by Ramon Cruz,</b> today at 9:42 AM. Pays tomorrow, 9:00 AM. <a className="m-link">Open run</a></p>
            </div>
          </Win>
        </Demo>
        <Demo caption={<>A small decision that nothing leaves the business on needs no confirmation page, so its button says what it does, with no “…”. Nico’s report goes only to Metro Lending’s own leadership.</>}>
          <Win title="Nico · Chat">
            <ApprovalCard title="September collections report" meta="Ready Fri 25 Sep · prepared by Nico, 4:10 PM"
              facts={[['Collected', '₱34,350,000.00'], ['vs August', '−2%'], ['To', '4 leaders']]}
              lines={[<Line name="Baguio collections fell 18%" why="6 restructured loans pay from October, and Route 3 went unvisited 7–18 Sep." sources={['Report, p. 2']} />]}
              primary="Send to leadership" secondary="Suggest changes" note="You decide, as Nico’s owner. Sent internally only." />
          </Win>
        </Demo>
      </Pair>

      <Pair>
        <Demo verdict="do" caption="The decision is on the card: the totals, why each call was made, what was held, and whose call it is. Ramon can approve without opening anything else, and check any line in one click.">
          <Win title="Marco · Chat">
            <div className="apv-w narrow"><RunCard /></div>
          </Win>
        </Demo>
        <Demo verdict="avoid" caption="“Run ready. Approve?” Ramon can’t see what he’s approving, what Marco held, or why. Either he opens six screens to check, or he clicks Approve blind, and ₱48.65M goes out on one click.">
          <Win title="Marco · Chat">
            <div className="apv-bare">
              <p>Payment run ready. Approve?</p>
              <span><Btn kind="pri">Approve</Btn><Btn>Reject</Btn></span>
            </div>
          </Win>
        </Demo>
      </Pair>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Put the decision on the card.', 'What’s proposed, the key facts, and each line: enough to decide without opening anything else.'],
            ['Give every call its reason and sources.', 'One plain line of why under each judgment call, with links to the invoice, PO, or email.'],
            ['Show what was held, apart.', 'Held lines in red, below the rest, each with why. They aren’t part of the approval.'],
            ['Approve, change, or reject, and Approve… confirms.', 'Approve… opens the confirmation page for money; Suggest changes sends it back; Reject… drops the draft, with a reason.'],
            ['Say who decides, and show the answer.', 'Name whose call it is under the buttons. Once answered, the answer replaces them.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['“Run ready. Approve?”', 'People approve blind, or open six screens to check what the card should have said.'],
            ['Calls with no reason.', 'Nobody can tell why Bohol Diesel is paid over its PO, so they ask, or don’t.'],
            ['Held lines mixed in with the rest.', 'The possible duplicate from Cebu Paperworks gets paid along with everything else.'],
            ['A one-click Approve for money.', 'A stray click pays ₱48.65M, with nothing to check first.'],
            ['A card that stays live after it’s answered.', 'Someone scrolls back, sees Approve, and wonders whether it was ever paid.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
