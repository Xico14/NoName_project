const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=6';
const CACHE_KEY = 'pwa-last-success';
const MAX_RETRIES = 3;

const stateEls = {
  loading: document.getElementById('state-loading'),
  empty: document.getElementById('state-empty'),
  error: document.getElementById('state-error'),
  offline: document.getElementById('state-offline'),
  data: document.getElementById('state-data')
};

const errorMessageEl = document.getElementById('error-message');
const bannerEl = document.getElementById('status-banner');
const itemsEl = document.getElementById('items');
const installBtn = document.getElementById('install-btn');
let deferredInstallPrompt;

const hideAllStates = () => {
  Object.values(stateEls).forEach((el) => el.classList.add('hidden'));
};

const showState = (name) => {
  hideAllStates();
  stateEls[name].classList.remove('hidden');
};

const showBanner = (message) => {
  bannerEl.textContent = message;
  bannerEl.classList.remove('hidden');
};

const hideBanner = () => {
  bannerEl.classList.add('hidden');
  bannerEl.textContent = '';
};

const renderItems = (items) => {
  itemsEl.innerHTML = items
    .map((item) => `<li><strong>${item.title}</strong><br/>${item.completed ? 'Выполнено' : 'В работе'}</li>`)
    .join('');
};

const saveCache = (items) => {
  const payload = { timestamp: Date.now(), items };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
};

const readCache = () => {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const fetchWithRetries = async () => {
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(API_URL, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        showBanner(`Сеть нестабильна. Попытка ${attempt + 1} из ${MAX_RETRIES}...`);
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }

  throw lastError;
};

const loadData = async () => {
  hideBanner();
  showState('loading');

  const cached = readCache();
  if (!navigator.onLine) {
    if (cached?.items?.length) {
      renderItems(cached.items);
      showBanner('Вы офлайн. Показаны сохранённые данные.');
      showState('data');
      return;
    }
    showState('offline');
    return;
  }

  try {
    const items = await fetchWithRetries();
    if (!Array.isArray(items) || items.length === 0) {
      showState('empty');
      return;
    }

    renderItems(items);
    saveCache(items);
    showState('data');
  } catch (error) {
    if (cached?.items?.length) {
      renderItems(cached.items);
      showBanner('Сервер недоступен. Показаны последние сохранённые данные.');
      showState('data');
      return;
    }

    errorMessageEl.textContent = `Причина: ${error.message}. Повторите попытку.`;
    showState('error');
  }
};

window.addEventListener('online', () => {
  showBanner('Соединение восстановлено. Обновляем данные...');
  loadData();
});

window.addEventListener('offline', () => {
  const cached = readCache();
  if (cached?.items?.length) {
    showBanner('Сеть недоступна. Используем данные из кэша.');
    renderItems(cached.items);
    showState('data');
    return;
  }
  showState('offline');
});

document.querySelectorAll('[data-action="retry"]').forEach((button) => {
  button.addEventListener('click', loadData);
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installBtn.classList.add('hidden');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}

loadData();
