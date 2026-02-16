from fastapi import FastAPI

app = FastAPI(title="NoName Project")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
