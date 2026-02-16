from fastapi import APIRouter, status

router = APIRouter(prefix="/api/v1")


@router.get("/health/live", status_code=status.HTTP_200_OK)
def health_live() -> dict[str, str]:
    """Liveness probe: verifies that the process is up and serving requests."""
    return {"status": "ok"}


@router.get("/health/ready", status_code=status.HTTP_200_OK)
def health_ready() -> dict[str, object]:
    """Readiness probe scaffold for dependency checks (DB/cache/external services)."""
    checks = {
        "database": {"status": "not_implemented"},
        "cache": {"status": "not_implemented"},
        "external_services": {"status": "not_implemented"},
    }
    return {"status": "ok", "checks": checks}
