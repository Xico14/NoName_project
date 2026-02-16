from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes import router


app = FastAPI()
app.include_router(router)
client = TestClient(app)


def test_live_endpoint_returns_ok() -> None:
    response = client.get("/api/v1/health/live")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_ready_endpoint_returns_stubbed_checks() -> None:
    response = client.get("/api/v1/health/ready")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "checks": {
            "database": {"status": "not_implemented"},
            "cache": {"status": "not_implemented"},
            "external_services": {"status": "not_implemented"},
        },
    }
