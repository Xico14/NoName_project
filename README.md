# NoName_project

## Run backend + frontend together

### 1. Backend

From the project root, run your backend on `http://localhost:8000` so the health endpoint is available at `GET /api/v1/health`.

### 2. Frontend setup

```bash
cd frontend
cp .env.example .env.local
npm install
```

### 3. Start frontend

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000` and will call backend URL from `NEXT_PUBLIC_API_BASE_URL`.
