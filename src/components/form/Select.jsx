export default function Select({ id, value, onChange, options, placeholder, ...rest }) {
  return (
    <select
      id={id}
      name={id}
      className="select-input"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    >
      <option value="" disabled>{placeholder || 'Select…'}</option>
      {options.map(o => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        return <option key={v} value={v}>{l}</option>;
      })}
    </select>
  );
}
