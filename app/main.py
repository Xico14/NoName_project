from fastapi import FastAPI

from app.api.middleware import RequestIDMiddleware

app = FastAPI()
app.add_middleware(RequestIDMiddleware)


@app.get('/health')
async def health() -> dict[str, str]:
    return {'status': 'ok'}
