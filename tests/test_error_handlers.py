from fastapi.testclient import TestClient

from app.main import app


def test_validation_error_returns_unified_format():
    client = TestClient(app)

    response = client.get("/items/not-an-int", headers={"x-request-id": "req-422"})

    assert response.status_code == 422
    body = response.json()
    assert body["code"] == "VALIDATION_ERROR"
    assert body["message"] == "Request validation failed"
    assert isinstance(body["details"], list)
    assert body["request_id"] == "req-422"
    assert isinstance(body["timestamp"], str)


def test_internal_error_returns_unified_format():
    client = TestClient(app, raise_server_exceptions=False)

    response = client.get("/boom", headers={"x-request-id": "req-500"})

    assert response.status_code == 500
    body = response.json()
    assert body["code"] == "INTERNAL_SERVER_ERROR"
    assert body["message"] == "Internal server error"
    assert body["details"] is None
    assert body["request_id"] == "req-500"
    assert isinstance(body["timestamp"], str)
