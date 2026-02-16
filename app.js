const STORAGE_KEY = "noname:appearance";

const defaults = {
  themeMode: "auto",
  density: "comfortable",
  accent: "ocean",
};

const root = document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return { ...defaults };
  }
}

function savePreferences(preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

function resolveTheme(themeMode) {
  if (themeMode === "auto") {
    return mediaQuery.matches ? "dark" : "light";
  }
  return themeMode;
}

function updateButtonState(containerId, attrName, selectedValue) {
  const buttons = document.querySelectorAll(`#${containerId} [${attrName}]`);
  buttons.forEach((button) => {
    const checked = button.getAttribute(attrName) === selectedValue;
    button.setAttribute("aria-checked", String(checked));
    button.setAttribute("role", "radio");
  });
}

function applyPreferences(preferences) {
  root.dataset.themeMode = preferences.themeMode;
  root.dataset.theme = resolveTheme(preferences.themeMode);
  root.dataset.density = preferences.density;
  root.dataset.accent = preferences.accent;

  updateButtonState("theme-mode-group", "data-theme-mode", preferences.themeMode);
  updateButtonState("density-group", "data-density", preferences.density);
  updateButtonState("accent-group", "data-accent", preferences.accent);
}

function initGroup(containerId, attrName, onChange) {
  const container = document.getElementById(containerId);
  container?.addEventListener("click", (event) => {
    const button = event.target.closest(`[${attrName}]`);
    if (!button) return;
    onChange(button.getAttribute(attrName));
  });
}

let preferences = loadPreferences();
applyPreferences(preferences);

mediaQuery.addEventListener("change", () => {
  if (preferences.themeMode === "auto") {
    root.dataset.theme = resolveTheme("auto");
  }
});

initGroup("theme-mode-group", "data-theme-mode", (value) => {
  preferences.themeMode = value;
  applyPreferences(preferences);
  savePreferences(preferences);
});

initGroup("density-group", "data-density", (value) => {
  preferences.density = value;
  applyPreferences(preferences);
  savePreferences(preferences);
});

initGroup("accent-group", "data-accent", (value) => {
  preferences.accent = value;
  applyPreferences(preferences);
  savePreferences(preferences);
});

document.getElementById("reset-preferences")?.addEventListener("click", () => {
  preferences = { ...defaults };
  applyPreferences(preferences);
  savePreferences(preferences);
});
