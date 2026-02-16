'use client';

import { useEffect, useState } from 'react';
import { getHealth, type HealthResponse } from '@/shared/api/client';

type HealthState =
  | { status: 'loading' }
  | { status: 'success'; data: HealthResponse }
  | { status: 'error'; message: string };

export default function HomePage() {
  const [healthState, setHealthState] = useState<HealthState>({ status: 'loading' });

  useEffect(() => {
    const loadHealth = async () => {
      setHealthState({ status: 'loading' });
      try {
        const data = await getHealth();
        setHealthState({ status: 'success', data });
      } catch (error) {
        setHealthState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    void loadHealth();
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-6">
      <section className="w-full rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Backend health status</h1>

        {healthState.status === 'loading' && (
          <p className="text-slate-600">Loading health status...</p>
        )}

        {healthState.status === 'success' && (
          <div className="rounded-md bg-emerald-50 p-4 text-emerald-700">
            <p className="font-medium">Success</p>
            <p>status: {healthState.data.status}</p>
          </div>
        )}

        {healthState.status === 'error' && (
          <div className="rounded-md bg-rose-50 p-4 text-rose-700">
            <p className="font-medium">Error</p>
            <p>{healthState.message}</p>
          </div>
        )}
      </section>
    </main>
  );
}
