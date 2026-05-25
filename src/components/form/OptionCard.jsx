import Icon from '../Icon.jsx';

function cn(...args) { return args.filter(Boolean).join(' '); }

export default function OptionCard({ icon, title, sub, checked, onClick, compact }) {
  return (
    <button
      type="button"
      className={cn('option-card', compact && 'compact')}
      data-checked={checked ? 'true' : 'false'}
      onClick={onClick}
      aria-pressed={checked}
    >
      {icon && (
        <span className="opt-icon">
          <Icon name={icon} size={18} />
        </span>
      )}
      <span className="opt-body">
        <span className="opt-title">{title}</span>
        {sub && <span className="opt-sub">{sub}</span>}
      </span>
      <span className="opt-check">
        {checked && <Icon name="check" size={12} strokeWidth={3} />}
      </span>
    </button>
  );
}
