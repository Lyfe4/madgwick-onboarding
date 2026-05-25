import Icon from '../components/Icon.jsx';
import { Field, Select } from '../components/form/index.js';
import { AU_STATES } from '../data/options.js';

export default function LocationScreen({ form, set, next, skip }) {
  return (
    <div className="page-inner">
      <div className="page-head">
        <h1>Where are you based?</h1>
        <p>So we can surface region-specific content and connect you with nearby learners.</p>
      </div>
      <div className="fields">
        <Field label="State or territory" htmlFor="state">
          <Select
            id="state"
            value={form.state}
            onChange={v => set('state', v)}
            options={AU_STATES}
            placeholder="Select your state"
          />
        </Field>
      </div>
      <div className="actions">
        <button className="btn-primary" onClick={next}>
          Continue
          <Icon name="arrow-right" size={16} />
        </button>
        <button className="skip-link" onClick={skip}>Skip for now</button>
      </div>
    </div>
  );
}
