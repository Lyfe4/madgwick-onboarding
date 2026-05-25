import { useState } from 'react';
import Icon from '../Icon.jsx';

export default function PasswordInput({
  id, value, onChange, placeholder, autoComplete = 'new-password',
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
        placeholder={placeholder}
        autoComplete={autoComplete}
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
