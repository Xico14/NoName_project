const badge = document.querySelector("#health-badge");
const serviceName = document.querySelector("#service-name");
const serviceVersion = document.querySelector("#service-version");
const serviceEnv = document.querySelector("#service-env");
const refreshBtn = document.querySelector("#refresh-btn");

function setBadgeState(type, text) {
  badge.classList.remove("loading", "ok", "fail");
  badge.classList.add(type);
  badge.textContent = text;
}

async function loadHealth() {
  setBadgeState("loading", "Проверяем...");

  try {
    const response = await fetch("/api/v1/health", { headers: { Accept: "application/json" } });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    serviceName.textContent = payload.service ?? "—";
    serviceVersion.textContent = payload.version ?? "—";
    serviceEnv.textContent = payload.environment ?? "—";
    setBadgeState("ok", "Работает");
  } catch (error) {
    console.error(error);
    serviceName.textContent = "—";
    serviceVersion.textContent = "—";
    serviceEnv.textContent = "—";
    setBadgeState("fail", "Недоступен");
  }
}

refreshBtn.addEventListener("click", () => {
  void loadHealth();
});

void loadHealth();
