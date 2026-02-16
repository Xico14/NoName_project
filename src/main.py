from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI(title="NoName_project MVP")


@app.get("/health", response_class=PlainTextResponse)
def health_check() -> str:
    return "OK"
