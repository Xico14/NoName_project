.PHONY: install lint format typecheck test run

install:
	uv sync --dev

lint:
	uv run ruff check .

format:
	uv run ruff format .

typecheck:
	uv run mypy app

test:
	uv run pytest

run:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
