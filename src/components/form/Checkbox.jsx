import Icon from '../Icon.jsx';

export default function Checkbox({ checked, onChange, children }) {
  return (
    <button
      type="button"
      className="checkbox-row"
      data-checked={checked ? 'true' : 'false'}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="checkbox-box">
        {checked && <Icon name="check" size={12} strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </button>
  );
}
