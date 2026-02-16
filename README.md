# NoName_project

## Health endpoints

The API exposes two health probes under `/api/v1/health`:

- `GET /api/v1/health/live` — lightweight liveness probe that only confirms the process is alive and can serve HTTP.
- `GET /api/v1/health/ready` — readiness probe scaffold for dependency checks (database, cache, external services). Currently returns stubbed `not_implemented` statuses.

### Example responses

`GET /api/v1/health/live`

```json
{
  "status": "ok"
}
```

`GET /api/v1/health/ready`

```json
{
  "status": "ok",
  "checks": {
    "database": {"status": "not_implemented"},
    "cache": {"status": "not_implemented"},
    "external_services": {"status": "not_implemented"}
  }
}
```

## Smoke tests

Smoke tests for health endpoints are located in `tests/test_health.py`.
