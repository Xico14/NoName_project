from __future__ import annotations

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette import status

from app.api.errors import ErrorResponse, build_error_response

app = FastAPI()

HTTP_ERROR_CODES = {
    status.HTTP_400_BAD_REQUEST: "bad_request",
    status.HTTP_401_UNAUTHORIZED: "unauthorized",
    status.HTTP_403_FORBIDDEN: "forbidden",
    status.HTTP_404_NOT_FOUND: "not_found",
    status.HTTP_409_CONFLICT: "conflict",
    status.HTTP_429_TOO_MANY_REQUESTS: "too_many_requests",
}


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    code = HTTP_ERROR_CODES.get(exc.status_code, "http_error")
    payload = build_error_response(
        request=request,
        code=code,
        message="HTTP error",
        details={"reason": exc.detail},
    )
    return JSONResponse(status_code=exc.status_code, content=payload.model_dump())


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    payload = build_error_response(
        request=request,
        code="validation_error",
        message="Validation failed",
        details=exc.errors(),
    )
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=payload.model_dump(),
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    payload = build_error_response(
        request=request,
        code="internal_server_error",
        message="Internal server error",
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=payload.model_dump(),
    )


class InputPayload(BaseModel):
    value: int


@app.get("/bad-request")
async def bad_request() -> None:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bad input")


@app.post("/items")
async def create_item(payload: InputPayload) -> dict[str, int]:
    return {"value": payload.value}


@app.get("/boom")
async def boom() -> None:
    raise RuntimeError("Unexpected failure")
