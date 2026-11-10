# Формы и антиспам до выбора доменов

**Статус:** Turnstile, Actions variables, Apps Script version 9 и фронтенд опубликованы; CRM-часть сквозных тестов подтверждена
**Дата:** 10 ноября 2026 года  
**Контур:** Wellness и Science, GitHub Pages → Google Apps Script → CRM Google Sheets → Telegram

## Цель

Сделать рабочими и защищёнными формы Wellness и Science на текущих адресах `*.github.io`, не дожидаясь выбора пользовательских доменов. Заявки сохраняются в существующей CRM и уведомляют получателей в Telegram; новые секреты не попадают в репозиторий.

## Решение

Используется один бесплатный Cloudflare Turnstile Managed widget с разрешёнными hostname `wellnessnd.github.io` и `nd-science.github.io`. Он дополняет, но не заменяет:

- honeypot в HTML-форме;
- серверную проверку обязательных полей, согласия и email;
- серверный лимит повторных обращений в Google Apps Script;
- прямой fallback в Telegram при ошибке доставки.

Turnstile-проверка выполняется на серверной стороне Apps Script до записи в CRM и отправки Telegram-уведомления. Свой набор фраз не используется: он был бы доступен ботам в статичном HTML и давал бы слабую защиту.

## Конфигурация и секреты

1. В Cloudflare создать widget `Natali website enquiries` в режиме **Managed** и разрешить оба текущих GitHub Pages hostname.
2. Публичный sitekey записать в Actions variable `PUBLIC_TURNSTILE_SITE_KEY` в каждом из двух репозиториев. Его можно включать в сборку.
3. В Script Properties текущего Google Apps Script хранить `TURNSTILE_SECRET_KEY`; ключ не записывается в исходный код, GitHub Actions или публичную страницу.
4. GitHub Pages workflow передаёт в Astro только sitekey. Science использует тот же Apps Script webhook, что и Wellness.
5. После выбора доменов добавить новые hostname в allowlist текущего widget до переключения DNS. Код и пара ключей менять не нужно.

## Поведение и данные

- Wellness private и organisation формы передают существующие поля. Science передаёт бриф: организацию, роль, тип проекта, результат, аудиторию, сроки, бюджет и комментарий.
- CRM сохраняет базовые поля в существующих колонках; Science-бриф добавляется в поле запроса в читаемом виде. Новая таблица и новые публичные поля не создаются.
- Apps Script игнорирует honeypot, возвращает нейтральную ошибку для неуспешной проверки и не раскрывает причину блокировки.
- Для защиты от burst-спама Apps Script ограничивает обращения по site/contact и общий поток, используя `CacheService` и `LockService`. Telegram webhook остаётся отдельной веткой и не затрагивается.
- Privacy-страницы получают короткое уведомление о технической антиспам-проверке Turnstile и ссылку на её privacy-документацию.

## Проверка

До публикации выполняются `pnpm test`, `pnpm check`, `pnpm build` и `git diff --check`. В браузере проверяются RU/EN, desktop/mobile, keyboard/focus, required-поля, состояния success/error и fallback в Telegram.

После выкладки отправляются две разрешённые тестовые заявки с заметной маркировкой `TEST — DO NOT CONTACT`:

1. Wellness booking;
2. Science contact.

Обе тестовые строки остаются в CRM для аудита; для каждой подтверждаются запись в CRM и уведомление в Telegram. Отрицательные проверки (honeypot, отсутствие/просрочка Turnstile, повторное обращение) не должны создавать строки или уведомления.

### Выполнено локально

- `pnpm test`, `pnpm check`, `pnpm build` и `git diff --check` проходят;
- Apps Script покрыт изолированными тестами: валидный Turnstile создаёт запись и уведомление, honeypot и невалидный token не создают побочных эффектов;
- статическая сборка с тестовым публичным sitekey подтверждает наличие формы, Turnstile, общего webhook и прямых каналов связи на обеих страницах.

### Внешнее состояние на 10 ноября

- В Cloudflare создан widget `Natali website enquiries` в режиме **Managed** с allowlist `wellnessnd.github.io` и `nd-science.github.io`.
- `PUBLIC_TURNSTILE_SITE_KEY` сохранён как Actions variable в обоих GitHub-репозиториях.
- Владелец открыл Google Apps Script проекта Natali. В него сохранён проверенный `packages/forms/gas_crm_script.js`, секрет Turnstile добавлен только в Script Properties, а действующий web app обновлён до version 9 без изменения URL.
- Отрицательная проверка опубликованного endpoint: запрос без Turnstile-токена отклонён до CRM и Telegram с нейтральным сообщением об обязательных полях.

### Осталось после публикации фронтенда

После push оба GitHub Pages deployment завершились успешно. Отправлены две разрешённые сквозные заявки с маркировкой `TEST — DO NOT CONTACT`:

1. Wellness booking — строка CRM создана 10 ноября в 18:30;
2. Science contact — строка CRM создана 10 ноября в 18:31, включая структурированный бриф в поле запроса.

В BrowserOS Neo дополнительно подтверждены успешные сообщения обеих форм и работа Turnstile. Уведомления отправляются через прежнюю ветку Telegram, но их приём у трёх настроенных адресатов не может быть независимо подтверждён из текущей Telegram-сессии: в ней нет доступа к этим recipient-чатам и Apps Script не сохраняет ответ Telegram API. Это единственное незакрытое эксплуатационное подтверждение; оно требует проверки получателем в Telegram, а не повторной заявки.

## Ограничения выпуска

Этот контур не отменяет public release gate: пользовательские домены, финальные production-переменные, юридическое решение, CV Science и эксплуатационные процессы по-прежнему закрываются отдельно.
