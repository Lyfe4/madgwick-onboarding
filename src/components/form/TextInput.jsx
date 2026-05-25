export default function TextInput({
  id, value, onChange, type = 'text',
  placeholder, autoFocus, autoComplete, name,
}) {
  return (
    <input
      id={id}
      name={name || id}
      className="text-input"
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  );
}
