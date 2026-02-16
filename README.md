# NoName_project

Минимальный frontend-каркас для mobile-first PWA UX:
- нижняя навигация с крупными touch targets;
- состояния loading / empty / error / offline;
- ретраи и кэш последнего успешного состояния;
- install-ready PWA (manifest + service worker + install prompt).

## Локальный запуск
```bash
cd frontend
python3 -m http.server 4173
```

Откройте: `http://localhost:4173/index.html`.
