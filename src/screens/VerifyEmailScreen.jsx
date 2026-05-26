import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { auth } from '../lib/api.js';

export default function VerifyEmailScreen({ form, next }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(45);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [resending, setResending] = useState(false);
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

  const handleVerify = async () => {
    setLoading(true);
    setApiError(null);
    try {
      await auth.verifyEmail(form.email, code);
      next();
    } catch (err) {
      setApiError(
        err.status === 400
          ? 'That code is incorrect or has expired. Please try again.'
          : (err.message || 'Something went wrong. Please try again.'),
      );
      // Clear the entered digits so the user can re-type cleanly.
      setDigits(['', '', '', '', '', '']);
      // Return focus to the first cell.
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setApiError(null);
    try {
      await auth.resendCode(form.email);
      setSeconds(45);
    } catch (err) {
      setApiError(err.message || 'Could not resend. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ready && !loading) handleVerify();
  };

  return (
    <form className="page-inner" onSubmit={handleSubmit} noValidate>
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

      {/* API-level error banner */}
      {apiError && (
        <div className="error-banner" role="alert">
          {apiError}
        </div>
      )}

      {/*
        role="group" + aria-label gives the six individual digit inputs a
        collective accessible name so screen readers announce "Verification
        code, group" before reading each "Digit N" label.
      */}
      <div
        className="code-grid"
        role="group"
        aria-label="6-digit verification code"
        onPaste={onPaste}
      >
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
        <button
          type="button"
          className="btn-primary"
          disabled={!ready || loading}
          onClick={handleVerify}
        >
          {loading ? 'Verifying…' : 'Verify and continue'}
          {!loading && <Icon name="arrow-right" size={16} />}
        </button>
        <div className="resend-row">
          {seconds > 0 ? (
            <span>Didn&rsquo;t get it? Resend in <strong style={{ color: 'var(--foreground)' }}>{seconds}s</strong></span>
          ) : (
            <>
              <span>Didn&rsquo;t get it?</span>
              <button
                type="button"
                className="link-btn"
                disabled={resending}
                onClick={handleResend}
              >
                {resending ? 'Sending…' : 'Resend code'}
              </button>
            </>
          )}
        </div>
        <button type="button" className="skip-link" onClick={next}>I&rsquo;ll verify later</button>
      </div>
    </form>
  );
}
