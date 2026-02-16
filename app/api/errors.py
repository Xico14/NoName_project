from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    code: str
    message: str
    details: Any | None = None
    request_id: str = Field(default="unknown")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
