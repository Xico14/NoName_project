# NoName_project

MVP backend на FastAPI (Python 3.12+) с базовой production-ready структурой под стандарты 2026:
- конфигурация через `pydantic-settings`
- структурированное логирование (`structlog`)
- health-check endpoint
- статический анализ (`ruff`, `mypy`) и тесты (`pytest`)

## Структура

- `app/main.py` — входная точка FastAPI
- `app/api/routes.py` — API-роуты (`/api/v1/health`)
- `app/core/config.py` — настройки приложения
- `app/core/logging.py` — конфигурация логирования
- `tests/test_health.py` — smoke-тест health-check

## Быстрый старт

1. Установить [uv](https://docs.astral.sh/uv/)
2. Установить зависимости:
   ```bash
   make install
   ```
3. Запустить backend:
   ```bash
   make run
   ```
4. Проверить health-check:
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

## Проверки качества

```bash
make lint
make typecheck
make test
```

---

Дальше можно переходить к frontend MVP с инновационным UX/UI и дизайн-системой 2026.
