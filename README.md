# NoName_project

Простой сервис на FastAPI с health-check endpoint.

## Запуск приложения

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt -r requirements-dev.txt
python -m noname_project
```

По умолчанию сервис поднимается на `http://127.0.0.1:8000`.
Health-check доступен по `GET /health`.

## Локальные проверки (те же команды, что в CI)

```bash
ruff check .
ruff format --check .
pytest
```
