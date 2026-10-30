# Технический браузерный аудит Science и Wellness

Дата проверки: 30 октября 2026 года  
Режим: read-only, без отправки форм, создания заявок и активного тестирования безопасности  
Основной инструмент: BrowserOS Neo  
Дополнительные инструменты: Lighthouse CLI 13.6.0, Chrome 156, `curl` для HTTP-заголовков и статус-кодов  

Проверенные сайты:

- Science: <https://nd-science.github.io>
- Wellness: <https://wellnessnd.github.io>

## A. Executive Summary

Текущее техническое качество обоих статических сайтов хорошее, но публичная релизная готовность остаётся `NO-GO`.

| Сайт | Итоговый технический балл | Краткий вывод |
| --- | ---: | --- |
| Science | **7,3 / 10** | Быстрый и стабильный статический сайт с корректной RU/EN-структурой; выпуск блокируют draft/noindex, неактивный сценарий обращения и технические SEO/a11y-недочёты. |
| Wellness | **7,4 / 10** | Быстрый адаптивный сайт с рабочими прямыми каналами связи; выпуск блокируют draft/noindex, отсутствующая форма заявки и незакрытые release/legal-интеграции. |
| Совместная платформа | **7,4 / 10** | Основа качественная; P0-дефектов эксплуатации не найдено, но есть намеренный P0 release gate и несколько P1/P2 задач до публичного запуска. |

Самые важные результаты:

1. **P0 release gate, не дефект:** обе площадки намеренно закрыты от индексирования одновременно через `meta robots: noindex, nofollow, noarchive` и `robots.txt: Disallow: /`. Снимать ограничения можно только после отдельного решения о выпуске.
2. **P1:** главные конверсионные сценарии не завершены. Science ведёт к отсутствующей форме брифа; Wellness показывает заглушку формы, хотя прямые Telegram/VK/B17-ссылки частично компенсируют проблему.
3. **P1:** на обеих человекочитаемых картах сайта ссылка на XML Sitemap возвращает HTTP 404; реального XML sitemap не найдено.
4. **P2:** HTML-ответы имеют HSTS, но не имеют CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` и защиты от встраивания (`frame-ancestors`/`X-Frame-Options`). Это наблюдение о hardening, а не доказательство эксплуатации.
5. **P2:** skip-link визуально доступен и имеет focus outline, но после активации фокус остаётся на `BODY`, а не переносится в `<main>`.
6. **Положительно:** 52 внутренних RU/EN URL проверены прямыми запросами — все ответили HTTP 200 без редиректов. Фирменная 404 возвращает настоящий HTTP 404. Lighthouse Best Practices = 100; ошибок Console и неуспешных ресурсов в лабораторных прогонах не обнаружено.

## B. Scope & Methodology

### Выборка URL

Science — 15 уникальных контентных URL в Neo:

- `/ru/`
- `/ru/about/`
- `/ru/research/`
- `/ru/research/dissertation/`
- `/ru/publications/`
- `/ru/conferences/`
- `/ru/education/`
- `/ru/projects/`
- `/ru/expert-services/`
- `/ru/for-organizations/`
- `/ru/contact/`
- `/ru/sitemap/`
- `/en/`
- `/en/about/`
- `/en/publications/`

Wellness — 19 уникальных контентных URL в Neo:

- `/ru/`
- `/ru/about/`
- `/ru/for-individuals/`
- `/ru/booking/`
- `/ru/faq/`
- `/ru/resources/`
- `/ru/practices/psychology/`
- `/ru/practices/neurointegration/`
- `/ru/practices/breathing/`
- `/ru/practices/movement-qigong/`
- `/ru/practices/play-and-story/`
- `/ru/programs/stress-recovery/`
- `/ru/for-organizations/`
- `/ru/sitemap/`
- `/en/`
- `/en/about/`
- `/en/booking/`
- `/en/for-organizations/`
- `/en/sitemap/`

Дополнительно проверены корневые URL, `robots.txt`, варианты `sitemap.xml`, `sitemap-index.xml`, `sitemap-0.xml`, заведомо отсутствующие URL и 52 живых RU/EN-маршрута из карт сайта.

### Устройства и условия

- Neo Browser: живой Chromium-профиль, desktop viewport около 938 CSS px; DOM, accessibility tree, навигация, keyboard focus, Performance API и полноразмерные скриншоты.
- Lighthouse Mobile: 412×823, device scale 1.75, simulated RTT 150 ms, throughput 1638,4 Kbps, CPU slowdown ×4, очищаемое storage, три эквивалентных прогона.
- Lighthouse Desktop: 1350×940, simulated RTT 40 ms, throughput 10 240 Kbps, CPU slowdown ×1, три эквивалентных прогона.
- Все итоговые показатели Lighthouse — медиана трёх прогонов; диапазон указан для LCP.
- Lighthouse измерял главные RU-страницы. Внутренние страницы проверялись в Neo через реальный DOM, Navigation/Resource Timing и прямые статусы.

### Важное условие воспроизводимости

Во время аудита оба GitHub Pages deployment обновились примерно в 17:36 CET: CSS сменился с `_astro/i18n.B1IDtWeJ.css` на `_astro/i18n.CtjRQHlQ.css`, а `Last-Modified` главных страниц изменился. После деплоя повторно подтверждены ключевые результаты: `noindex`, отсутствующие формы, 404 XML sitemap, отсутствие social-image метаданных и актуальный CSS-ресурс. Поэтому ранние Neo-снимки и Lighthouse JSON относятся к двум близким сборкам одного дня; итоговые дефекты проверены на более новой.

## C. Technical Scorecard

### Science

| Категория | Вес | Оценка | Доказательства | Комментарий |
| --- | ---: | ---: | --- | --- |
| Performance | 20% | 9,6 | Mobile LCP 0,967 с; Desktop 0,222 с; CLS 0; TBT 0 мс | Очень лёгкая страница; field CWV отсутствуют. |
| Technical SEO | 20% | 4,5 | Lighthouse SEO 66; `noindex` + `Disallow: /`; XML sitemap 404 | Метаданные, canonical и hreflang корректны, но текущая версия неиндексируема. |
| Frontend | 15% | 9,0 | Best Practices 100; Console errors 0; failed resources 0 | JS минимален; подтверждённых runtime-дефектов нет. |
| Security | 15% | 6,5 | HTTPS, HTTP→HTTPS 301, HSTS; отсутствует набор hardening-заголовков | Только пассивная проверка. |
| Accessibility | 10% | 8,0 | Lighthouse 98; heading-order fail; skip-link focus fail | Контраст, имена, alt, landmarks и lang проходят проверку. |
| Architecture & Reliability | 10% | 8,0 | 26 RU/EN URL Science из общего status-check — 200; фирменная 404 — HTTP 404 | Корневой meta-refresh и отсутствующий sitemap снижают оценку. |
| Functionality | 10% | 6,0 | Навигация и языки работают; форма сотрудничества отсутствует | Основной CTA не завершает сценарий обращения. |
| **Итого** | **100%** | **7,3** | Взвешенная сумма | Техническая база хорошая; release gate не закрыт. |

### Wellness

| Категория | Вес | Оценка | Доказательства | Комментарий |
| --- | ---: | ---: | --- | --- |
| Performance | 20% | 9,5 | Mobile LCP 0,997 с; Desktop 0,232 с; CLS 0; TBT 10/0 мс | Очень лёгкая страница; один небольшой forced reflow. |
| Technical SEO | 20% | 4,5 | Lighthouse SEO 66; `noindex` + `Disallow: /`; XML sitemap 404 | Canonical, hreflang, title/description и JSON-LD присутствуют. |
| Frontend | 15% | 8,5 | Best Practices 100; Console errors 0; failed resources 0 | Inline-скрипт навигации дал forced reflow 40,88 мс в одном mobile trace. |
| Security | 15% | 6,5 | HTTPS, HTTP→HTTPS 301, HSTS; отсутствуют hardening-заголовки | Формы и cookies отсутствуют, поэтому их защита не проверялась end-to-end. |
| Accessibility | 10% | 8,5 | Lighthouse 100; ручной skip-link focus fail | Mobile reflow визуально корректен в Lighthouse viewport. |
| Architecture & Reliability | 10% | 8,0 | 26 RU/EN URL Wellness из общего status-check — 200; фирменная 404 — HTTP 404 | Корневой meta-refresh и отсутствующий sitemap снижают оценку. |
| Functionality | 10% | 7,0 | Навигация, языки и прямые контакты работают; форма заявки отсутствует | Telegram/VK/B17 дают временный обходной путь. |
| **Итого** | **100%** | **7,4** | Взвешенная сумма | Техническая база хорошая; primary form flow и release gate не закрыты. |

## D. Performance Report

### Лабораторные результаты Lighthouse 13.6.0

| Сайт / режим | Performance | FCP | LCP, медиана (диапазон) | Speed Index | TBT | CLS | TTFB | Передано | Запросы |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Science Mobile | 98 | 0,967 с | 0,967 с (0,964–0,977) | 3,763 с | 0 мс | 0 | 0,182 с | ~10,2 KB | 3 |
| Science Desktop | 100 | 0,222 с | 0,222 с (0,220–0,357) | 0,222 с | 0 мс | 0 | 0,017 с | ~10,2 KB | 3 |
| Wellness Mobile | 99 | 0,997 с | 0,997 с (0,986–1,031) | 3,732 с | 10 мс | 0 | 0,176 с | ~13,0 KB | 3 |
| Wellness Desktop | 100 | 0,232 с | 0,232 с (0,226–0,366) | 0,232 с | 0 мс | 0 | 0,019 с | ~13,0 KB | 3 |

Полевые данные:

- LCP p75 / CLS p75 / INP p75: **N/A** — доступных CrUX/RUM-данных нет.
- Публичный PageSpeed API без ключа вернул HTTP 429 для обоих сайтов.
- TBT и Max Potential FID не используются как замена INP.

Ресурсы текущей сборки:

- Science HTML: 10 301 B decoded / 3 130 B gzip.
- Wellness HTML: 24 431 B decoded / 5 940 B gzip.
- Общий CSS: 29 261 B decoded / 6 065 B gzip.
- Внешние изображения, webfonts и тяжёлые JS-bundles на проверенных главных страницах отсутствуют.
- Gzip подтверждён для HTML и CSS.
- Хэшированный CSS кэшируется только 600 секунд; Lighthouse оценивает потенциальную экономию повторной загрузки примерно в 6 KiB.
- CSS блокирует первый render, но фактический LCP остаётся около 1 секунды на mobile; это P3, а не приоритетная регрессия.

## E. Technical SEO Report

Подтверждённые положительные сигналы:

- Все 52 проверенных RU/EN контентных URL отвечают HTTP 200 без redirect chain.
- На выборке есть один H1, уникальные title/description, self-referencing canonical.
- `hreflang=ru`, `hreflang=en`, `hreflang=x-default` согласованы с маршрутами; `x-default` ведёт на RU-версию.
- `html lang` совпадает с языком страницы.
- JSON-LD синтаксически разбирается: `Person`, `WebPage`, `BreadcrumbList`, `ScholarlyArticle`, `ResearchProject`, `Thesis`, `Service`, `ItemList`, `FAQPage` по соответствующим шаблонам.
- Человекочитаемые sitemap-страницы доступны и перечисляют основные разделы.

Проблемы:

- Сайты полностью неиндексируемы по двум независимым сигналам. Это намеренное draft-состояние, а не случайный дефект.
- `/ru/sitemap.xml`, `/sitemap.xml`, `/sitemap-index.xml`, `/sitemap-0.xml` возвращают 404; при этом HTML-карта прямо рекламирует `/ru/sitemap.xml` как XML Sitemap.
- `robots.txt` не содержит `Sitemap:`; при полном `Disallow: /` это приемлемо для draft, но не для production.
- `og:image` отсутствует на всей выборке; Twitter Card метаданные отсутствуют.
- Несколько title длиннее типичного диапазона сниппета: Science RU home 89 символов, Wellness RU home 83, Wellness EN home 88. Это риск усечения, не нарушение протокола.
- Нельзя утверждать индексацию Google/Bing: Search Console/Bing Webmaster Tools не проверялись.

## F. Frontend & Console Report

- Lighthouse `errors-in-console`: pass, 0 элементов для обеих главных страниц.
- Browser PerformanceResourceTiming на выборке не показал HTTP 4xx/5xx ресурсов.
- Каждая текущая главная страница загружает один внешний CSS; тяжёлых клиентских JS-bundles нет.
- Прямое открытие вложенных RU/EN URL работает.
- Навигация и языковые ссылки построены нативными `<a href>`.
- Mobile navigation реализована горизонтально прокручиваемыми вкладками; в Lighthouse 412×823 горизонтального переполнения контента не обнаружено.
- Wellness: Lighthouse зафиксировал forced reflow 40,88 мс из inline-скрипта центрирования активной вкладки (`scrollWidth/clientWidth/offsetLeft/offsetWidth` перед `scrollTo`). Симптом мал и не влияет на CWV, но легко устраним.

## G. Security Observations

Подтверждено:

- `http://` → `https://` через HTTP 301.
- HTTPS-страницы отдают `Strict-Transport-Security: max-age=31556952`.
- Mixed Content на проверенных страницах не обнаружен; загружаемые ресурсы HTTPS.
- `Set-Cookie` и клиентские cookies в проверенных публичных сценариях не наблюдались.
- Публичные HTML/URL не показали токены, ключи или секреты.

Не хватает на HTML-ответах:

- `Content-Security-Policy`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `frame-ancestors` в CSP или `X-Frame-Options`.

GitHub Pages ограничивает управление заголовками. Для production hardening может потребоваться CDN/reverse proxy/custom hosting либо допустимая часть политики через `<meta http-equiv>`; CSP в `Report-Only` и frame protection нужно внедрять на уровне HTTP, когда инфраструктура это позволит.

Пассивная проверка не доказывает отсутствие уязвимостей. Порты, XSS/SQLi, обход авторизации, нагрузка и эксплуатация не выполнялись.

## H. Accessibility Report

Положительно:

- `lang`, main/nav/footer landmarks, единичный H1, skip-link, нативные ссылки и заметный `:focus-visible` присутствуют.
- На проверенных страницах нет изображений без `alt`, безымянных кнопок/ссылок, inputs без label и дублирующихся ID.
- Lighthouse: Science 98, Wellness 100.
- Контрастных ошибок Lighthouse не обнаружил.
- Mobile screenshot 412×823 показывает корректный reflow hero/CTA.

Подтверждённые проблемы:

1. Science: footer использует `<h4 class="footer-heading">НАВИГАЦИЯ</h4>` сразу после структуры, где на главной есть только H1. Lighthouse фиксирует `heading-order` fail.
2. Оба сайта: первый Tab фокусирует видимый skip-link с 3 px outline; Enter меняет hash на `#main-content`, но `document.activeElement` становится `BODY`, а `<main>` не имеет `tabindex="-1"`. Пользователь клавиатуры не получает перенос точки фокуса в основной контент.

Не выполнены и остаются ограничениями: NVDA/TalkBack/VoiceOver, 200% zoom, Windows High Contrast, полная ручная проверка каждого focus state и пользовательское тестирование горизонтальной mobile-nav.

## I. Issue Register

### AUD-SEO-001 — P0 release gate — сайты неиндексируемы

- Категория: Technical SEO / Release.
- URL: все проверенные страницы обоих сайтов.
- Описание: одновременно действуют `meta robots="noindex, nofollow, noarchive"` и `robots.txt` с `Disallow: /`.
- Шаги: открыть любую RU/EN-страницу, исследовать `<head>`, затем открыть `/robots.txt`.
- Фактический результат: Lighthouse SEO 66 и `is-crawlable = 0`.
- Ожидаемый результат: для текущего draft — именно такое поведение; для production — индексируемые подтверждённые страницы и разрешённый обход.
- Доказательство: Neo DOM, Lighthouse JSON, HTTP 200 `/robots.txt`.
- Причина: намеренный `PUBLIC_SITE_STATUS=draft` (высокая уверенность).
- Решение: **не снимать сейчас**. После закрытия content/legal/release gate отдельным PR переключить production-политику, проверить staging неиндексируемость, production robots/meta, Search Console и Bing.
- Сложность: M с учётом governance.
- Проверка исправления: production HTML без `noindex`, robots разрешает нужные URL, sitemap валиден, URL Inspection доступен; staging остаётся закрытым.

### AUD-FUNC-001 — P1 — Science CTA ведёт к отсутствующей форме

- Категория: Functionality / Conversion.
- URL: `/ru/`, `/ru/contact/`, EN-эквиваленты.
- Шаги: нажать CTA «Обсудить…» → «Перейти к форме».
- Фактический результат: якорь `#enquiry` содержит текст о будущей активации; `document.forms.length = 0`.
- Ожидаемый результат: защищённая форма либо явный рабочий канал обращения в основном контенте.
- Доказательство: Neo `main` extraction и DOM; форма отсутствует.
- Причина: Turnstile, Resend и адрес назначения ещё не настроены (высокая уверенность по видимому тексту).
- Решение: до backend-интеграции заменить CTA на честный рабочий контакт; затем включить форму, consent, антиспам, success/error states и журналируемую доставку без чувствительных данных.
- Сложность: M/L.
- Проверка: безопасная тестовая заявка на staging, доставленное письмо, anti-spam, validation, error/success, отсутствие PII в URL/logs.

### AUD-FUNC-002 — P1 — Wellness форма заявки отсутствует

- Категория: Functionality / Conversion.
- URL: `/ru/`, `/ru/booking/`, `/ru/for-organizations/`, EN-эквиваленты.
- Шаги: нажать «Записаться…» → «Перейти к форме».
- Фактический результат: `document.forms.length = 0`, показана заглушка «Форма подключается отдельно».
- Ожидаемый результат: рабочая минимальная форма или CTA, ведущий непосредственно в разрешённый канал записи.
- Доказательство: Neo DOM/read и скриншот booking; прямые Telegram/VK/B17-ссылки работают как обход.
- Причина: интеграция формы намеренно отключена (высокая уверенность).
- Решение: до backend-релиза направить основной CTA прямо на выбранный канал; затем включить форму только после privacy/legal review, Turnstile, rate-limit, Resend и e2e-теста.
- Сложность: M/L.
- Проверка: staging e2e и production smoke без реальной оплаты/календаря до их отдельного approval.

### AUD-SEO-002 — P1 — сломанная ссылка на XML Sitemap

- Категория: Technical SEO / Reliability.
- URL: `/ru/sitemap/` и `/en/sitemap/` обоих сайтов.
- Шаги: нажать «XML Sitemap».
- Фактический результат: `/ru/sitemap.xml` возвращает HTTP 404; стандартные `/sitemap.xml`, `/sitemap-index.xml`, `/sitemap-0.xml` также 404.
- Ожидаемый результат: XML sitemap с canonical RU/EN URL либо отсутствие обещающей ссылки до генерации файла.
- Доказательство: Neo 404, `curl` HTTP 404, скриншот `broken-xml-sitemap.png`.
- Причина: HTML-ссылка добавлена без deploy XML generator/output (высокая уверенность).
- Решение: генерировать root `/sitemap.xml` или index, включать только canonical 200 URL, обновить ссылку и добавить `Sitemap:` в production robots.
- Сложность: S/M.
- Проверка: HTTP 200 + `application/xml`, XML validator, все `<loc>` отвечают 200 и совпадают с canonical/hreflang.

### AUD-A11Y-001 — P2 — skip-link не переносит фокус

- Категория: Accessibility, WCAG 2.2 2.4.1.
- URL: общий шаблон обоих сайтов.
- Шаги: открыть страницу, Tab, Enter.
- Фактический результат: hash становится `#main-content`, но active element = `BODY`; main не имеет `tabindex`.
- Ожидаемый результат: фокус на начале main, последующий Tab продолжает основной контент.
- Доказательство: Neo keyboard test и computed focus outline.
- Причина: якорная навигация на нефокусируемый `<main>` (высокая уверенность).
- Решение: добавить `tabindex="-1"` на main и проверить фокус/scroll; не удалять видимый focus outline.
- Сложность: S.
- Проверка: activeElement.id = `main-content` после Enter в Chrome/Firefox + NVDA smoke.

### AUD-A11Y-002 — P2 — нарушен порядок заголовков Science

- Категория: Accessibility / Semantic HTML.
- URL: `/ru/` Science и другие шаблоны без H2/H3 перед footer.
- Шаги: запустить Lighthouse Accessibility.
- Фактический результат: `H1` → `H4.footer-heading` (`НАВИГАЦИЯ`), `heading-order = 0`.
- Ожидаемый результат: последовательная структура или не-heading элемент для визуального label footer-колонки.
- Доказательство: Lighthouse node selector `div.footer-inner > div.footer-grid > div.footer-col > h4.footer-heading`.
- Причина: общий footer жёстко использует H4 независимо от структуры страницы (высокая уверенность).
- Решение: использовать H2/H3 по согласованной document outline либо `<p class="footer-heading">`.
- Сложность: S.
- Проверка: Lighthouse/axe pass на страницах с разной глубиной heading outline.

### AUD-SEC-001 — P2 — неполный набор security headers

- Категория: Security hardening.
- URL: HTML-ответы обоих сайтов.
- Шаги: запросить response headers HTTPS-страницы.
- Фактический результат: HSTS есть; CSP, nosniff, Referrer-Policy, Permissions-Policy и frame protection отсутствуют.
- Ожидаемый результат: согласованный минимальный header baseline.
- Доказательство: датированный `curl -D -` в этом аудите.
- Причина: ограничения/настройки GitHub Pages (средняя уверенность).
- Решение: зафиксировать policy; внедрять CSP через Report-Only, затем enforcement; при необходимости поставить CDN/proxy с управляемыми headers.
- Сложность: M.
- Проверка: повторный header scan, CSP report review, проверка внешних ссылок/виджетов и frame embedding.

### AUD-SEO-003 — P2 — нет social preview images и Twitter Cards

- Категория: Technical SEO / Social sharing.
- URL: вся проверенная выборка.
- Шаги: исследовать `head`.
- Фактический результат: `og:title`, `og:description`, `og:url`, `og:type` есть; `og:image` и Twitter Card отсутствуют.
- Ожидаемый результат: абсолютный HTTPS `og:image` подходящего размера и согласованные Twitter Card поля.
- Доказательство: Neo DOM на RU/EN страницах.
- Причина: финальные публичные изображения/бренд-система не утверждены (средняя уверенность).
- Решение: после проверки прав подготовить отдельные share images Science/Wellness, добавить dimensions/alt и проверить previews.
- Сложность: M.
- Проверка: Facebook Sharing Debugger, LinkedIn Post Inspector, Telegram preview и проверка raw HTML.

### AUD-ARCH-001 — P2 — корень использует HTTP 200 + meta refresh

- Категория: Architecture / SEO / Navigation.
- URL: `/` обоих сайтов.
- Шаги: запросить корень без выполнения HTML.
- Фактический результат: HTTP 200 и `<meta http-equiv="refresh" content="2;url=/ru/">`; есть fallback-ссылка и canonical на `/ru/`.
- Ожидаемый результат: HTTP redirect на выбранный locale либо полноценная locale-neutral landing page.
- Доказательство: raw HTML корня и HTTP headers.
- Причина: статический redirect Astro/GitHub Pages (высокая уверенность).
- Решение: если инфраструктура позволяет, 301/302 на edge; иначе уменьшить delay до 0, сохранить ссылку и проверить back-button/history.
- Сложность: S/M.
- Проверка: HTTP status/Location, отсутствие redirect chain, back/forward smoke.

### AUD-PERF-001 — P3 — короткий cache TTL и render-blocking CSS

- Категория: Performance.
- URL: общий CSS обоих сайтов.
- Фактический результат: хэшированный CSS ~6 KiB gzip, `Cache-Control: max-age=600`, блокирует render; Lighthouse cache saving ~6 KiB.
- Ожидаемый результат: immutable long-cache для хэшированных assets, если hosting это поддерживает.
- Доказательство: headers, Lighthouse `cache-insight` и `render-blocking-insight`.
- Причина: политика GitHub Pages (высокая уверенность).
- Решение: не усложнять до измеримого влияния; при переходе на CDN выставить `public,max-age=31536000,immutable` для хэшированных assets.
- Сложность: M инфраструктурно.
- Проверка: повторный header audit и warm-cache trace.

### AUD-PERF-002 — P3 — небольшой forced reflow Wellness

- Категория: Frontend performance.
- URL: `/ru/` Wellness; код общий для навигации.
- Фактический результат: Lighthouse зафиксировал forced reflow 40,88 мс в одном mobile trace; TBT-медиана 10 мс, LCP ~1 с.
- Ожидаемый результат: отсутствие принудительного sync layout в critical path.
- Доказательство: Lighthouse trace; inline script читает `scrollWidth/clientWidth/offsetLeft/offsetWidth` перед `scrollTo`.
- Причина: центрирование активной вкладки при загрузке (высокая уверенность).
- Решение: перенести измерение в `requestAnimationFrame`, рассмотреть `scrollIntoView({inline:'center'})`, повторно измерить.
- Сложность: S.
- Проверка: три эквивалентных mobile traces без forced-reflow insight.

### AUD-SEO-004 — P3 — длинные title на главных страницах

- Категория: SEO snippets.
- URL: Science RU home, Wellness RU/EN home и часть внутренних страниц.
- Фактический результат: 83–89 символов на главных; несколько внутренних title 64–75.
- Ожидаемый результат: компактное уникальное начало, бренд без лишнего дублирования.
- Доказательство: Neo DOM title length.
- Причина: длинный descriptor + двойной бренд (высокая уверенность).
- Решение: проверить SERP-preview и сократить после утверждения позиционирования; не жертвовать точностью ради произвольного лимита.
- Сложность: S.
- Проверка: длина/preview, уникальность и сохранение смысла RU/EN.

## J. Action Plan

### 1. Quick Wins

1. Исправить skip-link focus (`main tabindex="-1"`) и перепроверить клавиатурой.
2. Исправить footer heading semantics Science.
3. Удалить или исправить ссылку на XML sitemap; предпочтительно сразу генерировать корректный root sitemap.
4. Заменить CTA «Перейти к форме» на честный рабочий контакт, пока формы выключены.
5. Перенести mobile-nav scroll measurement в безопасный момент кадра и повторить trace.

### 2. High Priority до публичного запуска

1. Реализовать и протестировать Science enquiry и Wellness booking/B2B forms на staging.
2. Закрыть privacy/legal/consent/anti-spam/delivery требования для форм.
3. Сформировать production robots/meta/sitemap policy, но не снимать draft-защиту до отдельного GO.
4. Добавить social preview assets только после подтверждения прав.
5. Принять решение по инфраструктуре security headers и корневому redirect.

### 3. Strategic

1. Подключить first-party RUM (`web-vitals`) без передачи персональных данных; дождаться репрезентативного p75 LCP/CLS/INP.
2. Добавить CI browser smoke: 52 маршрута, 404, canonical/hreflang, sitemap, axe/Lighthouse, формы staging.
3. Настроить uptime/broken-link/TLS monitoring после утверждения production-доменов.
4. Подготовить rollback и release log отдельно для Science и Wellness.

Зависимости:

- Формы зависят от privacy/legal, адреса назначения, Turnstile/Resend и владельца данных.
- Индексация зависит от content/legal approval и отдельных release decisions.
- Social previews зависят от финальных бренда, изображений и прав.
- Security headers и настоящий redirect зависят от hosting/CDN.

## K. Final Verdict

Оба сайта технически быстрые, компактные и устойчивые для статического прототипа. Основная проблема не в производительности или runtime-ошибках, а в незавершённости release-контура: индексирование намеренно выключено, XML sitemap отсутствует, главные формы не работают, а security/monitoring/integration layers не доведены до production.

Рекомендуемый статус: **NO-GO для публичного индексируемого запуска; CONDITIONAL GO для закрытого draft-preview**.

Порядок исправления: формы и честные CTA → sitemap и a11y quick wins → legal/privacy/release gate → production robots/meta → security headers/redirect → RUM и monitoring.

## Артефакты и скриншоты

Каталог доказательств: `D:\Data\Natali-site-audit-2026-10-30`

Ключевые файлы:

- `science-mobile-lighthouse.png`
- `wellness-mobile-lighthouse.png`
- `science-desktop.png`
- `wellness-desktop.png`
- `broken-xml-sitemap.png`
- `wellness-booking-placeholder.png`
- `science-mobile-1.json` … `science-mobile-3.json`
- `science-desktop-1.json` … `science-desktop-3.json`
- `wellness-mobile-1.json` … `wellness-mobile-3.json`
- `wellness-desktop-1.json` … `wellness-desktop-3.json`

## Ограничения аудита

- BrowserOS Neo не предоставил отдельный экспорт DevTools Console/Network waterfall или certificate viewer; Console и network failures подтверждались через Lighthouse и PerformanceResourceTiming.
- Lighthouse запускался только для главных RU-страниц; остальные URL проверялись Neo/HTTP.
- CrUX/RUM/INP недоступны; PSI API вернул 429.
- Не выполнялись реальные отправки форм, оплаты, календарь, email, CAPTCHA, analytics и cookie-consent, поскольку интеграции выключены и аудит read-only.
- Не проверялись backend, база данных, CI/CD secrets, GitHub settings, DNS, Search Console, Bing Webmaster, server logs и WAF.
- Не проводились screen-reader, 200% zoom, high-contrast и полноценные пользовательские тесты.
- Внешние сайты ORCID/Scopus/Web of Science/Telegram/Yandex Disk не оценивались как принадлежащие этому проекту; их доступность для ботов может отличаться от пользовательской.
- Во время аудита произошёл deploy; ключевые findings повторно проверены после него, но отчёт не является immutable snapshot каждого байта всех 34 посещённых страниц.
