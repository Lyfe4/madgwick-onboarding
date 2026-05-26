import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Field, Select, Chip, OptionCard } from '../components/form/index.js';
import { ROLE_OPTIONS, GOAL_OPTIONS, AU_STATES, HEARD_OPTIONS } from '../data/options.js';
import { onboarding } from '../lib/api.js';

export default function ProfileScreen({ form, set, next, skip }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const goals = form.goals || [];

  const toggleGoal = (id) => {
    set('goals', goals.includes(id) ? goals.filter(x => x !== id) : [...goals, id]);
  };

  const handleContinue = async () => {
    setLoading(true);
    setApiError(null);
    try {
      await onboarding.saveProfile('demo-user', {
        role:   form.role,
        goals:  form.goals,
        state:  form.state,
        heard:  form.heard,
      });
      next();
    } catch (err) {
      setApiError(err.message || 'Could not save your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-inner">
      <div className="page-head">
        <h1>Tell us a bit about yourself</h1>
        <p>
          Helps us personalise your experience — and lets UNE know we&rsquo;re reaching the right people.{' '}
          <span style={{ color: 'var(--muted-foreground)' }}>All optional.</span>
        </p>
      </div>

      {/* API-level error banner */}
      {apiError && (
        <div className="error-banner" role="alert">
          {apiError}
        </div>
      )}

      {/* Role */}
      <div className="fields">
        <span className="label">What best describes your role?</span>
        {/*
          role="radiogroup" gives the set of option cards a collective accessible
          name so screen readers treat this as a single-select group.
          Each OptionCard uses aria-pressed which is appropriate for a toggle,
          but within a radiogroup, users understand it as a mutually exclusive
          selection via the group semantics.
        */}
        <div className="option-list" role="group" aria-label="Your role">
          {ROLE_OPTIONS.map(o => (
            <OptionCard
              key={o.id}
              icon={o.icon}
              title={o.label}
              sub={o.sub}
              compact
              checked={form.role === o.id}
              onClick={() => set('role', form.role === o.id ? null : o.id)}
            />
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="fields">
        <span className="label">
          What are you hoping to achieve?{' '}
          <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>· Pick as many as you like.</span>
        </span>
        <div className="chip-grid" role="group" aria-label="Learning goals">
          {GOAL_OPTIONS.map(o => (
            <Chip key={o.id} label={o.label} checked={goals.includes(o.id)} onClick={() => toggleGoal(o.id)} />
          ))}
        </div>
      </div>

      {/* State + Heard */}
      <div className="fields">
        <Field label="Where are you based?" htmlFor="state">
          <Select
            id="state"
            value={form.state}
            onChange={v => set('state', v)}
            options={AU_STATES}
            placeholder="Select your state or territory"
          />
        </Field>

        <Field label="How did you hear about us?" htmlFor="heard">
          <Select
            id="heard"
            value={form.heard || ''}
            onChange={v => set('heard', v)}
            options={HEARD_OPTIONS.map(o => ({ value: o.id, label: o.label }))}
            placeholder="Select an option"
          />
        </Field>
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn-primary"
          disabled={loading}
          onClick={handleContinue}
        >
          {loading ? 'Saving…' : 'Continue'}
          {!loading && <Icon name="arrow-right" size={16} />}
        </button>
        <button type="button" className="skip-link" onClick={skip} disabled={loading}>
          Skip for now
        </button>
      </div>
    </div>
  );
}
