# План общей платформы, SEO, GEO и AI-search

Дата: 30 октября 2026 года.  
Исполнители: technical lead, DevOps, security engineer, SEO-специалист, data/content engineer, frontend-разработчик, legal reviewer.

## 1. Цель

Подготовить общую техническую основу двух независимых приложений без смешивания доменов, форм, аналитики, релизов и пользовательских предложений.

## 2. Этап P0 — архитектурные решения

### P0.1. Hosting contract

1. Сопоставить текущий GitHub Pages draft с контрактом Cloudflare Pages.
2. Выбрать один production-вариант и оформить ADR.
3. Если выбран Cloudflare Pages, определить:
   - отдельные проекты Wellness и Science;
   - preview, staging и production;
   - Cloudflare Access для preview;
   - Pages Functions;
   - Turnstile;
   - rate limiter binding;
   - Web Analytics;
   - DNS, TLS и security headers.
4. Если выбран GitHub Pages, сначала перепроектировать формы, access-control, headers и server-side функции; не объявлять существующий static deploy эквивалентом исходного ТЗ.

Критерий: один утверждённый ADR без противоречий в specs, workflows и release-check.

### P0.2. Домены и почта

- Зарегистрировать отдельные домены.
- Зафиксировать владельца, доступ, renewal и recovery.
- Создать ролевые email.
- Настроить SPF, DKIM и DMARC.
- Не использовать временный личный адрес как production-контракт без явного решения.

### P0.3. Секреты и окружения

- Хранить секреты только в защищённых settings платформы.
- В Git держать только `.env.example` без значений.
- Развести переменные Wellness и Science.
- Запретить production build при placeholder, draft URL и отсутствующих обязательных bindings.

## 3. Этап P1 — dependency и security

Ответственные: security engineer и technical lead.

1. Повторно выполнить `pnpm audit --prod` на текущем lockfile.
2. Для critical/high подготовить отдельный upgrade spike.
3. Проверить совместимость с Windows Application Control и Linux CI.
4. Не обновлять Astro вслепую; сравнить build, routes, forms, SSR/static behavior и image pipeline.
5. Если исправление временно невозможно, оформить датированный risk acceptance с компенсирующими мерами и сроком пересмотра.
6. Настроить CSP, Referrer-Policy, Permissions-Policy, frame protection, `nosniff` и HSTS.
7. Провести threat model форм, email, Calendar, invoice links, analytics и admin-доступа.

Критерий: нет незакрытого critical/high либо есть утверждённое исключение с владельцем и сроком.

## 4. Этап P2 — техническое SEO

Ответственные: SEO-специалист и frontend-разработчик.

Для каждого сайта отдельно:

- уникальные title в рабочем диапазоне без двойного бренда;
- уникальные meta description;
- canonical на production-домен;
- RU/EN hreflang и `x-default` по принятому правилу;
- sitemap только с публичными canonical URL;
- robots policy по окружениям;
- custom 404 с корректным HTTP status;
- OpenGraph и Twitter metadata с реальными изображениями;
- отсутствие placeholder verification tokens;
- internal linking map без orphan pages;
- first-party HTML privacy/legal pages;
- Search Console, Bing Webmaster Tools и Yandex Webmaster после выбора доменов.

Не снимать `noindex` до отдельного release-gate.

## 5. Этап P3 — общий entity graph

Ответственные: data/content engineer, SEO-специалист и редакторы обоих сайтов.

### P3.1. Person identity

Создать один стабильный идентификатор личности Наталии, используемый обоими сайтами.

Обязательные данные:

- полное имя RU/EN;
- допустимые варианты публикационного имени;
- портрет;
- роли по каждому контексту;
- подтверждённые профили;
- дата обновления;
- ссылка на общую identity source page или устойчивый canonical fragment.

Не задавать `Person.url` равным каждой текущей странице.

### P3.2. Связи

- Wellness: `Person` → `Service` → `Offer` → `Audience`.
- Science: `Person` → `ScholarlyArticle` / `Thesis` / `ResearchProject`.
- `sameAs` содержит только проверенные профили Наталии.
- Видимый HTML, CMS-данные и JSON-LD должны совпадать.

### P3.3. Количественные утверждения

Для `40+`, `100+`, `2000+` и других чисел указать:

- точное значение или правило округления;
- дату `as of`;
- источник или метод подсчёта;
- владельца обновления.

## 6. Этап P4 — AI-search readiness

Ответственные: SEO-специалист, редакторы и technical lead.

1. Принять отдельные решения для Googlebot, Bingbot, YandexBot, OAI-SearchBot, GPTBot и ChatGPT-User.
2. Не смешивать поисковую индексацию, пользовательский fetch и обучение моделей.
3. Обеспечить доступность основного содержания в серверном HTML без hover, modal и client-only rendering.
4. На экспертных страницах показывать автора, дату обновления, первичные источники и контекст.
5. Использовать короткие answer blocks только там, где они помогают человеку.
6. Не создавать скрытую версию страницы специально для агентов.
7. Рассматривать `llms.txt` только после запуска canonical production как необязательный эксперимент.

Критерий: агент и поисковый crawler получают тот же проверенный смысл, что и пользователь.

## 7. Этап P5 — географическое SEO

### Wellness

- Подтвердить фактический тип очной локации в Белграде.
- Публиковать адрес только если это разрешено, безопасно и соответствует eligibility.
- Создать одну содержательную страницу/секцию о работе в Белграде.
- Не создавать страницы по районам и странам без самостоятельной пользы.
- Добавлять `LocalBusiness` или local/service schema только после подтверждения видимых NAP-фактов.
- Решить `sr-Latn` на основании аудитории и операционной возможности поддерживать локаль.

### Science

- Использовать географию только как факт аффилиаций, проектов, мероприятий и сотрудничеств.
- Не создавать локальные doorway-страницы для академических услуг.

## 8. Этап P6 — аналитика и наблюдаемость

Ответственные: product analyst, DevOps и privacy reviewer.

- Создать KPI dictionary и event map до включения событий.
- Не отправлять контакты, текст формы, организационные брифы и health data.
- Проверить Cloudflare Web Analytics в cookie-free конфигурации.
- Wellness KPI: enquiry → qualified → paid first meeting → follow-up.
- Science KPI: qualified brief → proposal → project; отдельно считать outbound к публикациям и профилям.
- Настроить uptime, form delivery и release monitoring без содержимого заявок.

## 9. Definition of Done общей платформы

1. Hosting ADR утверждён и реализован.
2. Домены, TLS, DNS и email принадлежат согласованным владельцам.
3. Preview закрыт Access и остаётся `noindex`.
4. Security headers и dependency risk приняты.
5. Формы имеют отдельные bindings и secrets.
6. SEO foundation проверен на production-like URL.
7. Entity graph согласован между сайтами.
8. Crawler policy записана и проверена.
9. Analytics не содержит PII.
10. Wellness и Science можно выпускать и откатывать независимо.

