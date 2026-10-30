# Оперативный реестр задач проекта (TODO)

*Последнее обновление: 30 октября 2026 года*
*Формат ведения: пользователь накидывает задачи в чат; мелкие правятся сразу, более крупные декомпозируются и берутся в работу.*

---

## 1. Реестр оперативных задач

| ID | Дата | Задача / Запрос | Тип | Статус | Комментарий / Решение |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-TODO-01** | 2026-10-30 | Проверить, что правильно пишется **Nataliia** — на английском с 2 `ii` | Данные / Профиль | ✅ **Выполнено** | Проверено: в диссертации (Europa-Universität Flensburg), статьях Taylor & Francis / Springer и паспорте ICAO для имени «Наталия» используется строго **Nataliia** (`Nataliia Dolgova` / `Nataliia Ovchinnikova`). В кодовой базе (`packages/profile`, конфигах, мета-тегах и текстах EN-версий) исправлено `Natalia` → `Nataliia`. Внешние URL (ResearchGate, LinkedIn) оставлены исходными. |
| **TSK-TODO-02** | 2026-10-30 | На русском сайте надпись `Natalia Dolgova · Science` над заголовком — зачем? | UI / Контент | ✅ **Выполнено** | Это был технический надзаголовок (`.eyebrow`), куда шаблон жестко вставлял имя конфига сайта на английском. На русском сайте он выглядел чужеродно и дублировал соседний блок профиля. Надзаголовок убран из hero-блоков Science, экран стал чистым. |
| **TSK-TODO-03** | 2026-10-30 | Подпись «PayPal Invoice возможен вручную после подтверждения доступности business account» — зачем? | Копирайтинг / UX | ✅ **Выполнено** | Фраза случайно перекочевала в публичный текст страницы записи (`/booking/`) из внутреннего технического плана. Клиентам внутренняя кухня про business account не нужна. Текст переписан на понятный клиентский язык: ЮKassa для РФ и международный счёт (банковский перевод или PayPal) для других стран. |
| **TSK-TODO-04** | 2026-10-30 | Внедрение утверждённой дизайн-системы: Wellness (Premium Editorial) + Science (Oxford Academic) | Дизайн / UI | ✅ **Выполнено** | Реализован базовый пакет дизайн-системы: в `themes.css` установлены палитры Premium Editorial (Washi `#FBF9F5`, кашемир, мох, терракота) и Oxford Academic (алебастр `#F8FAFC`, сланец, оксфордский индиго, сапфир); подключен шрифт Fraunces Display Serif + Inter в `BaseLayout.astro` и `base.css`; удалены клише `--hero-orb`; портрет Наталии в жакете внедрен в Hero обоих сайтов (`/images/natalia-portrait.png`); фото МАК-карт внедрено на `/practices/play-and-story/`. Сборка и тесты пройдены без ошибок. |

---

## 2. Журнал выполненных правок

### TSK-TODO-01: Написание Nataliia (с двумя `ii`)
- `packages/profile/src/index.ts`: обновлено `displayName.en: "Nataliia Dolgova"`.
- `apps/wellness/src/site-config.ts` и `apps/science/src/site-config.ts`: скорректировано название сайта на `Nataliia Dolgova · ...`.
- `apps/wellness/src/pages/index.astro` и `apps/science/src/pages/index.astro`: скорректирован заголовок редиректа `<title>Nataliia Dolgova · ...</title>`.
- `apps/science/src/components/PublicationList.astro`: формула авторства обновлена на `Nataliia Dolgova, published also as Nataliia Ovchinnikova`.
- `apps/science/src/components/SitePage.astro`: Schema.org-разметка диссертации и aria-label портрета обновлены на `Nataliia Dolgova`.
- `apps/science/src/content/publications/*.json`: авторы трех публикаций приведены к каноническому `Nataliia Dolgova`.
- `apps/science/src/content/pages/en/*.md` и `apps/wellness/src/content/pages/en/*.md`: во всех SEO-заголовках, описаниях и английских текстах имя заменено с `Natalia` на `Nataliia`.
- `apps/science/src/i18n.ts` и `apps/wellness/src/i18n.ts`: тексты подвалов и подсказок форм приведены к `Nataliia`.
- `packages/forms/src/index.mjs`: шаблоны писем-подтверждений обновлены на `Nataliia will respond...`.

### TSK-TODO-02: Устранение англоязычного надзаголовка на Science
- В `apps/science/src/components/SitePage.astro` удалены строки с рендерингом `<p class="eyebrow">{scienceSiteConfig.name}</p>` над заголовком `h1` на главной и внутренних страницах.
- Теперь страница открывается сразу с главного содержательного заголовка `h1`, а имя и регалии Наталии гармонично отображаются в портретной карточке справа без дублирования.

### TSK-TODO-03: Очистка текста шагов оплаты на странице записи
- В `apps/wellness/src/content/pages/ru/booking.md` строка шага 3 заменена на чистовую клиентскую:
  > *«Клиенту из России будет выставлена ссылка ЮKassa в рублях по курсу ЦБ на день счёта (в сообщении будут указаны сумма в евро и зафиксированная сумма в рублях). Для остальных стран выставляется международный счёт (банковский перевод или PayPal).»*
- В `apps/wellness/src/content/pages/en/booking.md` строка шага 3 синхронно обновлена:
  > *«Clients in Russia receive a YooKassa link in RUB converted from EUR at the Central Bank rate on the invoice date (the message shows both the EUR amount and the fixed RUB amount). Other countries receive an invoice for an international bank transfer or PayPal.»*

---

## 3. Входящие задачи (бэклог для новых запросов)
*(Сюда будут добавляться новые задачи от пользователя по мере отправки в чат)*
