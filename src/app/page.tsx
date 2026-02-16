'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBackendHealth, type HealthStatus } from '../shared/api/health';

type ViewState =
  | { status: 'loading' }
  | { status: 'success'; data: HealthStatus }
  | { status: 'error'; message: string };

export default function Page() {
  const [viewState, setViewState] = useState<ViewState>({ status: 'loading' });

  const loadHealthStatus = useCallback(async () => {
    setViewState({ status: 'loading' });

    try {
      const data = await getBackendHealth();
      setViewState({ status: 'success', data });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setViewState({ status: 'error', message });
    }
  }, []);

  useEffect(() => {
    void loadHealthStatus();
  }, [loadHealthStatus]);

  return (
    <main style={{ maxWidth: 680, margin: '32px auto', padding: 16, fontFamily: 'sans-serif' }}>
      <section
        style={{
          border: '1px solid #d1d5db',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
        }}
      >
        <h1>Backend status</h1>

        {viewState.status === 'loading' && <p>Loading backend health…</p>}

        {viewState.status === 'error' && (
          <div>
            <p role="alert">Could not load backend health: {viewState.message}</p>
            <button type="button" onClick={() => void loadHealthStatus()}>
              Retry
            </button>
          </div>
        )}

        {viewState.status === 'success' && (
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{viewState.data.status}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{viewState.data.service}</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{viewState.data.version}</dd>
            </div>
            <div>
              <dt>Environment</dt>
              <dd>{viewState.data.environment}</dd>
            </div>
          </dl>
        )}
      </section>
    </main>
  );
}
