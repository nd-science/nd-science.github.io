# Дорожная карта задач после привязки доменов (Post-Domain Launch Roadmap)

**Дата формирования:** 10 ноября 2026 года  
**Проекты:** Science (`tvet.si`), Wellness (`natalicompass.com`), RuDoctors (`rudoctors.com`)  
**Текущий статус:** Домены приобретены, DNS-хостинг активен, сформированы ТЗ на привязку  
**Связанные документы:** [`domain-connection-task.md`](domain-connection-task.md), [`registrant-card.template.md`](registrant-card.template.md), `PROJECT_STATUS.md`

---

## Пакет 1. Подключение и привязка домена rudoctors.com (RuDoctors)

* **Репозиторий проекта:** `D:\Projects\rudoctors\site` (репозиторий `rudoctors/rudoctors.github.io`)
* **Текущий адрес:** `https://rudoctors.com` (ранее `https://rudoctors.github.io/`)
* **Целевой домен:** `https://rudoctors.com` (ID в Neoserv: `478851`, DNS-хостинг активен)

### Задачи к выполнению:
- [x] **1.1. DNS-записи в Neoserv:**  
  В панели [moj.neoserv.si/domains/478851/records](https://moj.neoserv.si/domains/478851/records) добавлены:
  * 4 A-записи на apex (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (TTL 3600)
  * 1 CNAME-запись для `www`: `rudoctors.github.io.` (TTL 3600)
- [x] **1.2. Файл CNAME в коде проекта:**  
  Создан `D:\Projects\rudoctors\site\public\CNAME` с текстом `rudoctors.com`.
- [x] **1.3. Конфигурация Astro:**  
  В `D:\Projects\rudoctors\site\astro.config.mjs` обновлен параметр `site: "https://rudoctors.com"`.
- [x] **1.4. Настройки GitHub Pages:**  
  В репозитории GitHub (`rudoctors/rudoctors.github.io`) через API привязан Custom domain `rudoctors.com`, выпущен сертификат и активирован `https_enforced: true`.
- [x] **1.5. Проверка сборки:**  
  Выполнены `astro check` (0 errors) и `astro build` (503 страницы успешно собраны).

---

## Пакет 2. Проверка SSL/HTTPS, склейки зеркал и редиректов

*Критично для исключения дублей страниц в поиске и обеспечения безопасности соединений.*

### Задачи к выполнению:
- [x] **2.1. Выпуск Let's Encrypt сертификатов:**  
  Для всех трех репозиториев (`nd-science.github.io`, `wellnessnd.github.io`, `rudoctors.github.io`) TLS-сертификаты успешно выпущены (статус `approved`).
- [x] **2.2. Принудительный HTTPS:**  
  Активирован `https_enforced: true` для каждого репозитория.
- [x] **2.3. Склейка зеркал (Canonical Domain):**  
  Проверено через `curl.exe -I`:
  * Запрос `http://tvet.si` перенаправляет с 301 на `https://tvet.si/`
  * Запрос `https://www.tvet.si` бесшовно перенаправляет с 301 на `https://tvet.si/`
  * Аналогично для `natalicompass.com` и `rudoctors.com`.
- [x] **2.4. Редирект со старых адресов GitHub Pages:**  
  Проверено через `curl.exe -I`: обращения к старым `*.github.io` автоматически отдают 301 Redirect на новые канонические домены.

---

## Пакет 3. Включение поисковой индексации (Public Release Gate)

*Сайты Наталии сейчас закрыты от индексации метатегом `noindex, nofollow` до утверждения контента.*

### Задачи к выполнению:
- [ ] **3.1. Подтверждение готовности контента Наталией:**  
  Получить формальное одобрение от владельца контента на открытие сайтов публике.
- [ ] **3.2. Снятие тега `noindex`:**  
  Переключить переменную окружения `PUBLIC_SITE_STATUS=production` (или `SITE_STATUS=production` в CI/CD).
  * Убедиться в сгенерированном HTML: `<meta name="robots" content="index, follow" />`.
- [ ] **3.3. Обновление `robots.txt`:**  
  Открыть краулеры:
  ```text
  User-agent: *
  Allow: /

  Sitemap: https://tvet.si/sitemap-index.xml
  # (для Wellness: https://natalicompass.com/sitemap-index.xml)
  # (для RuDoctors: https://rudoctors.com/sitemap-index.xml)
  ```
- [ ] **3.4. Настройка политик для AI-поисковиков:**  
  * Разрешить поисковые AI-боты: `PerplexityBot`, `ChatGPT-User`, `Applebot-Extended` (обеспечивает цитирование в ответах ИИ-ассистентов).
  * При необходимости ограничить нежелательные обучающие краулеры (`CCBot`, `GPTBot`).
- [ ] **3.5. Верификация Sitemap:**  
  Проверить доступность и валидность `https://tvet.si/sitemap-index.xml` и `https://natalicompass.com/sitemap-index.xml` (все URL должны начинаться с нового домена и иметь протокол `https`).

---

## Пакет 4. Регистрация в кабинетах поисковых систем (Вебмастера)

### Задачи к выполнению:
- [x] **4.1. Google Search Console (GSC):**
  * Все 3 ресурса добавлены как **Доменный ресурс** (Domain Property) под аккаунтом `ivan.dolgov.han.dong@gmail.com`:
    * `tvet.si` (sc-domain:tvet.si) — подтверждён через DNS TXT.
    * `natalicompass.com` (sc-domain:natalicompass.com) — подтверждён через DNS TXT.
    * `rudoctors.com` (sc-domain:rudoctors.com) — подтверждён через DNS TXT.
  * Карты сайтов отправлены:
    * `https://tvet.si/sitemap-index.xml`
    * `https://natalicompass.com/sitemap-index.xml`
    * `https://rudoctors.com/sitemap-index.xml`
- [ ] **4.2. Яндекс.Вебмастер:**
  * Добавить сайты `https://natalicompass.com`, `https://tvet.si` и `https://rudoctors.com`.
  * Подтвердить права через метатег в `BaseLayout.astro` или DNS TXT.
  * Задать региональную привязку (для RuDoctors: Сербия / Белград; для Wellness: Белград / международный; для Science: международный).
  * Отправить `sitemap-index.xml`.
  * Перепроверить отображение фавиконок в поиске Яндекса.
- [x] **4.3. Bing Webmaster Tools:**
  * Авторизовались через Google-аккаунт `ivan.dolgov.han.dong@gmail.com`.
  * Выполнен импорт из Google Search Console: все три домена (`natalicompass.com`, `tvet.si`, `rudoctors.com`) успешно добавлены и верифицированы.

---

## Пакет 5. Сквозное тестирование форм и вебхуков (CORS & Webhooks)

*Критический технический шаг: при смене домена меняется заголовок `Origin`, что может блокировать отправку запросов бэкендом.*

### Задачи к выполнению:
- [x] **5.0. Обновление разрешенных Hostnames в Cloudflare Turnstile:**  
  В панели Cloudflare для виджета `0x4AAAAAAF7h0Bvt6XTZYqm4` успешно добавлены домены `tvet.si` и `natalicompass.com`. Проверена живая генерация токенов Turnstile на обеих формах.
- [ ] **5.1. Форма записи Wellness (`https://natalicompass.com/ru/booking/`):**
  * Отправить тестовую заявку с реального сайта на новом домене.
  * Проверить отсутствие ошибок CORS в консоли разработчика.
  * Убедиться в поступлении строки в Google Таблицу CRM.
  * Убедиться в мгновенной доставке уведомления в Telegram через `@wellnessndbot`.
- [ ] **5.2. Форма связи Science (`https://tvet.si/ru/contact/`):**
  * Отправить тестовый академический запрос.
  * Убедиться в успешной отправке и корректной работе антиспам-защиты (Cloudflare Turnstile).
- [ ] **5.3. Модуль отзывов RuDoctors (`https://rudoctors.com/leave-review/`):**
  * Протестировать отправку отзыва и работу Telegram-модерации.

---

## Пакет 6. Веб-аналитика и мониторинг конверсий

### Задачи к выполнению:
- [ ] **6.1. Google Analytics 4 (GA4):**
  * Создать потоки данных (Data Streams) для `tvet.si`, `natalicompass.com` и `rudoctors.com`.
  * Подключить Measurement ID в конфигурацию сайтов.
- [ ] **6.2. Яндекс.Метрика:**
  * Создать счетчики для русскоязычной аудитории (с включённым Вебвизором).
  * Настроить цели: «Клик на Telegram», «Отправка формы записи», «Отправка формы связи».
- [ ] **6.3. Интеграция с Cookie Consent:**
  * Убедиться, что скрипты аналитики загружаются корректно в соответствии с выбором пользователя в баннере согласия на обработку cookie (GDPR).

---

## Пакет 7. Настройка почты на домене (Email Forwarding)

*Красивые представительские адреса без необходимости оплачивать отдельные почтовые ящики.*

### Задачи к выполнению:
- [x] **7.1. Почтовые алиасы (Neoserv / Cloudflare):**  
  Настроена бесплатная пересылка писем (Forwarding) у регистратора Neoserv:
  * `contact@tvet.si` → пересылка на `nataliia.e.ovchinnikova@gmail.com`
  * `hello@natalicompass.com` → пересылка на `nataliia.e.ovchinnikova@gmail.com`
  * `info@rudoctors.com` → пересылка на `ivan.dolgov.han.dong@gmail.com`
- [ ] **7.2. Проверка тестовым письмом:**  
  Отправить тестовое письмо на доменный адрес и проверить доставку во входящие Gmail.
- [x] **7.3. DNS-записи аутентификации (SPF):**  
  Добавлена SPF-запись (`v=spf1 include:_spf.neoserv.si ~all`) для всех трех доменов в DNS Neoserv.

---

## Пакет 8. Обновление внешних профилей, каталогов и соцсетей

*Синхронизация цифрового следа и замена временных ссылок на постоянные production-домены.*

### Задачи к выполнению:
- [ ] **8.1. Социальные сети и мессенджеры:**
  * **Telegram Наталии:** обновить описание канала и личного профиля, указав сайт практики `natalicompass.com`.
  * **Визитка Aqulas:** заменить временную ссылку `wellnessnd.github.io` на `natalicompass.com`.
  * **Telegram-боты:** обновить ссылки в меню команд и WebApp.
- [ ] **8.2. LinkedIn Наталии Долговой:**
  * В блоке **Contact info** указать сайты:
    * Science: `https://tvet.si`
    * Practice: `https://natalicompass.com`
  * Добавить ссылки на научный сайт в публикации и проекты.
- [ ] **8.3. Международные каталоги специалистов:**
  * **It's Complicated (`complicated.life`):** обновить URL персонального сайта в профиле психолога на `https://natalicompass.com`.
  * **B17.ru:** указать постоянный сайт практики.
  * **ORCID / ResearchGate:** привязать официальный сайт исследователя `https://tvet.si`.
- [ ] **8.4. RuDoctors в локальных сообществах:**
  * Обновить ссылку `https://rudoctors.com` в каналах релокантов в Сербии, каталогах и закрепах.
