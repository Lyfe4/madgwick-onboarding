export default function ProgressBar({ value, label }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div className="progress-area">
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Onboarding progress"
        aria-valuenow={pct}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {label && <span className="progress-label">{label}</span>}
    </div>
  );
}
