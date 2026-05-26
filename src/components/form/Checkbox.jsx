import Icon from '../Icon.jsx';

/**
 * Accessible checkbox built on a native <input type="checkbox"> with a custom
 * visual layer.  The native input is visually hidden but remains in the
 * accessibility tree so screen readers correctly announce it as a "checkbox"
 * (not a "button"), and keyboard space-bar toggling works natively.
 *
 * Note: links inside the label are fine — clicking a link does not propagate
 * to toggle the checkbox (links handle their own click event first).
 */
export default function Checkbox({ checked, onChange, children, 'aria-describedby': ariaDescribedby, 'aria-required': ariaRequired }) {
  return (
    <label className="checkbox-row" data-checked={checked ? 'true' : 'false'}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={ariaDescribedby}
        aria-required={ariaRequired}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
        }}
      />
      {/* aria-hidden — the native input above carries the accessible state */}
      <span className="checkbox-box" aria-hidden="true">
        {checked && <Icon name="check" size={12} strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </label>
  );
}
