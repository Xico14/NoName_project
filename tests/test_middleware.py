from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.middleware import RequestIDMiddleware


def test_response_contains_x_request_id_header() -> None:
    app = FastAPI()
    app.add_middleware(RequestIDMiddleware)

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    assert "X-Request-ID" in response.headers
    assert response.headers["X-Request-ID"]
