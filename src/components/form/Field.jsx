export default function Field({ label, htmlFor, required, help, error, children }) {
  return (
    <label className="field" htmlFor={htmlFor}>
      {label && (
        <span className="label">
          {label}
          {required && <span className="req">*</span>}
        </span>
      )}
      {children}
      {error ? (
        <span className="help error">{error}</span>
      ) : help ? (
        <span className="help">{help}</span>
      ) : null}
    </label>
  );
}
