# AIU Digital University

Фронтенд единой платформы университетских услуг **Astana International University**.

Сессия — Auth.js (httpOnly cookie). Роли приходят с сервера (OIDC claims или allowlist dev-профилей). Доступ к разделам проверяется в `src/proxy.ts` и в API route handlers.

## Быстрый старт

```bash
cp .env.example .env.local
# задайте AUTH_SECRET (длинная случайная строка)
npm install
npm run dev
```

Откройте [http://127.0.0.1:3847](http://127.0.0.1:3847).

Без OIDC доступен серверный dev-вход (`AUTH_ALLOW_DEV_LOGIN=true`): профили студент / сотрудник / HR / оператор / админ. Роли нельзя «выбрать» произвольно — только те, что выдал профиль.

## Переменные окружения

См. `.env.example`:

| Переменная | Назначение |
|---|---|
| `AUTH_SECRET` | Секрет JWT Auth.js |
| `AUTH_OIDC_*` | Университетский SSO (OIDC) |
| `AUTH_ALLOW_DEV_LOGIN` | Dev-профили на сервере |
| `NEXT_PUBLIC_DEMO_MODE` | Демо-баннеры и пометки в UI |
| `NEXT_PUBLIC_API_URL` | Внешний API (пусто = BFF `/api/*` этого приложения) |

## Скрипты

```bash
npm run dev        # порт 3847
npm run lint       # eslint .
npm run typecheck
npm run build
npm start
```

## Архитектура

- `src/auth.ts` — Auth.js (OIDC + Credentials/dev)
- `src/proxy.ts` — RBAC по пути и активной роли
- `src/lib/api/client.ts` — типизированный клиент
- `src/lib/api/server.ts` + `src/app/api/*` — BFF с `requireRole`
- `src/lib/schemas/*` — Zod-контракты форм
- `NEXT_PUBLIC_DEMO_MODE` — включает DemoBanner и пометки данных

## Docker

```bash
docker build -t aiu-digital-front .
docker run --rm -p 3847:3847 \
  -e AUTH_SECRET=change-me \
  -e AUTH_ALLOW_DEV_LOGIN=true \
  aiu-digital-front
```

Образ использует `output: "standalone"`.
