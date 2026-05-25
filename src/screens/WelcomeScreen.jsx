import Icon from '../components/Icon.jsx';
import { RECS } from '../data/options.js';

export default function WelcomeScreen({ form, onEnter }) {
  // Pick up to two recs based on goals; fall back to "explore" if nothing chosen.
  const goalIds = form.goals && form.goals.length ? form.goals : ['explore'];
  const recs = goalIds.slice(0, 2).map(g => ({ id: g, ...RECS[g] })).filter(r => r.title);
  const firstName = form.firstName || '';

  return (
    <div className="page-inner">
      <div className="welcome-mark">
        <img src="/mark.svg" alt="Madgwick Studio"/>
      </div>
      <div className="page-head" style={{ alignItems: 'center', textAlign: 'center' }}>
        <span className="eyebrow">You&rsquo;re all set</span>
        <h1>{firstName ? `Welcome, ${firstName}.` : 'Welcome to Madgwick Studio.'}</h1>
        <p>
          {recs.length > 0
            ? "Based on what you told us, here's where we'd suggest starting."
            : "Your workspace is ready. Jump in whenever you're ready."}
        </p>
      </div>

      {recs.length > 0 && (
        <div className="welcome-cards">
          {recs.map(r => (
            // type="button" prevents the browser treating these as form-submit
            // triggers if the component is ever rendered inside a <form>.
            // onClick is intentionally a no-op placeholder — swap for
            // navigate(`/courses/${r.id}`) once react-router-dom is wired up.
            <button key={r.id} type="button" className="rec-card" onClick={onEnter}>
              <span className="rec-thumb">
                <Icon name={r.icon} size={18} />
              </span>
              <span className="rec-body">
                <span className="rec-title">{r.title}</span>
                <span className="rec-meta">{r.meta}</span>
              </span>
              <Icon name="arrow-right" size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
            </button>
          ))}
        </div>
      )}

      <div className="actions">
        <button type="button" className="btn-primary" onClick={onEnter}>
          Take me to my dashboard
          <Icon name="arrow-right" size={16} />
        </button>
        <button type="button" className="skip-link" onClick={onEnter}>I&rsquo;ll explore on my own</button>
      </div>
    </div>
  );
}
