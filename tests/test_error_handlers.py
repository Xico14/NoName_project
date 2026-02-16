from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app, raise_server_exceptions=False)


REQUIRED_FIELDS = {"code", "message", "details", "request_id", "timestamp"}


def assert_error_schema(body: dict) -> None:
    assert REQUIRED_FIELDS.issubset(body.keys())
    assert isinstance(body["code"], str)
    assert isinstance(body["message"], str)
    assert isinstance(body["request_id"], str)
    assert isinstance(body["timestamp"], str)


def test_http_400_error_contract() -> None:
    response = client.get("/bad-request", headers={"x-request-id": "test-request-400"})

    assert response.status_code == 400
    body = response.json()
    assert_error_schema(body)
    assert body["code"] == "bad_request"
    assert body["message"] == "HTTP error"
    assert body["details"] == {"reason": "Bad input"}
    assert body["request_id"] == "test-request-400"


def test_http_422_error_contract() -> None:
    response = client.post("/items", json={"value": "not-an-int"})

    assert response.status_code == 422
    body = response.json()
    assert_error_schema(body)
    assert body["code"] == "validation_error"
    assert body["message"] == "Validation failed"
    assert isinstance(body["details"], list)
    assert body["details"][0]["loc"][-1] == "value"


def test_http_500_error_contract() -> None:
    response = client.get("/boom")

    assert response.status_code == 500
    body = response.json()
    assert_error_schema(body)
    assert body["code"] == "internal_server_error"
    assert body["message"] == "Internal server error"
    assert body["details"] is None
