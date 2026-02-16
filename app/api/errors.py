from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from fastapi import Request
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    code: str
    message: str
    details: Any | None = None
    request_id: str
    timestamp: str


def get_request_id(request: Request) -> str:
    return request.headers.get("x-request-id") or str(uuid4())


def utc_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def build_error_response(
    *,
    request: Request,
    code: str,
    message: str,
    details: Any | None = None,
) -> ErrorResponse:
    return ErrorResponse(
        code=code,
        message=message,
        details=details,
        request_id=get_request_id(request),
        timestamp=utc_timestamp(),
    )
