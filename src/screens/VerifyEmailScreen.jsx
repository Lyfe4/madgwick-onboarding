import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';

export default function VerifyEmailScreen({ form, next }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(45);
  const refs = useRef([]);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const code = digits.join('');
  const ready = code.length === 6;

  const onCellChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const nextDigits = digits.slice();
    nextDigits[i] = v;
    setDigits(nextDigits);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const onPaste = (e) => {
    const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const nextDigits = text.split('').concat(Array(6 - text.length).fill(''));
    setDigits(nextDigits);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div className="page-inner">
      <div className="celebrate">
        <Icon name="mail" size={28} />
      </div>
      <div className="page-head" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1>Check your email</h1>
        <p>
          We sent a 6-digit code to{' '}
          <strong style={{ color: 'var(--foreground)' }}>{form.email || 'you@example.com'}</strong>.
          <br/>Enter it below to verify your account.
        </p>
      </div>

      <div className="code-grid" onPaste={onPaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            className="code-cell"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => onCellChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      <div className="actions">
        <button className="btn-primary" disabled={!ready} onClick={next}>
          Verify and continue
          <Icon name="arrow-right" size={16} />
        </button>
        <div className="resend-row">
          {seconds > 0 ? (
            <span>Didn&rsquo;t get it? Resend in <strong style={{ color: 'var(--foreground)' }}>{seconds}s</strong></span>
          ) : (
            <>
              <span>Didn&rsquo;t get it?</span>
              <button className="link-btn" onClick={() => setSeconds(45)}>Resend code</button>
            </>
          )}
        </div>
        <button className="skip-link" onClick={next}>I&rsquo;ll verify later</button>
      </div>
    </div>
  );
}
