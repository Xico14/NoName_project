from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")


@router.get("/health/live")
def health_live() -> dict[str, str]:
    """Liveness probe: process is up and responding."""
    return {"status": "ok"}


@router.get("/health/ready")
def health_ready() -> dict[str, str]:
    """Readiness probe placeholder for dependency checks."""
    # TODO: add dependency checks (database, cache, queue, external services)
    return {"status": "ok", "checks": "not_implemented"}
