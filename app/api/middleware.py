import time
from uuid import uuid4

import structlog
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

REQUEST_ID_HEADER = "X-Request-ID"
logger = structlog.get_logger(__name__)


class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get(REQUEST_ID_HEADER) or str(uuid4())
        structlog.contextvars.bind_contextvars(request_id=request_id)

        method = request.method
        path = request.url.path
        started_at = time.perf_counter()

        logger.info(
            "incoming_request",
            method=method,
            path=path,
        )

        try:
            response = await call_next(request)
            latency_ms = (time.perf_counter() - started_at) * 1000

            logger.info(
                "request_completed",
                method=method,
                path=path,
                status_code=response.status_code,
                latency_ms=round(latency_ms, 2),
            )
            response.headers[REQUEST_ID_HEADER] = request_id
            return response
        finally:
            structlog.contextvars.clear_contextvars()
