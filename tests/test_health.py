from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_health_check_returns_200_and_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.text == "OK"
