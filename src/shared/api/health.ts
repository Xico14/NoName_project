export type HealthStatus = {
  status: string;
  service: string;
  version: string;
  environment: string;
};

export async function getBackendHealth(): Promise<HealthStatus> {
  const response = await fetch('/api/v1/health', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to load backend status: ${response.status}`);
  }

  return (await response.json()) as HealthStatus;
}
