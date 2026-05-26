import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Field, TextInput, PasswordInput, Checkbox } from '../components/form/index.js';
import { auth } from '../lib/api.js';

export default function SignupScreen({ form, set, next }) {
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // mountedRef becomes true after the initial render completes.
  // autoFocus fires synchronously during mount (before useEffect), so any
  // focus/blur triggered by autoFocus will be ignored — only genuine
  // user-initiated interactions set a field as touched.
  const mountedRef    = useRef(false);
  const userFocusedRef = useRef({});
  useEffect(() => { mountedRef.current = true; }, []);

  // touch(key) marks a single field as visited (called onBlur)
  const touch      = (key) => setTouched(t => ({ ...t, [key]: true }));
  // focusField / blurField — gate touch behind a user-initiated focus so
  // autoFocus doesn't immediately trigger the "Required" error on mount.
  const focusField = (key) => { if (mountedRef.current) userFocusedRef.current[key] = true; };
  const blurField  = (key) => { if (userFocusedRef.current[key]) touch(key); };

  const emailValid     = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email || '');
  const passwordValid  = (form.password || '').length >= 8;
  const passwordsMatch = form.password === form.confirmPassword;

  const canSubmit =
    form.firstName && form.lastName && emailValid && passwordValid && passwordsMatch && form.agreed;

  const submit = async (e) => {
    e.preventDefault();

    // Mark every field (including agreed) touched so every error surfaces.
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreed: true,
    });

    if (!canSubmit) return;

    setLoading(true);
    setApiError(null);

    try {
      await auth.signup({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        password:  form.password,
      });
      next();
    } catch (err) {
      // 409 Conflict → duplicate email; fall back to a generic message.
      setApiError(
        err.status === 409
          ? 'An account with this email address already exists.'
          : (err.message || 'Something went wrong. Please try again.'),
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper: build aria-describedby only when the Field will actually render
  // a help/error span (avoids pointing to a non-existent element).
  const desc = (id, hasMessage) => hasMessage ? `${id}-desc` : undefined;

  const firstNameError    = touched.firstName && !form.firstName ? 'Required' : null;
  const lastNameError     = touched.lastName  && !form.lastName  ? 'Required' : null;
  const emailError        = touched.email     && !emailValid     ? 'Use a valid email address' : null;
  const passwordHelp      = !touched.password ? 'At least 8 characters.' : null;
  const passwordError     = touched.password  && !passwordValid  ? 'At least 8 characters' : null;
  const confirmError      = touched.confirmPassword && !form.confirmPassword
    ? 'Required'
    : touched.confirmPassword && form.confirmPassword && !passwordsMatch
      ? "Passwords don't match"
      : null;
  const agreedError       = touched.agreed && !form.agreed
    ? 'You must accept the Terms of Service to continue'
    : null;

  return (
    <form className="page-inner" onSubmit={submit} noValidate>
      <div className="signup-hero" aria-hidden="true">
        <img src="/madgwick-studio-lockup.png" alt="" />
      </div>
      <div className="page-head">
        <h1>Create your account</h1>
        <p>It takes about a minute. We&rsquo;ll personalise your learning once you&rsquo;re in.</p>
      </div>

      {/* API-level error banner */}
      {apiError && (
        <div className="error-banner" role="alert">
          {apiError}
        </div>
      )}

      <div className="fields">
        <div className="field-row">
          <Field label="First name" htmlFor="firstName" required error={firstNameError}>
            <TextInput
              id="firstName"
              value={form.firstName}
              onChange={v => set('firstName', v)}
              onFocus={() => focusField('firstName')}
              onBlur={() => blurField('firstName')}
              autoFocus
              autoComplete="given-name"
              aria-invalid={firstNameError ? true : undefined}
              aria-describedby={desc('firstName', firstNameError)}
            />
          </Field>
          <Field label="Last name" htmlFor="lastName" required error={lastNameError}>
            <TextInput
              id="lastName"
              value={form.lastName}
              onChange={v => set('lastName', v)}
              onFocus={() => focusField('lastName')}
              onBlur={() => blurField('lastName')}
              autoComplete="family-name"
              aria-invalid={lastNameError ? true : undefined}
              aria-describedby={desc('lastName', lastNameError)}
            />
          </Field>
        </div>

        <Field label="Email" htmlFor="email" required error={emailError}>
          <TextInput
            id="email"
            type="email"
            value={form.email}
            onChange={v => set('email', v)}
            onFocus={() => focusField('email')}
            onBlur={() => blurField('email')}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={desc('email', emailError)}
          />
        </Field>

        <Field label="Password" htmlFor="password" required
          help={passwordHelp}
          error={passwordError}>
           <PasswordInput
            id="password"
            value={form.password}
            onChange={v => set('password', v)}
            onFocus={() => focusField('password')}
            onBlur={() => blurField('password')}
            aria-invalid={passwordError ? true : undefined}
            aria-describedby={desc('password', passwordError || passwordHelp)}
          />
        </Field>

        <Field label="Confirm password" htmlFor="confirmPassword" required error={confirmError}>
           <PasswordInput
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={v => set('confirmPassword', v)}
            onFocus={() => focusField('confirmPassword')}
            onBlur={() => blurField('confirmPassword')}
            aria-invalid={confirmError ? true : undefined}
            aria-describedby={desc('confirmPassword', confirmError)}
          />
        </Field>
      </div>

      <div className="fields" style={{ gap: 4 }}>
        {/*
          Drive agreed directly from the shared `form` object rather than
          duplicating it in local state.  This keeps a single source of truth
          and ensures the value is persisted to localStorage on every change.
        */}
        <Checkbox
          checked={form.agreed}
          onChange={v => set('agreed', v)}
          aria-required="true"
          aria-describedby={agreedError ? 'agreed-desc' : undefined}
        >
          I agree to the <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a> and{' '}
          <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>.
        </Checkbox>
        {/* Agreed error surfaces below the checkbox after a submit attempt */}
        {agreedError && (
          <span
            id="agreed-desc"
            className="help error"
            role="alert"
            style={{ paddingLeft: 28 }}
          >
            {agreedError}
          </span>
        )}
      </div>

      <div className="actions">
        <button type="submit" className="btn-primary" disabled={loading || !canSubmit}>
          {loading ? 'Creating account…' : 'Create account'}
          {!loading && <Icon name="arrow-right" size={16} />}
        </button>
        <div style={{ textAlign: 'center' }}>
          <span style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--muted-foreground)' }}>
            Already have an account?{' '}
            <a className="alt-link" href="#" onClick={e => e.preventDefault()}>Sign in</a>
          </span>
        </div>
      </div>
    </form>
  );
}
