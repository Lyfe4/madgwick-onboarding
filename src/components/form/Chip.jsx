import Icon from '../Icon.jsx';

export default function Chip({ label, checked, onClick }) {
  return (
    <button
      type="button"
      className="chip"
      data-checked={checked ? 'true' : 'false'}
      onClick={onClick}
      aria-pressed={checked}
    >
      <span className="chip-tick">
        <Icon name="check" size={12} strokeWidth={3} />
      </span>
      <span>{label}</span>
    </button>
  );
}
