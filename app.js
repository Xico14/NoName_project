const screenContainer = document.getElementById("screenContainer");
const screenTitle = document.getElementById("screenTitle");
const navItems = Array.from(document.querySelectorAll(".nav-item"));

const screens = {
  home: { title: "Главная", subtitle: "Лента и быстрые действия" },
  search: { title: "Поиск", subtitle: "Находите товары и сервисы" },
  orders: { title: "Заказы", subtitle: "Трекинг и история статусов" },
  profile: { title: "Профиль", subtitle: "Настройки аккаунта" }
};

let currentScreen = "home";

const sampleStates = ["content", "empty", "error"];

function setViewportHeight() {
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
}

function renderSkeleton() {
  const tpl = document.getElementById("skeletonTemplate");
  screenContainer.innerHTML = "";
  screenContainer.appendChild(tpl.content.cloneNode(true));
}

function renderState(type) {
  const tpl = document.getElementById("stateTemplate");
  const node = tpl.content.cloneNode(true);
  const title = node.querySelector(".state-title");
  const text = node.querySelector(".state-text");

  if (type === "offline") {
    title.textContent = "Нет сети";
    text.textContent = "Проверьте подключение и повторите попытку.";
  } else if (type === "error") {
    title.textContent = "Что-то пошло не так";
    text.textContent = "Не удалось загрузить данные, попробуйте снова.";
    node.querySelector(".state-card").style.borderColor = "#fecaca";
    node.querySelector(".state-title").style.color = "#b91c1c";
  } else {
    title.textContent = "Пока пусто";
    text.textContent = "Здесь появится контент после первого действия.";
  }

  screenContainer.innerHTML = "";
  screenContainer.appendChild(node);
}

function renderContent(screen) {
  const { title, subtitle } = screens[screen];
  screenContainer.innerHTML = `
    <section>
      <h2 class="content-title">${title}</h2>
      <p class="content-subtitle">${subtitle}</p>
      <article class="item-card">Первый блок контента для экрана «${title}».</article>
      <article class="item-card">Второй блок: безопасные отступы и touch-first layout.</article>
      <button class="retry-btn pressable" data-action="retry">Повторить</button>
    </section>
  `;
}

function loadScreen(screen) {
  currentScreen = screen;
  screenTitle.textContent = screens[screen].title;

  navItems.forEach((item) => {
    const isActive = item.dataset.screen === screen;
    item.classList.toggle("active", isActive);
    if (isActive) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });

  renderSkeleton();

  setTimeout(() => {
    if (!navigator.onLine) {
      renderState("offline");
      return;
    }

    const sample = sampleStates[Math.floor(Math.random() * sampleStates.length)];
    if (sample === "content") renderContent(screen);
    else renderState(sample);
  }, 700);
}

function addPressFeedback(target) {
  target.classList.add("is-pressed");
  setTimeout(() => target.classList.remove("is-pressed"), 170);
}

window.addEventListener("resize", setViewportHeight);
window.visualViewport?.addEventListener("resize", setViewportHeight);
window.addEventListener("online", () => loadScreen(currentScreen));
window.addEventListener("offline", () => renderState("offline"));

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    addPressFeedback(item);
    loadScreen(item.dataset.screen);
  });
});

document.body.addEventListener("click", (event) => {
  const pressable = event.target.closest(".pressable");
  if (pressable) addPressFeedback(pressable);

  const actionable = event.target.closest("[data-action]");
  if (actionable) loadScreen(currentScreen);
});

setViewportHeight();
loadScreen(currentScreen);
