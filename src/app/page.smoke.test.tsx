import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Health status page smoke', () => {
  it('renders backend status fields after successful request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'ok',
          service: 'backend-api',
          version: '1.2.3',
          environment: 'production'
        })
      })
    );

    render(<Page />);

    expect(screen.getByText('Loading backend health…')).toBeInTheDocument();

    expect(await screen.findByText('ok')).toBeInTheDocument();
    expect(screen.getByText('backend-api')).toBeInTheDocument();
    expect(screen.getByText('1.2.3')).toBeInTheDocument();
    expect(screen.getByText('production')).toBeInTheDocument();
  });
});
