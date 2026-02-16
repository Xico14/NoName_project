## UI Review Template

### Scope
- Что изменено в интерфейсе:
- Какие пользовательские сценарии затронуты:

### Design Consistency
- [ ] Использованы дизайн-токены (color/type/spacing/radius)
- [ ] Нет локальных style override без обоснования

### Accessibility
- [ ] Контраст соответствует требованиям
- [ ] Полная keyboard-навигация
- [ ] Корректные aria-label/roles
- [ ] Видимый focus state

### Motion & Interaction
- [ ] Анимации соответствуют motion-лимитам
- [ ] Учтён prefers-reduced-motion
- [ ] Touch-target >= 44x44 px (mobile)

### States & Responsiveness
- [ ] Реализованы loading/empty/error/success состояния
- [ ] Проверены мобильный/планшет/десктопный брейкпоинты
- [ ] Offline-state и skeleton loading для PWA-сценариев

### API & Error Handling
- [ ] Корректная обработка success/error/timeout
- [ ] Есть понятные сообщения об ошибках и шаги восстановления

### KPI Impact
- [ ] Привязка к KPI: CTA visibility / task success rate / time-to-first-action / error recovery
- [ ] Добавлены/обновлены аналитические события

### Evidence
- Ссылка на макет(ы):
- Скриншоты/видео до-после:
- Чек результатов тестирования:
