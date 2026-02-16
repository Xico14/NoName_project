from __future__ import annotations

from time import perf_counter
from uuid import uuid4

import structlog
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = structlog.get_logger("app.request")


class RequestIDMiddleware(BaseHTTPMiddleware):
    """Bind and propagate request IDs through request handling."""

    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get("X-Request-ID") or str(uuid4())
        method = request.method
        path = request.url.path

        logger.info(
            "request_start",
            method=method,
            path=path,
            status_code=None,
            duration_ms=None,
        )

        started_at = perf_counter()

        with structlog.contextvars.bound_contextvars(request_id=request_id):
            response = await call_next(request)

        duration_ms = round((perf_counter() - started_at) * 1000, 2)

        response.headers["X-Request-ID"] = request_id
        logger.info(
            "request_end",
            method=method,
            path=path,
            status_code=response.status_code,
            duration_ms=duration_ms,
        )

        return response
