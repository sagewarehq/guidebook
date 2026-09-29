import { Section, Demo, Pair, Rules, Avoid, When } from '../../site/kit';
import { ListPage } from '../shell/shell-kit';
import { AgentFrame, ChatPanel, Me, Msg } from '../agents/agent-kit';
import './chat.css';

// What the Agent can see: the page you’re on (its saved view, filters, selection, and anything open) goes with every
// message, shown above the message box, each part removable. Your recent activity goes only when you share it, for
// this session.

const link = (to: string, label: string) => <a className="m-link" href={`#/agentic/${to}`}>{label}</a>;
const Ment = ({ children }: { children: string }) => <span className="ct-ment">{children}</span>;

/** The context box above the message box: what goes with the next message, each part with × to leave it out. */
function Context({ sharing }: { sharing?: boolean }) {
  return (
    <div className="ct-ctx">
      <p className="ct-ctx-h"><span>Marco can see</span><small>Only what you can open ▴</small></p>
      <p className="ct-row"><small>Page</small><span>Invoices · saved view Overdue in Cebu</span><i>×</i></p>
      <p className="ct-row"><small>Filters</small><span>Status: Overdue · Branch: Cebu</span><i>×</i></p>
      <p className="ct-row"><small>Selected</small><span><Ment>INV-1038</Ment><Ment>INV-1044</Ment></span><i>×</i></p>
      <p className="ct-row off"><small>Open</small><span>No drawer or record open</span></p>
      <p className="ct-ctx-f"><span>Recent activity</span><span className={sharing ? 'ct-sw on' : 'ct-sw'}><i />{sharing ? 'Shared, this session' : 'Not shared'}</span></p>
    </div>
  );
}


export default function WhatItSees() {
  return (
    <>
      <Demo wide caption={<>Ramon has two invoices ticked on the overdue list. Tapping the strip under Marco’s header opens what goes with his next message: the page and its saved view, the filters, the two selected invoices, and whether a drawer or record is open. × leaves one out. Recent activity isn’t shared.</>}>
        <div className="ct-short">
          <AgentFrame as="lead" loud overlay={
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu · 2 selected ▾" composer="Ask Marco about these…">
              <Context />
            </ChatPanel>}>
            <ListPage plain />
          </AgentFrame>
        </div>
      </Demo>

      <Demo wide caption={<>Share my recent activity is one switch in the strip, off each session. Once Ramon turns it on, Marco uses it to work out the goal, and says so.</>}>
        <div className="ct-box tall">
          <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu · activity shared" composer="Ask Marco, or tell him what to change…">
            <Me>What am I missing on these?</Me>
            <Msg><span>Looks like you’re chasing Metro Fuels’ overdue balance. Under Net 45, <a className="m-link">INV-1038</a> was due 17 Sep, so it’s 11 days overdue, not 26, and its reminders still quote the old date. Want me to redraft the next one for Ana to send?</span></Msg>
          </ChatPanel>
        </div>
      </Demo>

      <Pair>
        <Demo verdict="do" caption={<>What Marco can see is on screen, and each part can be left out.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready" onPage="Invoices · Overdue in Cebu · 2 selected ▾">
              <Context />
            </ChatPanel>
          </div>
        </Demo>
        <Demo verdict="avoid" caption={<>Marco has been reading everything Ramon did today, without asking, and says it back to him. Nothing on screen said he could.</>}>
          <div className="ct-box">
            <ChatPanel agent="marco" status="Ready">
              <Me>What am I missing on these?</Me>
              <Msg><span>I noticed you opened Metro Fuels 6 times today, exported 12 invoices at 9:21, and looked at Ana’s collections targets yesterday evening. Shall I tell her you’re worried?</span></Msg>
            </ChatPanel>
          </div>
        </Demo>
      </Pair>

      <Section title="What the Agent can see, and when">
        <When head={['What', 'When', 'Who controls it']} rows={[
          ['The page you’re on', 'Always, with each message: view, filters, selection, anything open.', 'You: shown above the message box, × to leave a part out.'],
          ['Your recent activity', 'Only when you share it, for this session.', 'You: one switch, off again next session.'],
          ['What it remembers', 'Across sessions, as saved memories.', <>Its owner. See {link('teaching/memory', 'Teaching › Agent memory')}.</>],
          ['Records it looks up', 'When the work needs them.', 'Your access: it opens only what you could open.'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Send the page as context.', 'The view, filters, selection, and anything open go with the message.'],
            ['Show it, and let people take parts out.', 'The strip opens to what Marco can see, each part with ×.'],
            ['Nothing beyond the person’s access.', 'Context and lookups stop at what they could open themselves.'],
            ['Share activity only on request.', 'One switch, off each session, and it says when it’s on.'],
            ['Keep shared activity in its session.', 'Kept with the conversation, never used later or for anyone else.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Making people describe their screen.', '“I’m on the overdue list, Cebu, with two ticked…” every time.'],
            ['Hidden context.', 'People can’t tell why the Agent answered about the wrong invoice.'],
            ['Context wider than the person.', 'The Agent quotes a Baguio invoice to someone in Cebu.'],
            ['Reading activity silently.', 'The Agent brings up what people did yesterday, and they stop trusting it.'],
            ['Activity that follows people around.', 'Monday’s browsing turns up in Thursday’s answer, or in a colleague’s.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
