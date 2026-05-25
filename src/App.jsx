import { useEffect, useState } from 'react';
import Icon from './components/Icon.jsx';
import BrandMark from './components/BrandMark.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import VerifyEmailScreen from './screens/VerifyEmailScreen.jsx';
import SingleSelectScreen from './screens/SingleSelectScreen.jsx';
import MultiSelectChipsScreen from './screens/MultiSelectChipsScreen.jsx';
import OrgScreen from './screens/OrgScreen.jsx';
import LocationScreen from './screens/LocationScreen.jsx';
import HeardScreen from './screens/HeardScreen.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import {
  ROLE_OPTIONS, EXPERIENCE_OPTIONS, GOAL_OPTIONS, INTEREST_OPTIONS,
} from './data/options.js';

const STEPS = [
  { id: 'signup',       kind: 'auth',       title: 'Create account' },
  { id: 'verify',       kind: 'auth',       title: 'Verify email' },
  { id: 'role',         kind: 'onboarding', title: 'Your role' },
  { id: 'experience',   kind: 'onboarding', title: 'Experience' },
  { id: 'goals',        kind: 'onboarding', title: 'Goals' },
  { id: 'interests',    kind: 'onboarding', title: 'Interests' },
  { id: 'organisation', kind: 'onboarding', title: 'Organisation' },
  { id: 'location',     kind: 'onboarding', title: 'Location' },
  { id: 'heard',        kind: 'onboarding', title: 'How you heard' },
  { id: 'welcome',      kind: 'welcome',    title: 'Welcome' },
];

const STORAGE_KEY = 'madgwick-onboarding';

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  agreed: false, marketing: false,
  role: null, experience: null,
  goals: [], interests: [],
  organisation: '', preferNot: false,
  state: '', postcode: '',
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

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const next = () => setStepIdx(i => Math.min(STEPS.length - 1, i + 1));
  const back = () => setStepIdx(i => Math.max(0, i - 1));
  const skip = () => next();

  const step = STEPS[stepIdx];
  const onboardingSteps = STEPS.filter(s => s.kind === 'onboarding');
  const onboardingIdx = onboardingSteps.findIndex(s => s.id === step.id);
  const showProgress = step.kind === 'onboarding';
  const progressValue = showProgress ? (onboardingIdx + 1) / onboardingSteps.length : 0;
  const progressLabel = showProgress ? `Step ${onboardingIdx + 1} of ${onboardingSteps.length}` : '';
  const showBack = stepIdx > 0 && step.id !== 'welcome';

  const handleEnterDashboard = () => {
    // In a real app this would route to /lessons or /dashboard.
    // For the standalone prototype, we just reset.
    localStorage.removeItem(STORAGE_KEY);
    alert("Off to the dashboard! (Hook this up to your real router or use window.location.)");
  };

  let screen;
  switch (step.id) {
    case 'signup':
      screen = <SignupScreen form={form} set={set} next={next} />;
      break;
    case 'verify':
      screen = <VerifyEmailScreen form={form} set={set} next={next} />;
      break;
    case 'role':
      screen = (
        <SingleSelectScreen
          title="What best describes your role?"
          sub="Help us tailor your experience — we'll surface content that fits where you are."
          options={ROLE_OPTIONS}
          value={form.role}
          onChange={v => set('role', v)}
          next={next} skip={skip}
        />
      );
      break;
    case 'experience':
      screen = (
        <SingleSelectScreen
          title="How experienced are you?"
          sub="There's no wrong answer — we'll pitch the content to match."
          options={EXPERIENCE_OPTIONS}
          value={form.experience}
          onChange={v => set('experience', v)}
          next={next} skip={skip}
        />
      );
      break;
    case 'goals':
      screen = (
        <MultiSelectChipsScreen
          title="What are you hoping to get out of Madgwick Studio?"
          sub="We'll recommend a starting point at the end."
          options={GOAL_OPTIONS}
          value={form.goals}
          onChange={v => set('goals', v)}
          next={next} skip={skip}
        />
      );
      break;
    case 'interests':
      screen = (
        <MultiSelectChipsScreen
          title="Which areas interest you?"
          sub="These become content tags."
          options={INTEREST_OPTIONS}
          value={form.interests}
          onChange={v => set('interests', v)}
          next={next} skip={skip}
        />
      );
      break;
    case 'organisation':
      screen = <OrgScreen form={form} set={set} next={next} skip={skip} />;
      break;
    case 'location':
      screen = <LocationScreen form={form} set={set} next={next} skip={skip} />;
      break;
    case 'heard':
      screen = <HeardScreen form={form} set={set} next={next} skip={skip} />;
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
        {showProgress && <ProgressBar value={progressValue} label={progressLabel} />}
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
