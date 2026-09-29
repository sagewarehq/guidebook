import { Section, Demo, Rules, Avoid, When, Sk, Btn, Ini } from '../../site/kit';
import { Frame } from './shell-kit';
import { H, Nav } from './places-kit';
import './shell.css';

// Account balances: a number people check before they act (a lending fund, prepaid credits). Four places it can sit
// in the shell, and how to choose.

type Where = 'top' | 'side' | 'home' | 'page';

const captions: Record<Where, string> = {
  top: 'In the top bar, beside notifications: always in view, on every page. For the one balance everyone acts on all day, such as the fund available to release loans.',
  side: 'Under the company and branch, top left: tied to the place people are working in. For a balance that belongs to the branch, and changes when they switch.',
  home: 'A card on Home: seen at the start of the day, with the trend and what’s coming. For a balance people plan with, not one they check before every action.',
  page: 'On the page where it’s spent: the release page shows the fund beside the button, and says what’s left after. Do this wherever money leaves, whichever place you pick above.',
};

/** Signed in as Liza, the Cebu branch manager, who releases loans. */
const Me = () => <Ini n="LT" />;
const Org = () => <p className="as-org"><b>Metro Lending</b><span>Cebu branch ▾</span></p>;

const Chip = () => <span className="sh-bal"><small>Cebu fund</small><b>₱12.4M</b></span>;

export default function Balances() {
  return (
    <>
      <Demo wide caption={captions.top}>
        <Frame loud as="lead" on="Loans" org={<Org />} top={<><H n={1}><Chip /></H><span className="as-bell">3</span><Me /></>}>
          <div className="as-a-page sh-dimpage"><p className="as-crumb">Loans <span>/</span> <b>Ready to release</b></p><p className="m-title">Loans</p>{[80, 66, 74, 58].map(x => <Sk key={x} w={`${x}%`} />)}</div>
        </Frame>
      </Demo>

      <Demo wide caption={captions.side}>
        <Frame loud as="lead" on="Loans" top={<><span className="as-bell">3</span><Me /></>} org={<><Org /><H n={1} className="block"><p className="sh-sidebal"><small>Fund available</small><b>₱12,400,000</b><span>as of 9:14 AM</span></p></H></>} nav={<Nav on="Loans" />}>
          <div className="as-a-page sh-dimpage"><p className="as-crumb">Loans <span>/</span> <b>Ready to release</b></p><p className="m-title">Loans</p>{[80, 66, 74, 58].map(x => <Sk key={x} w={`${x}%`} />)}</div>
        </Frame>
      </Demo>

      <Demo wide caption={captions.home}>
        <Frame loud as="lead" on="Home" org={<Org />} top={<><span className="as-bell">3</span><Me /></>}>
          <div className="as-a-page">
            <p className="m-title">Good morning, Liza</p>
            <div className="sh-homecards">
              <H n={1} className="block"><p className="sh-kpi"><small>Cebu fund available</small><b>₱12.4M</b><span>Down ₱3.1M this week · 6 loans ready to release, ₱9.8M</span></p></H>
              <p className="sh-kpi quiet"><small>Collected this month</small><b>₱18.2M</b><span>87.5% on time</span></p>
            </div>
            <p className="m-k">Needs you today</p>{[80, 66, 74].map(x => <Sk key={x} w={`${x}%`} />)}
          </div>
        </Frame>
      </Demo>

      <Demo wide caption={captions.page}>
        <Frame loud as="lead" on="Loans" org={<Org />} top={<><span className="as-bell">3</span><Me /></>}>
          <div className="as-a-page">
            <p className="as-crumb">Loans <span>/</span> LN-2231 <span>/</span> <b>Release</b></p>
            <p className="m-title">Release LN-2231?</p>
            <H n={1} className="block"><p className="sh-fundline"><span><small>Cebu fund now</small><b>₱12,400,000.00</b></span><span>−</span><span><small>This release</small><b>₱2,376,000.00</b></span><span>=</span><span><small>Left after</small><b>₱10,024,000.00</b></span></p></H>
            <p className="sh-bar"><Btn>Back to LN-2231</Btn><span className="as-grow" /><Btn kind="pri">Release ₱2,376,000.00</Btn></p>
          </div>
        </Frame>
      </Demo>

      <Section title="How to choose">
        <When head={['The balance', 'Put it', 'Example']} rows={[
          ['Everyone acts on it, all day', 'Top bar, beside notifications', 'A lending fund, prepaid SMS credits'],
          ['It belongs to the branch or company people are in', 'Under the switcher, top left', 'A branch’s cash on hand'],
          ['People plan with it', 'A card on Home', 'Cash position, collections this month'],
          ['It’s spent by an action', 'On that action’s page, always, as well', 'Releasing a loan, a payment run'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['One balance in the frame, at most.', 'The top bar and the sidebar hold one number. Anything else goes on Home.'],
            ['Short where it’s shown, exact where it’s spent.', '₱12.4M in the top bar; ₱12,400,000.00 on the page that spends it, with what’s left after.'],
            ['Say when, and click through.', '“as of 9:14 AM” beside it, and a click opens the list of what moved it.'],
            ['Red only when it’s low.', 'Below the level the business sets: “Cebu fund low: ₱800k left.”'],
            ['Only for roles that can see money.', 'The fund balance shows to those who release loans; Collections sees what they collect.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Several balances in the top bar.', 'Every number competes, and people stop reading any of them.'],
            ['Showing it only on Home.', 'People spend past the balance on another page without seeing it.'],
            ['A balance with no time.', 'A nightly figure reads as live, and people act on a stale number.'],
            ['Red for a normal balance.', 'Red on every page becomes noise, and a real shortfall gets missed.'],
            ['The same balance for everyone.', 'Staff who shouldn’t see the fund see it on every page.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
