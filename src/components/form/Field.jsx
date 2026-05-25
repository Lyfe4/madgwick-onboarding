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
      {/* aria-live="polite" ensures screen readers announce validation messages
          as they appear without interrupting the user mid-typing. */}
      <span aria-live="polite" aria-atomic="true">
        {error ? (
          <span className="help error" role="alert">{error}</span>
        ) : help ? (
          <span className="help">{help}</span>
        ) : null}
      </span>
    </label>
  );
}
