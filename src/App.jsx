import { useCallback, useEffect, useState } from 'react';
import Icon from './components/Icon.jsx';
import BrandMark from './components/BrandMark.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import VerifyEmailScreen from './screens/VerifyEmailScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';

const STEPS = [
  { id: 'signup',  kind: 'auth',       title: 'Create account' },
  { id: 'verify',  kind: 'auth',       title: 'Verify email' },
  { id: 'profile', kind: 'onboarding', title: 'About you' },
  { id: 'welcome', kind: 'welcome',    title: 'Welcome' },
];

const STORAGE_KEY = 'madgwick-onboarding';

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  agreed: false,
  role: null,
  goals: [],
  state: '',
  heard: null,
};

export default function App() {
  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  // Restore from localStorage on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (typeof parsed.stepIdx === 'number') setStepIdx(parsed.stepIdx);
      }
    } catch {}
  }, []);

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, stepIdx })); } catch {}
  }, [form, stepIdx]);

  // useCallback with empty deps is safe here because all three functions use
  // functional updaters (no direct closure over state), so they never need
  // to be re-created after mount.
  const set  = useCallback((key, value) => setForm(f => ({ ...f, [key]: value })), []);
  const next = useCallback(() => setStepIdx(i => Math.min(STEPS.length - 1, i + 1)), []);
  const back = useCallback(() => setStepIdx(i => Math.max(0, i - 1)), []);
  const skip = next; // skip is semantically identical to next

  const step = STEPS[stepIdx];
  const showBack = stepIdx > 0 && step.id !== 'welcome';

  const handleEnterDashboard = () => {
    localStorage.removeItem(STORAGE_KEY);
    // TODO: Replace with navigate('/dashboard') once react-router-dom is added.
    // Resets the prototype so it can be demoed again without a page refresh.
    setForm(EMPTY_FORM);
    setStepIdx(0);
  };

  let screen;
  switch (step.id) {
    case 'signup':
      screen = <SignupScreen form={form} set={set} next={next} />;
      break;
    case 'verify':
      screen = <VerifyEmailScreen form={form} set={set} next={next} />;
      break;
    case 'profile':
      screen = <ProfileScreen form={form} set={set} next={next} skip={skip} />;
      break;
    case 'welcome':
      screen = <WelcomeScreen form={form} onEnter={handleEnterDashboard} />;
      break;
    default:
      screen = null;
  }

  return (
    <div className="frame">
      <header className="topbar">
        <BrandMark />
        <div className="topbar-right">
          {showBack && (
            <button className="topbar-back" onClick={back} aria-label="Back">
              <Icon name="chevron-left" size={14} /> Back
            </button>
          )}
        </div>
      </header>

      <main className="page">{screen}</main>
    </div>
  );
}
