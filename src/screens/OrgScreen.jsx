import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Field from '../components/form/Field.jsx';
import TextInput from '../components/form/TextInput.jsx';
import Checkbox from '../components/form/Checkbox.jsx';

export default function OrgScreen({ form, set, next, skip }) {
  const [prefer, setPrefer] = useState(form.preferNot || false);
  return (
    <div className="page-inner">
      <div className="page-head">
        <h1>Where are you connected?</h1>
        <p>Your organisation, brigade, or affiliation — if you have one. This helps us connect you to others from the same group.</p>
      </div>
      <div className="fields">
        <Field label="Organisation or brigade" htmlFor="org">
          <TextInput id="org" value={form.organisation} onChange={v => set('organisation', v)} placeholder="e.g. NSW RFS · Armidale Brigade" autoFocus />
        </Field>
        <Checkbox checked={prefer} onChange={(v) => { setPrefer(v); set('preferNot', v); if (v) set('organisation', ''); }}>
          I&rsquo;d rather not say.
        </Checkbox>
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
