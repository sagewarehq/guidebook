import { Section, Demo, Rules, Avoid, When, Pin } from '../../site/kit';
import { Frame, DetailPage, pageRegions } from '../shell/shell-kit';
import './foundations.css';

// The detail page: its layout inside the app shell, what goes in each region, and the rules for presenting a record.

export default function Detail() {
  return (
    <>
      <Demo wide caption="A record’s detail page inside the app shell. The side panel runs the full height, under the top bar, with Related and History.">
        <Frame on="Invoices"><DetailPage /></Frame>
      </Demo>

      <Section title="The detail page">
        <When head={['', 'Region', 'What goes there', 'Keep out']} rows={pageRegions.detail.map(([r, what, out], i) => [<Pin n={i + 1} />, r, what, out])} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Name and status first.', 'What it is, where it stands, and the one thing to do next, before anything else.'],
            ['Key facts up top.', 'The three or four numbers people ask about (amount, balance, due date), before anyone scrolls.'],
            ['Group by what people look for.', 'Sections named for the questions people bring, not for the database tables behind them.'],
            ['Edit a section, not the page.', <>Each section has its own Edit, which opens a drawer with just that part. See <a className="m-link" href="#/management/records/edit">Edit record</a>.</>],
            ['Related and History in the side panel.', 'Every linked record as a link with a count, and who changed what, and when. Agents are marked as Agents.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['The status buried below the fields.', 'People scroll to learn where it stands, and miss what to do next.'],
            ['The balance halfway down the page.', 'The numbers people ask about most take a scroll to find.'],
            ['Sections named after the tables behind them.', 'People bring questions, not a schema, and can’t find the answer.'],
            ['Edit mode for the whole page.', 'Every field turns into an input, and a small change puts the rest at risk.'],
            ['No links out, and no history.', 'People search to move sideways, and can’t tell who changed what.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
