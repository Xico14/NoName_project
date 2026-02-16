# NoName_project

MVP-платформа на FastAPI (Python 3.12+) с backend API и встроенным frontend-интерфейсом в стиле 2026:
- конфигурация через `pydantic-settings`
- структурированное логирование (`structlog`)
- versioned API (`/api/v1/*`)
- инновационный web UI (glassmorphism + realtime health status)
- статический анализ (`ruff`, `mypy`) и тесты (`pytest`)

## Структура

- `app/main.py` — входная точка FastAPI и подключение статики
- `app/api/routes.py` — API-роуты (`/api/v1/health`)
- `app/web/routes.py` — web-роуты (`/`)
- `app/web/static/` — frontend (`index.html`, `styles.css`, `app.js`)
- `app/core/config.py` — настройки приложения
- `app/core/logging.py` — конфигурация логирования
- `tests/test_health.py` — smoke-тест health-check
- `tests/web/test_frontend.py` — smoke-тест frontend страницы

## Быстрый старт

1. Установить [uv](https://docs.astral.sh/uv/)
2. Установить зависимости:
   ```bash
   make install
   ```
3. Запустить приложение:
   ```bash
   make run
   ```
4. Открыть UI:
   - `http://localhost:8000/`
5. Проверить API:
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

## Проверки качества

```bash
make lint
make typecheck
make test
```
