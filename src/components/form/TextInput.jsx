// Spreading ...rest lets callers pass through any valid HTML input attribute
// (inputMode, pattern, maxLength, disabled, aria-*, data-*, etc.) without
// needing to enumerate every possible prop here.
export default function TextInput({
  id, value, onChange, onBlur,
  type = 'text', placeholder, autoFocus, autoComplete, name,
  ...rest
}) {
  return (
    <input
      id={id}
      name={name || id}
      className="text-input"
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      {...rest}
    />
  );
}
