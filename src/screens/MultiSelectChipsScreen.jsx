import Icon from '../components/Icon.jsx';
import Chip from '../components/form/Chip.jsx';

export default function MultiSelectChipsScreen({
  title, sub, options, value, onChange, next, skip, min = 0, max = Infinity,
}) {
  const selected = value || [];
  const toggle = (id) => {
    if (selected.includes(id))   return onChange(selected.filter(x => x !== id));
    if (selected.length >= max)  return;
    onChange([...selected, id]);
  };
  const enough = selected.length >= min;

  return (
    <div className="page-inner wide">
      <div className="page-head">
        <h1>{title}</h1>
        {sub && (
          <p>
            {sub} <span style={{ color: 'var(--muted-foreground)' }}>· Pick as many as you like.</span>
          </p>
        )}
      </div>
      <div className="chip-grid">
        {options.map(o => (
          <Chip key={o.id} label={o.label} checked={selected.includes(o.id)} onClick={() => toggle(o.id)} />
        ))}
      </div>
      <div className="actions">
        <button className="btn-primary" disabled={!enough} onClick={next}>
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
        <button className="skip-link" onClick={skip}>Skip for now</button>
      </div>
    </div>
  );
}
