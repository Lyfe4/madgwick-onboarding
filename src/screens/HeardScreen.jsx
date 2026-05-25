import { useRef } from 'react';
import Icon from '../components/Icon.jsx';
import { OptionCard } from '../components/form/index.js';
import { HEARD_OPTIONS } from '../data/options.js';

export default function HeardScreen({ form, set, next, skip }) {
  // Guard against double-fire: if the user clicks two options very quickly,
  // or React batches two state updates, we only want to auto-advance once.
  const navigated = useRef(false);

  const handleClick = (id) => {
    set('heard', id);
    if (!navigated.current) {
      navigated.current = true;
      setTimeout(next, 220);
    }
  };

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
            onClick={() => handleClick(o.id)}
          />
        ))}
      </div>
      <div className="actions">
        <button type="button" className="btn-primary" disabled={!form.heard} onClick={next}>
          Finish setup
          <Icon name="arrow-right" size={16} />
        </button>
        <button type="button" className="skip-link" onClick={skip}>Skip and finish</button>
      </div>
    </div>
  );
}
