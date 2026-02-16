# NoName_project

## MVP стек

Для MVP выбран стек **Python + FastAPI**.

## Структура проекта

- `src/` — исходный код приложения.
- `src/main.py` — точка входа FastAPI-приложения.
- `tests/` — тесты.
- `Makefile` — команды запуска и тестов.
- `requirements.txt` — зависимости.

## Установка зависимостей

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Локальный запуск

```bash
make run
```

По умолчанию приложение будет доступно на `http://localhost:8000`.

## Проверка health-check

```bash
curl -i http://localhost:8000/health
```

Ожидаемый результат:

- HTTP-статус: `200 OK`
- Тело ответа: `OK`

## Запуск тестов

```bash
make test
```
