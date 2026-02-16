from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

_UI_INDEX = Path(__file__).resolve().parent / "static" / "index.html"


@router.get("/", include_in_schema=False)
def frontend_home() -> FileResponse:
    return FileResponse(_UI_INDEX)
