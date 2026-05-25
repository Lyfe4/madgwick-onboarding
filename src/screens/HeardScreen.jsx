import Icon from '../components/Icon.jsx';
import OptionCard from '../components/form/OptionCard.jsx';
import { HEARD_OPTIONS } from '../data/options.js';

export default function HeardScreen({ form, set, next, skip }) {
  return (
    <div className="page-inner">
      <div className="page-head">
        <h1>How did you find us?</h1>
        <p>Helps us understand what&rsquo;s working — totally optional.</p>
      </div>
      <div className="option-list">
        {HEARD_OPTIONS.map(o => (
          <OptionCard
            key={o.id}
            title={o.label}
            compact
            checked={form.heard === o.id}
            onClick={() => { set('heard', o.id); setTimeout(next, 220); }}
          />
        ))}
      </div>
      <div className="actions">
        <button className="btn-primary" disabled={!form.heard} onClick={next}>
          Finish setup
          <Icon name="arrow-right" size={16} />
        </button>
        <button className="skip-link" onClick={skip}>Skip and finish</button>
      </div>
    </div>
  );
}
