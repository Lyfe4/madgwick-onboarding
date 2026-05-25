export default function Field({ label, htmlFor, required, help, error, children }) {
  return (
    <label className="field" htmlFor={htmlFor}>
      {label && (
        <span className="label">
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
          {required && <span className="sr-only"> (required)</span>}
        </span>
      )}
      {children}
      {/*
        aria-live="polite" on the wrapper announces changes without interrupting
        the user mid-typing.  We intentionally do NOT add role="alert" to the
        inner span — role="alert" implies aria-live="assertive", which combined
        with the polite outer live-region causes many screen readers to fire
        the announcement twice.  One live region, one announcement.
      */}
      <span aria-live="polite" aria-atomic="true">
        {error ? (
          <span className="help error">{error}</span>
        ) : help ? (
          <span className="help">{help}</span>
        ) : null}
      </span>
    </label>
  );
}
