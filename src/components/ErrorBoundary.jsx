import { Component } from 'react';

/**
 * Top-level error boundary — catches unhandled render errors so the whole
 * app doesn't blank out.  Wrap around <App /> in main.jsx.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Replace with your real error-reporting service (Sentry, Datadog, etc.)
    console.error('[ErrorBoundary] Uncaught render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          fontFamily: 'var(--font-sans, sans-serif)',
          textAlign: 'center',
          gap: '12px',
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--foreground, #333)' }}>
            Something went wrong
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted-foreground, #666)', maxWidth: '360px' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--border, #ddd)',
              background: 'var(--background, #fff)',
              color: 'var(--foreground, #333)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
