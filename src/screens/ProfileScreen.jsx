import Icon from '../components/Icon.jsx';
import { Field, Select, Chip, OptionCard } from '../components/form/index.js';
import { ROLE_OPTIONS, GOAL_OPTIONS, AU_STATES, HEARD_OPTIONS } from '../data/options.js';

export default function ProfileScreen({ form, set, next, skip }) {
  const goals = form.goals || [];

  const toggleGoal = (id) => {
    set('goals', goals.includes(id) ? goals.filter(x => x !== id) : [...goals, id]);
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

      {/* Role */}
      <div className="fields">
        <span className="label">What best describes your role?</span>
        <div className="option-list">
          {ROLE_OPTIONS.map(o => (
            <OptionCard
              key={o.id}
              title={o.label}
              compact
              checked={form.role === o.id}
              onClick={() => set('role', form.role === o.id ? null : o.id)}
            />
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="fields">
        <span className="label">What are you hoping to achieve? <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>· Pick as many as you like.</span></span>
        <div className="chip-grid">
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
        <button type="button" className="btn-primary" onClick={next}>
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
        <button type="button" className="skip-link" onClick={skip}>Skip for now</button>
      </div>
    </div>
  );
}
