# Повторный технический браузерный аудит: Science, Wellness и Rudoctors

Дата проверки: **11 ноября 2026**  
Режим: **read-only, пассивная проверка безопасности**  
Основной браузер: **BrowserOS Neo**  
Дополнительные инструменты: Lighthouse CLI 13.6.0, HTTP-проверки PowerShell, локальные проверки и production-сборки репозиториев  
Проверенные production-домены:

- Science: `https://tvet.si`
- Wellness: `https://natalicompass.com`
- Rudoctors: `https://rudoctors.com`

Репозитории:

- Science/Wellness: `D:\Projects\Natali`
- Rudoctors: `D:\Projects\rudoctors\site`

Артефакты измерений: `D:\Data\three-site-audit-2026-11-11`

---

## 1. Executive Summary

Все три сайта доступны на собственных доменах, успешно переводят HTTP в HTTPS и сохраняют путь при переходе со старых GitHub Pages-доменов. XML-карты валидно открываются; все **84 URL Science**, **34 URL Wellness** и **494 URL Rudoctors** из production sitemap отвечают HTTP 200. На проверенных главных страницах Lighthouse не обнаружил JavaScript-ошибок или неуспешных сетевых запросов.

После аудита 30 октября Science и Wellness стали production-площадками: снят draft/noindex с локализованных страниц, появились XML sitemap, формы с Cloudflare Turnstile, social metadata и расширенные локализации. Большинство прежних release-блокеров закрыто. Однако новый тяжёлый PNG-портрет ухудшил мобильный LCP до **10,2 с Science** и **8,8 с Wellness** в медиане трёх Lighthouse-прогонов. Это главная техническая регрессия.

Rudoctors технически быстрый и содержит 435 карточек врачей, 2033 отзыва, 45 специальностей и 5 городов. При этом миграция с `rudoctors.github.io` на `rudoctors.com` завершена не полностью: старый домен остался в `robots.txt`, `llms.txt`, форме добавления врача, аналитике и альтернативном relay. Критический пользовательский риск — форма добавления врача считает любой `opaque`-ответ `no-cors` успешной доставкой, хотя браузер не может подтвердить HTTP-статус или downstream-запись.

### Итоговая оценка

| Сайт | Итог | Статус | Главный риск |
|---|---:|---|---|
| Science | **7,6 / 10** | Работоспособен, требуется оптимизация | mobile LCP 10,2 с и индексируемая 404 |
| Wellness | **7,6 / 10** | Работоспособен, требуется оптимизация | mobile LCP 8,8 с и индексируемая 404 |
| Rudoctors | **7,4 / 10** | Работоспособен, миграция домена не завершена | неподтверждаемая доставка формы и старые URL |

**P0 не обнаружено.** До следующего релиза рекомендуется закрыть 4 задачи P1: портрет/LCP на двух Natali-сайтах, SEO-политику 404 на двух Natali-сайтах, честное подтверждение доставки формы Rudoctors и остатки старого домена в robots/LLM-навигации.

---

## 2. Scope и методика

### BrowserOS Neo

Neo использовался как основной инструмент. Через реальный браузер открыты и просмотрены DOM/accessibility snapshots, навигация, формы и интерактивные элементы следующих групп:

- Science: главная, биография, исследования, публикации, образование, проекты, услуги, контакты, EN и ZH;
- Wellness: главная, о практике, частные клиенты, запись, FAQ, ресурсы, организации, карта сайта, EN и намеренно отсутствующий URL;
- Rudoctors: главная, каталог, специальности, города, Белград, два профиля врачей, FAQ, о проекте и добавление врача.

В Neo подтверждены:

- skip-links, landmarks, заголовки, accessible names и form labels;
- нативная required-валидация формы Rudoctors без отправки данных;
- Turnstile iframe в формах Science и Wellness;
- desktop rendering трёх главных страниц и формы добавления врача;
- mobile rendering подтверждён скриншотами Lighthouse в том же Chromium-движке.

### HTTP и SEO

- проверены HTTPS, редиректы `http`, `www` и старых GitHub Pages-доменов;
- проверены статусы, content type, cache headers и security headers;
- разобраны `robots.txt`, `sitemap-index.xml`, дочерние sitemap, canonical, robots, hreflang, Open Graph и JSON-LD;
- выполнена последовательная HEAD-проверка всех 612 URL из sitemap без параллельной агрессивной нагрузки;
- проверены заведомо отсутствующие URL и корневые locale-router страницы.

### Lighthouse

Для каждой главной RU-страницы выполнено по **3 mobile** и **3 desktop** прогона Lighthouse 13.6.0. Ниже приводятся медианы; диапазон указан для изменчивых метрик. Это лабораторные данные, не field Core Web Vitals.

PageSpeed Insights / CrUX вернул HTTP 429 для всех трёх доменов. Поэтому field LCP/INP/CLS указаны как **N/A**, а не оценены предположительно.

### Read-only ограничение

Реальные заявки Science, Wellness и Rudoctors не отправлялись: это создало бы записи в CRM, Telegram или GitHub и нарушило read-only. Проверены форма, client-side логика, доступность endpoint и локальные автоматические тесты, но downstream delivery остаётся отдельным E2E-гейтом.

---

## 3. Technical Scorecard

Весовая модель: Performance 20%, Technical SEO 20%, Security 15%, Accessibility 15%, Reliability 15%, Functionality 15%.

### Science — 7,6 / 10

| Категория | Оценка | Подтверждение |
|---|---:|---|
| Performance | 6,5 | mobile Performance 74; LCP 10,2 с; desktop 99–100 |
| Technical SEO | 8,0 | canonical/hreflang/sitemap корректны; 404 ошибочно index/follow и canonical на главную |
| Security | 5,5 | HTTPS и Turnstile есть; HTTP security headers отсутствуют |
| Accessibility | 9,2 | Lighthouse 100; labels/skip-link/landmarks есть; mobile nav обрезана без явной подсказки прокрутки |
| Reliability | 8,5 | 84/84 sitemap URL = 200; console/network audit pass |
| Functionality | 8,0 | форма и endpoint доступны; реальная downstream-доставка не проверялась |

### Wellness — 7,6 / 10

| Категория | Оценка | Подтверждение |
|---|---:|---|
| Performance | 6,5 | mobile Performance 74; LCP 8,8 с; desktop 99–100 |
| Technical SEO | 8,0 | canonical/hreflang/sitemap корректны; 404 ошибочно index/follow и canonical на главную |
| Security | 5,5 | HTTPS, Turnstile и privacy flow есть; HTTP security headers отсутствуют |
| Accessibility | 9,2 | Lighthouse 100; форма размечена; mobile nav горизонтально обрезана |
| Reliability | 8,5 | 34/34 sitemap URL = 200; console/network audit pass |
| Functionality | 8,0 | форма и endpoint доступны; downstream E2E не выполнялся |

### Rudoctors — 7,4 / 10

| Категория | Оценка | Подтверждение |
|---|---:|---|
| Performance | 8,7 | mobile Performance 98–100, LCP 1,1 с; лишняя загрузка 1,53 МБ ниже fold |
| Technical SEO | 7,2 | sitemap/canonical/schema есть; robots/llms старого домена, relative schema images |
| Security | 5,5 | HTTPS и meta CSP; HTTP hardening headers отсутствуют, CSP содержит `unsafe-inline` |
| Accessibility | 7,5 | Lighthouse 96; несколько подтверждённых contrast failures |
| Reliability | 8,0 | 494/494 sitemap URL = 200; console/network pass; доставка формы непрозрачна |
| Functionality | 7,0 | каталог и фильтры работают; форма может показывать ложный успех |

---

## 4. Performance Report

### Lighthouse 13.6.0 — медиана 3 прогонов

| Сайт | Режим | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Вес |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Science | Mobile | 74 | 100 | 100 | 100 | 1,83 с | **10,20 с** (8,81–10,21) | 0 мс | 0,000 | 1662 KiB |
| Science | Desktop | 100 | 100 | 100 | 100 | 0,60 с | 0,60 с (0,59–0,72) | 0 мс | 0,009 | 1662 KiB |
| Wellness | Mobile | 74 | 100 | 100 | 100 | 1,68 с | **8,78 с** (8,73–10,07) | 0 мс | 0,016 | 1658 KiB |
| Wellness | Desktop | 100 | 100 | 100 | 100 | 0,70 с | 0,70 с (0,56–0,76) | 0 мс | 0,010 | 1658 KiB |
| Rudoctors | Mobile | 99 | 96 | 100 | 100 | 1,07 с | 1,07 с (0,91–1,11) | 0 мс | 0,000 | 1689 KiB |
| Rudoctors | Desktop | 100 | 96 | 100 | 100 | 0,25 с | 0,25 с (0,25–0,39) | 0 мс | 0,000 | 1697 KiB |

### Причина медленного LCP Science/Wellness

LCP-элемент — `/images/natalia-portrait.png`:

- transfer size: **1 531 803 bytes**;
- исходный размер: 880×1100;
- отображается примерно 311×390 CSS px на mobile;
- Lighthouse оценивает экономию **около 1 435 KiB**;
- `loading="eager"`, но отсутствует `fetchpriority="high"`;
- Google Fonts и CSS добавляют оценочную render-blocking задержку 690–750 мс.

Рекомендация: создать AVIF/WebP варианты, `srcset`/`sizes` (например 320/480/640/880), оставить корректные width/height, добавить `fetchpriority="high"` только LCP-изображению, затем повторить три mobile-прогона. Цель: lab LCP <2,5 с и страница <500 KiB без потери качества.

### Rudoctors: быстрый LCP, но лишний вес

Главная Rudoctors загружает тот же внешний портрет с `natalicompass.com` размером 1,53 МБ для карточки ниже первого экрана размером около 64×64 px. Элемент имеет `loading="eager" fetchpriority="high"`. Lighthouse оценивает экономию только для этого ресурса примерно в **1,49 МБ**; суммарная image-delivery экономия — 1,59 МБ.

Рекомендация: локальная миниатюра 128×128 WebP/AVIF, `loading="lazy"`, `fetchpriority="auto"`; eager/high оставлять только для реально above-the-fold изображения.

### Field CWV

| Сайт | Field LCP | INP | Field CLS | Причина |
|---|---|---|---|---|
| Science | N/A | N/A | N/A | PSI API 429 |
| Wellness | N/A | N/A | N/A | PSI API 429 |
| Rudoctors | N/A | N/A | N/A | PSI API 429 |

---

## 5. Technical SEO

### Положительное

- старые домены сохраняют путь и перенаправляют на custom domains;
- `http` и `www` приводятся к HTTPS canonical host;
- localized pages имеют self-canonical, Open Graph, Twitter metadata и hreflang;
- Science: 6 языков + `x-default` (7 alternate links);
- Wellness: RU/EN + `x-default` (3 alternate links);
- Rudoctors: RU + `x-default`;
- XML sitemap возвращаются как `application/xml`;
- production robots Science/Wellness разрешают индексирование и указывают правильный sitemap;
- JSON-LD парсится: Person/WebPage, ItemList, WebSite/Organization, Physician, BreadcrumbList и FAQPage.

### Обнаруженные SEO-проблемы

1. **Science/Wellness 404:** HTTP 404 корректен, но HTML содержит `robots=index, follow, max-image-preview:large`, canonical и `og:url` на локализованную главную. Это смешивает сигнал ошибки и главной страницы.
2. **Rudoctors robots:** `Sitemap: https://rudoctors.github.io/sitemap-index.xml` вместо custom domain.
3. **Rudoctors llms.txt:** все основные ссылки ведут на `rudoctors.github.io`, хотя тот лишь редиректит.
4. **Rudoctors Physician JSON-LD:** у 52 из 440 локально собранных doctor pages `image` задан относительным `/photos/...webp`; лучше абсолютный URL.
5. **Natali root:** `/` возвращает HTTP 200, `robots=noindex` и meta refresh на `/en/` вместо HTTP redirect. Это не индексируемый дубликат, но усложняет навигацию, аналитику и мониторинг.

### Sitemap status

| Сайт | Sitemap files | URL | 200 | Ошибки |
|---|---:|---:|---:|---:|
| Science | 1 | 84 | 84 | 0 |
| Wellness | 1 | 34 | 34 | 0 |
| Rudoctors | 1 | 494 | 494 | 0 |

---

## 6. Frontend, DOM, Navigation и Forms

### Science

- полноценная форма сотрудничества присутствует;
- required-поля имеют accessible names: имя, организация, reply email, комментарий, согласие;
- присутствуют ссылки на privacy/consent и альтернативные Telegram/LinkedIn/email каналы;
- Turnstile iframe доступен в DOM;
- основной endpoint активен и общий с Wellness.

### Wellness

- форма первичного обращения присутствует;
- required-поля, 18+ confirmation и согласие размечены;
- есть crisis boundary и ссылка Find A Helpline;
- Turnstile iframe присутствует;
- GET health-check endpoint вернул `{"ok":true,"service":"CRM & Telegram Webhook Наталии Долговой"}` и `Access-Control-Allow-Origin: *`.

### Rudoctors

- каталог, фильтры, профили, city/specialty hubs и внешние контакты доступны;
- форма добавления врача имеет labels и native required validation;
- empty-submit в Neo показал нативное сообщение «Заполните это поле» и не отправил запрос;
- строка согласия визуально разваливается: ссылка вынесена в отдельную колонку, перед точкой возникает большой пробел;
- форма POST-ит в Google Apps Script с `mode: "no-cors"` и считает `response.type === "opaque"` успехом.

Последний пункт принципиален: opaque response не позволяет прочитать HTTP status или body. Даже 4xx/5xx/страница ошибки может выглядеть в браузере как `opaque`, поэтому текст «Заявка отправлена на модерацию» не является доказательством доставки.

### Console и network

На трёх главных страницах Lighthouse:

- `errors-in-console`: pass, 0 элементов;
- failed/4xx network requests: 0;
- Best Practices: 100.

Neo не предоставляет отдельный экспорт DevTools Console/Network waterfall, поэтому утверждение ограничено Lighthouse-прогонами и HTTP-проверками.

---

## 7. Accessibility

### Science/Wellness

- Lighthouse Accessibility 100 на главных;
- `lang`, landmarks, H1, skip-link, labels и alt присутствуют;
- прежний heading-order defect Science больше не воспроизводится;
- формы доступны в accessibility tree;
- на mobile верхняя навигация остаётся горизонтальным списком и визуально обрезает пункты справа. Прокрутка возможна, но следующий пункт плохо обнаружим без fade/chevron/hamburger.

### Rudoctors

Lighthouse Accessibility 96. Подтверждённые contrast failures:

| Элемент | Ratio | Требуется |
|---|---:|---:|
| Header CTA «Найти врача» | 3,74:1 | 4,5:1 |
| Hero submit «Найти» | 2,80:1 | 4,5:1 |
| Label «РЕКЛАМА» | 2,51:1 | 4,5:1 |
| Language/format chips | 4,34:1 | 4,5:1 |

Рекомендация: затемнить brand/accent backgrounds или увеличить размер/вес текста так, чтобы AA-порог выполнялся в default и hover/focus states. После правки повторить Lighthouse и ручную keyboard-проверку.

---

## 8. Passive Security Review

### HTTP headers

| Сайт | HTTPS | HSTS | HTTP CSP | X-Frame / frame-ancestors | X-Content-Type-Options | Referrer-Policy |
|---|---|---|---|---|---|---|
| Science | да | нет | нет | нет | нет | нет |
| Wellness | да | нет | нет | нет | нет | нет |
| Rudoctors | да | нет | нет | нет | нет | нет |

HTML содержит часть meta-политик:

- Science/Wellness: meta referrer и meta `X-Content-Type-Options`;
- Rudoctors: meta referrer и meta CSP.

Это не равно серверным заголовкам. `X-Content-Type-Options` и HSTS должны приходить HTTP headers; защита от framing должна использовать `frame-ancestors` в HTTP CSP или `X-Frame-Options`. Rudoctors meta CSP дополнительно разрешает `'unsafe-inline'` для script/style и не может задать полноценный `frame-ancestors`.

GitHub Pages ограничивает управление headers. Варианты исправления: Cloudflare proxy/Pages, другой static hosting или reverse proxy. Сначала внедрить CSP в Report-Only на staging, затем ужесточать; формы и Turnstile проверить после каждого изменения.

Пассивная проверка не обнаружила mixed content или browser console security errors на главных. Сканирование уязвимостей, fuzzing, credential testing и агрессивные запросы не выполнялись.

---

## 9. Issue Register

### P0

P0-дефектов не обнаружено.

### NAT-PERF-001 — P1 — мобильный LCP 8,8–10,2 с

**URL:** `https://tvet.si/ru/`, `https://natalicompass.com/ru/`  
**Шаги:** Lighthouse mobile, 3 прогона, открыть `image-delivery-insight` и `largest-contentful-paint`.  
**Факт:** 1,53 МБ PNG является LCP; Performance 74 на обоих сайтах.  
**Решение:** AVIF/WebP + responsive `srcset/sizes`, правильный preload/fetchpriority, затем три контрольных прогона.  
**Acceptance:** median lab LCP <2,5 с; изображение <250 KiB mobile; visual regression pass.

### NAT-SEO-404-001 — P1 — индексируемая 404 канонизируется на главную

**URL:** любой отсутствующий, например `https://tvet.si/definitely-missing-audit/` и `https://natalicompass.com/definitely-missing-audit/`.  
**Факт:** HTTP 404, но `robots=index,follow`; canonical и og:url указывают на `/ru/`.  
**Решение:** 404 должна иметь `noindex, follow` или `noindex, nofollow`; canonical убрать либо self-reference на фактический URL; og:url не подменять главной.  
**Acceptance:** curl = 404, meta robots содержит noindex, canonical не указывает на индексируемую главную.

### RD-FORM-001 — P1 — ложноположительный успех формы добавления врача

**URL:** `https://rudoctors.com/add-doctor/`.  
**Код:** `src/pages/add-doctor.astro:262-286`.  
**Факт:** `mode: "no-cors"`; единственный проверяемый результат — `response.type === "opaque"`; затем форма очищается и сообщает успех.  
**Решение:** CORS-enabled relay на custom domain origin, JSON response `{ok,id}`, проверка `response.ok && data.ok`, отображение ID заявки; manual fallback оставлять только при подтверждённой ошибке.  
**Acceptance:** тестовая заявка создаёт ожидаемый Issue/CRM/Telegram объект, ID совпадает на клиенте и downstream; failure 4xx/5xx не показывает успех.

### RD-SEO-001 — P1 — robots/llms указывают старый домен

**URL:** `https://rudoctors.com/robots.txt`, `https://rudoctors.com/llms.txt`.  
**Код:** `public/robots.txt:34`, `public/llms.txt:7-26`.  
**Факт:** sitemap и основные ссылки используют `https://rudoctors.github.io`; редирект работает, но создаёт лишний hop и противоречит canonical host.  
**Решение:** заменить на `https://rudoctors.com`, добавить CI-assertion на отсутствие legacy host в production artifacts.  
**Acceptance:** `rg` по `dist` не находит legacy host, кроме намеренной документации миграции.

### ALL-SEC-001 — P2 — отсутствуют HTTP security headers

**URL:** все три origin.  
**Факт:** нет HSTS, HTTP CSP, framing protection, XCTO и Referrer-Policy headers.  
**Решение:** вынести через CDN/hosting headers; CSP вводить поэтапно, Turnstile и analytics включить в явный allowlist.  
**Acceptance:** `curl -I` показывает согласованный набор; формы, analytics и внешние изображения работают.

### RD-A11Y-001 — P2 — недостаточный контраст CTA и служебных chips

**URL:** `https://rudoctors.com/`.  
**Факт:** ratios 2,51–4,34:1; Lighthouse Accessibility 96.  
**Решение:** скорректировать палитру и states; не полагаться только на font-weight.  
**Acceptance:** Lighthouse/axe pass; ручная проверка hover/focus/high-contrast.

### RD-PERF-001 — P2 — 1,53 МБ eager/high изображение ниже fold

**URL:** `https://rudoctors.com/`.  
**Факт:** внешний PNG Wellness 1,53 МБ отображается как маленькая карточка и загружается eagerly.  
**Решение:** локальная оптимизированная миниатюра, lazy/auto priority.  
**Acceptance:** главная <500 KiB initial transfer; image-delivery savings устранены.

### RD-DOMAIN-001 — P2 — legacy host остался в runtime и relay

**Код:**

- `src/lib/analytics.ts:21` — custom domain ошибочно считается external;
- `src/pages/add-doctor.astro:219,228,239` — старые share/fallback URL;
- `deno/doctor-relay.ts:24` — CORS разрешает только старый origin;
- `deno/doctor-relay.ts:555,591,733` — старый домен в сообщениях.

**Решение:** единая `SITE.url`, allowlist origins для legacy+custom на переходный период, затем удалить legacy; добавить тест migration residue.  
**Acceptance:** internal custom-domain clicks не считаются outbound; custom origin проходит CORS; публичные тексты используют новый домен.

### RD-SEO-002 — P2 — relative image в Physician JSON-LD

**URL:** 52 doctor profiles с фото.  
**Факт:** schema `image: "/photos/rd-56.webp"`; HTML/OG используют absolute URL.  
**Решение:** собирать `new URL(photo, SITE.url).href`.  
**Acceptance:** Schema.org validator/Rich Results Test получает абсолютный HTTPS URL на выборке и во всех build artifacts.

### NAT-UX-001 — P2 — mobile navigation визуально обрезана

**URL:** главные и внутренние страницы Science/Wellness при 412 px.  
**Факт:** пункты справа уходят за viewport; видимый индикатор горизонтальной прокрутки отсутствует.  
**Решение:** hamburger/overflow menu либо fade + chevron + корректная keyboard scroll/focus visibility.  
**Acceptance:** все разделы обнаружимы при 320/375/390/412 px, 200% zoom и клавиатуре.

### RD-UX-001 — P2 — разрыв текста согласия формы

**URL:** `https://rudoctors.com/add-doctor/`.  
**Факт:** ссылка privacy визуально отделена от предложения; точка остаётся отдельно.  
**Решение:** обернуть текст и ссылку в inline span внутри label; проверить wrapping 320–1440 px.  
**Acceptance:** предложение читается непрерывно, checkbox label остаётся одним accessible name.

### NAT-ARCH-001 — P3 — корень 200 + meta refresh

**URL:** `https://tvet.si/`, `https://natalicompass.com/`.  
**Факт:** HTTP 200, `robots=noindex`, JS locale detection и meta refresh на `/en/`.  
**Решение:** edge redirect по согласованной политике языка или полноценная neutral landing; сохранить user-selectable language.  
**Acceptance:** мониторинг и analytics не фиксируют промежуточную page view; нет redirect loops.

### ALL-PERF-002 — P3 — короткий cache TTL для хэшированных assets

**Факт:** GitHub Pages отвечает `Cache-Control: max-age=600`; хэшированные CSS/JS можно кэшировать immutable значительно дольше.  
**Решение:** CDN с `public,max-age=31536000,immutable` для hashed assets, короткий TTL для HTML.  
**Acceptance:** repeat-view audit не загружает неизменившиеся assets заново.

---

## 10. Что исправлено после аудита 30 октября

| Прежняя проблема | Текущее состояние |
|---|---|
| Draft `noindex` + `Disallow: /` | Закрыто для localized production pages |
| XML sitemap отсутствует | Закрыто: 84 и 34 production URL; Rudoctors 494 |
| Science CTA без формы | Закрыто: форма + Turnstile + endpoint |
| Wellness форма отсутствует | Закрыто: форма + Turnstile + endpoint |
| Science heading order | Не воспроизводится; Lighthouse A11y 100 |
| Social preview metadata отсутствовали | Закрыто: OG/Twitter image metadata есть |
| Старые GitHub Pages URL | Путь-сохраняющие редиректы работают |
| Неполные security headers | Не закрыто |
| Root meta refresh | Не закрыто, но root noindex |

Оценки 30 октября и текущие оценки нельзя сравнивать механически: изменились домены, объём контента, число языков, формы и состав аудита; добавлен Rudoctors.

---

## 11. Пошаговый план исправлений

### Этап 1 — 1 рабочий день, release blockers

1. Конвертировать Natali portrait в responsive WebP/AVIF и добавить `fetchpriority=high` LCP-варианту.
2. Исправить meta robots/canonical/og:url 404 Science и Wellness.
3. Обновить Rudoctors `robots.txt` и `llms.txt` на custom domain.
4. Убрать ложный успех `no-cors` формы Rudoctors или временно заменить текст на честный manual fallback без утверждения о доставке.

### Этап 2 — 2–3 рабочих дня

1. Завершить migration residue Rudoctors: analytics, share URL, relay CORS, bot messages.
2. Исправить контраст и строку согласия формы.
3. Оптимизировать Rudoctors thumbnails и lazy-loading.
4. Исправить absolute image URLs в Physician JSON-LD.
5. Перепроверить mobile navigation Natali на 320/375/390/412 px и 200% zoom.

### Этап 3 — инфраструктура

1. Выбрать CDN/hosting слой для security headers и long-lived immutable cache.
2. Ввести CSP Report-Only, собрать нарушения, затем включить enforcement.
3. Настроить RUM для реальных LCP/INP/CLS и не полагаться только на PSI.
4. Добавить CI checks: legacy domain residue, 404 noindex, sitemap status, schema absolute URLs, contrast smoke, form contract.

### Контрольный E2E-гейт форм

В отдельном разрешённом тесте с явно маркированными данными:

1. отправить одну Science заявку;
2. подтвердить запись в CRM и уведомление в Telegram;
3. отправить одну Wellness заявку отдельно и подтвердить те же downstream-объекты;
4. отправить одну Rudoctors doctor request;
5. сопоставить клиентский ID, Issue/CRM ID и Telegram notification;
6. проверить failure-path 4xx/5xx и отсутствие ложного success.

Science, Wellness и doctor intake должны считаться тремя независимыми E2E-сценариями.

---

## 12. Проверки репозиториев

### Natali

Команда: `pnpm test`

- content validation: pass;
- Astro check Science/Wellness: 0 errors, 0 warnings;
- forms tests: 14/14 pass;
- production build Science/Wellness: pass;
- built-route canonical/hreflang/structured-data validation: pass.

### Rudoctors

- `npm run check`: 0 errors, 1 hint (`document.execCommand` deprecated);
- `npm run build`: 505 pages built;
- `npm run check:relay`: pass;
- `npm run check:review`: 16/16 pass;
- `git diff --check`: pass;
- рабочие деревья обоих репозиториев были чистыми до добавления этого отчёта.

---

## 13. Доказательства и скриншоты

### Mobile viewport (Lighthouse final screenshot)

Science:

![Science mobile](D:/Data/three-site-audit-2026-11-11/screenshots/science-mobile-2.png)

Wellness:

![Wellness mobile](D:/Data/three-site-audit-2026-11-11/screenshots/wellness-mobile-2.png)

Rudoctors:

![Rudoctors mobile](D:/Data/three-site-audit-2026-11-11/screenshots/rudoctors-mobile-2.png)

### Desktop screenshots

- `D:\Data\three-site-audit-2026-11-11\screenshots\science-desktop-2.png`
- `D:\Data\three-site-audit-2026-11-11\screenshots\wellness-desktop-2.png`
- `D:\Data\three-site-audit-2026-11-11\screenshots\rudoctors-desktop-2.png`

### Raw Lighthouse JSON

Каталог: `D:\Data\three-site-audit-2026-11-11\lighthouse`

В нём 18 файлов: по 3 mobile и 3 desktop прогона для каждого сайта. JSON содержит scores, timing metrics, network requests, screenshot, accessibility nodes и performance insights.

Neo screenshots дополнительно зафиксировали desktop hero Science, booking Wellness, главную Rudoctors и форму добавления врача. Они доступны в BrowserOS Neo audit/replay текущей сессии.

---

## 14. Ограничения

- Аудит read-only: реальные формы не отправлялись, downstream CRM/Telegram/GitHub не подтверждены.
- BrowserOS Neo не предоставил отдельный экспорт DevTools Console/Network waterfall или certificate viewer.
- Lighthouse запускался на главных RU-страницах; внутренние страницы проверялись Neo, HTTP и repository build.
- Field CWV/CrUX недоступны из-за PSI HTTP 429.
- Не выполнялись screen-reader sessions, high-contrast OS mode, 200% zoom на всех страницах и пользовательское тестирование.
- Не выполнялись активное security scanning, fuzzing, auth bypass, rate-limit pressure или анализ закрытых систем.
- Внешние клиники, профили, Telegram, B17, LinkedIn, Google Scholar и платёжные провайдеры не аудировались как часть этих сайтов.
- Содержательная медицинская/психологическая корректность и юридическая достаточность документов не заменяют экспертную правовую или клиническую проверку.

---

## 15. Final Verdict

Science и Wellness прошли путь от закрытых draft-сайтов к функциональным индексируемым production-площадкам; прежние формы, sitemap, metadata и heading issues в основном закрыты. Главный новый технический долг — чрезмерно тяжёлый LCP-портрет и некорректная SEO-политика 404.

Rudoctors стабилен как статический каталог и заметно быстрее в лабораторном LCP, но custom-domain migration необходимо довести до конца. До подтверждённого E2E форма добавления врача не должна обещать доставку по opaque `no-cors` response.

Рекомендуемый порядок: **Natali portrait → Natali 404 → Rudoctors form truthfulness → Rudoctors domain residue → contrast/thumbnails/schema → security headers и RUM**.
