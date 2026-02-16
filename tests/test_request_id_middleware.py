from fastapi.testclient import TestClient

from app.main import app

REQUEST_ID_HEADER = 'X-Request-ID'


def test_response_contains_request_id_header() -> None:
    client = TestClient(app)

    response = client.get('/health')

    assert response.status_code == 200
    assert REQUEST_ID_HEADER in response.headers
    assert response.headers[REQUEST_ID_HEADER]


def test_request_id_header_is_reused_when_provided() -> None:
    client = TestClient(app)
    request_id = 'frontend-trace-id'

    response = client.get('/health', headers={REQUEST_ID_HEADER: request_id})

    assert response.headers[REQUEST_ID_HEADER] == request_id
