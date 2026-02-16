from fastapi.testclient import TestClient

from app.main import app


def test_frontend_home_served() -> None:
    client = TestClient(app)

    response = client.get("/")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Инновационный интерфейс 2026" in response.text
