import { useRef } from 'react';
import Icon from '../components/Icon.jsx';
import { OptionCard } from '../components/form/index.js';

export default function SingleSelectScreen({
  title, sub, options, value, onChange, next, skip, autoAdvance = true,
}) {
  // Guard against double-fire: if the user clicks two options very quickly,
  // or React batches two state updates, we only want to auto-advance once.
  const navigated = useRef(false);

  const handleClick = (id) => {
    onChange(id);
    if (autoAdvance && !navigated.current) {
      navigated.current = true;
      setTimeout(next, 220);
    }
  };

  return (
    <div className="page-inner">
      <div className="page-head">
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      <div className="option-list">
        {options.map(o => (
          <OptionCard
            key={o.id}
            icon={o.icon}
            title={o.label}
            sub={o.sub}
            checked={value === o.id}
            onClick={() => handleClick(o.id)}
          />
        ))}
      </div>
      <div className="actions">
        <button type="button" className="btn-primary" disabled={!value} onClick={next}>
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
        <button type="button" className="skip-link" onClick={skip}>Skip for now</button>
      </div>
    </div>
  );
}
