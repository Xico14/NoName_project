# NoName_project

![Backend CI](https://github.com/<OWNER>/<REPO>/actions/workflows/backend-ci.yml/badge.svg)

## CI

Пайплайн `Backend CI` запускается для:
- каждого `pull_request`;
- каждого `push` в `main`.

### Обязательные проверки
- `uv sync --dev`
- `uv run ruff check .`
- `uv run mypy app`
- `uv run pytest`
