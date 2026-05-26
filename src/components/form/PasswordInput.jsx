import { useState } from 'react';
import Icon from '../Icon.jsx';

export default function PasswordInput({
  id, value, onChange, onBlur, onFocus, placeholder, autoComplete = 'new-password',
  'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-wrap">
      <input
        id={id}
        name={id}
        className="text-input"
        type={show ? 'text' : 'password'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={show ? 'Hide password' : 'Show password'}
        onClick={() => setShow(s => !s)}
      >
        <Icon name={show ? 'eye-off' : 'eye'} size={16} />
      </button>
    </div>
  );
}
