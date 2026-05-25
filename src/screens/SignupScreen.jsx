import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Field, TextInput, PasswordInput, Checkbox } from '../components/form/index.js';

export default function SignupScreen({ form, set, next }) {
  const [touched, setTouched] = useState({});

  // touch(key) marks a single field as visited (called onBlur)
  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const emailValid     = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email || '');
  const passwordValid  = (form.password || '').length >= 8;
  const passwordsMatch = form.password === form.confirmPassword;

  const canSubmit =
    form.firstName && form.lastName && emailValid && passwordValid && passwordsMatch && form.agreed;

  const submit = (e) => {
    e.preventDefault();
    // Mark all fields touched so every error surfaces on submit
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirmPassword: true });
    if (canSubmit) next();
  };

  return (
    <form className="page-inner" onSubmit={submit} noValidate>
      <div className="signup-hero" aria-hidden="true">
        <img src="/madgwick-studio-lockup.png" alt="" />
      </div>
      <div className="page-head">
        <h1>Create your account</h1>
        <p>It takes about a minute. We&rsquo;ll personalise your learning once you&rsquo;re in.</p>
      </div>

      <div className="fields">
        <div className="field-row">
          <Field label="First name" htmlFor="firstName" required
            error={touched.firstName && !form.firstName ? 'Required' : null}>
            <TextInput
              id="firstName"
              value={form.firstName}
              onChange={v => set('firstName', v)}
              onBlur={() => touch('firstName')}
              autoFocus
              autoComplete="given-name"
            />
          </Field>
          <Field label="Last name" htmlFor="lastName" required
            error={touched.lastName && !form.lastName ? 'Required' : null}>
            <TextInput
              id="lastName"
              value={form.lastName}
              onChange={v => set('lastName', v)}
              onBlur={() => touch('lastName')}
              autoComplete="family-name"
            />
          </Field>
        </div>

        <Field label="Email" htmlFor="email" required
          error={touched.email && !emailValid ? 'Use a valid email address' : null}>
          <TextInput
            id="email"
            type="email"
            value={form.email}
            onChange={v => set('email', v)}
            onBlur={() => touch('email')}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Password" htmlFor="password" required
          help={!touched.password ? 'At least 8 characters.' : null}
          error={touched.password && !passwordValid ? 'At least 8 characters' : null}>
          <PasswordInput
            id="password"
            value={form.password}
            onChange={v => set('password', v)}
            onBlur={() => touch('password')}
          />
        </Field>

        <Field label="Confirm password" htmlFor="confirmPassword" required
          error={touched.confirmPassword && form.confirmPassword && !passwordsMatch
            ? "Passwords don't match"
            : null}>
          <PasswordInput
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={v => set('confirmPassword', v)}
            onBlur={() => touch('confirmPassword')}
          />
        </Field>
      </div>

      <div className="fields" style={{ gap: 4 }}>
        {/*
          Drive agreed/marketing directly from the shared `form` object rather
          than duplicating them in local useState.  This keeps a single source
          of truth and ensures values are persisted to localStorage immediately
          on change, not just on submit.
        */}
        <Checkbox checked={form.agreed} onChange={v => set('agreed', v)}>
          I agree to the <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a> and{' '}
          <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>.
        </Checkbox>
      </div>

      <div className="actions">
        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          Create account
          <Icon name="arrow-right" size={16} />
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
