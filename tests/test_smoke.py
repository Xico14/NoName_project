import json
import os
import socket
import subprocess
import sys
import time
from pathlib import Path
from urllib.request import urlopen


def _get_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def test_entrypoint_starts_and_healthcheck_responds() -> None:
    port = _get_free_port()
    env = os.environ.copy()
    env["PORT"] = str(port)

    project_root = Path(__file__).resolve().parents[1]
    src_path = str(project_root / "src")
    existing_pythonpath = env.get("PYTHONPATH", "")
    env["PYTHONPATH"] = (
        src_path if not existing_pythonpath else f"{src_path}{os.pathsep}{existing_pythonpath}"
    )

    process = subprocess.Popen(
        [sys.executable, "-m", "noname_project"],
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        deadline = time.time() + 10
        while time.time() < deadline:
            if process.poll() is not None:
                raise AssertionError(
                    "Application process exited before health-check became available"
                )

            try:
                with urlopen(f"http://127.0.0.1:{port}/health", timeout=1) as response:
                    assert response.status == 200
                    payload = json.loads(response.read().decode("utf-8"))
                    assert payload == {"status": "ok"}
                    return
            except OSError:
                time.sleep(0.2)

        raise AssertionError("Health-check endpoint did not become ready in time")
    finally:
        process.terminate()
        process.wait(timeout=5)
