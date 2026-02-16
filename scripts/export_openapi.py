#!/usr/bin/env python3
"""Export project OpenAPI schema to a versioned JSON file."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def build_openapi_schema() -> dict:
    """Single source of truth for the public HTTP API contract."""
    return {
        "openapi": "3.0.3",
        "info": {
            "title": "NoName Project API",
            "version": "1.0.0",
            "description": "Public API contract for NoName Project.",
        },
        "servers": [{"url": "https://api.example.com"}],
        "paths": {
            "/health": {
                "get": {
                    "summary": "Health check",
                    "operationId": "getHealth",
                    "responses": {
                        "200": {
                            "description": "Service is healthy",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "required": ["status"],
                                        "properties": {
                                            "status": {
                                                "type": "string",
                                                "example": "ok",
                                            }
                                        },
                                    }
                                }
                            },
                        }
                    },
                }
            }
        },
    }


def export_schema(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    schema = build_openapi_schema()
    output_path.write_text(
        json.dumps(schema, indent=2, ensure_ascii=False, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output",
        default="openapi/openapi.v1.json",
        type=Path,
        help="Where to write the generated OpenAPI JSON schema.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    export_schema(args.output)


if __name__ == "__main__":
    main()
