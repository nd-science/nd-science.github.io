# Реестр задач по итогам аудита Wellness и Science

Дата: 29 октября 2026 года.  
Источник: [site-readiness-audit-2026-10-29.md](site-readiness-audit-2026-10-29.md).  
Статус всех задач: `OPEN`, пока нет отдельного доказательства и даты приёмки.  
Этот документ ставит задачи; он не разрешает изменение production, публикацию, оплату или внешние коммуникации.

## 1. Правила работы с реестром

- `P0` — блокирует public production, создаёт юридический, security или репутационный риск.
- `P1` — блокирует основной пользовательский сценарий, доверие, индексацию или доступность.
- `P2` — заметно улучшает конверсию, эксплуатацию и качество.
- `P3` — эксперимент или полировка после стабилизации.
- Для закрытия задачи нужны результат, evidence URL/файл, дата и владелец.
- Задачи кода выполняются отдельным implementation-turn; текущий аудит код не меняет.

## 2. P0 — release blockers

| ID | Сайт | Задача | Владелец решения | Критерий приёмки | Зависимости |
| --- | --- | --- | --- | --- | --- |
| AUD-P0-001 | оба | Зафиксировать окончательный hosting contract: Cloudflare Pages для preview/production либо официально переписать ТЗ под GitHub Pages | владелец продукта + инженер | ADR содержит выбранную схему; preview, staging, production и владельцы доступов описаны; нет противоречия с `docs/specs/30-*` | домены |
| AUD-P0-002 | оба | Реализовать закрытый preview через Cloudflare Access и сохранить `noindex` | инженер/ops | неизвестный пользователь не открывает preview; авторизованный открывает; robots/meta проверены | AUD-P0-001 |
| AUD-P0-003 | оба | Подготовить remediation для 1 critical, 3 high и остальных dependency findings Astro/Sharp | инженер + security reviewer | `pnpm audit --prod` не имеет незакрытых critical/high либо существует датированный risk acceptance с компенсациями; проверена совместимость с Windows Application Control и Linux CI | отдельный тестовый upgrade |
| AUD-P0-004 | оба | Выбрать реальные домены, зарегистрировать владельца, описать DNS/TLS/renewal | владелец продукта + ops | домены принадлежат согласованному владельцу; TLS работает; renewal/доступы/rollback описаны | shortlist доменов |
| AUD-P0-005 | оба | Утвердить публичные email и почтовую инфраструктуру | Наталия + ops | ролевые адреса работают; SPF, DKIM, DMARC проходят; доступ и восстановление описаны | домены |
| AUD-P0-006 | Wellness | Получить legal review географии, 18+, privacy/consent, кризисного текста, отмен/возвратов и RU/Serbia payment flows | Наталия + юрист | письменный итог; точные public формулировки; `LEGAL_REVIEW_APPROVED` разрешён только после этого | выбранные страны/статусы |
| AUD-P0-007 | Science | Утвердить privacy/confidentiality, academic ethics, authorship и права на материалы формы | Наталия + legal/ethics reviewer | public тексты приняты; правила обработки брифов и конфиденциальных материалов определены | email/форма |
| AUD-P0-008 | оба | Собрать финальные медиа и права | Наталия + контент-редактор | портреты, разрешения, alt/captions; список допустимых дипломов, CV, публикаций, логотипов и отзывов | consent holders |
| AUD-P0-009 | Wellness | Подготовить минимум один redacted credential PDF | контент-редактор + Наталия | нет номера/подписи/адреса/лишних ПДн; есть подпись, тип, год и право публикации; release gate проходит | AUD-P0-008 |
| AUD-P0-010 | Science | Подготовить RU/EN PDF CV | Наталия + редактор | два доступных PDF, согласованных с HTML-биографией, без лишних ПДн; release gate проходит | AUD-P0-008 |
| AUD-P0-011 | оба | Подключить и испытать Forms/Turnstile/Resend в test preview | инженер + ops | success, validation, Turnstile fail, rate limit, Resend fail, duplicate, RU/EN reply; PII не попадает в логи/analytics | Cloudflare + email + legal |
| AUD-P0-012 | Wellness | Провести ручной end-to-end `заявка → suitability → счёт → оплата → calendar → перенос/возврат` | Наталия + ops | чек-лист с датой для RU и international сценария; подтверждены шаблоны сообщений и ответственные | legal/payment/calendar |
| AUD-P0-013 | оба | Настроить security headers и CDN-policy | security/ops | CSP, Referrer-Policy, Permissions-Policy, frame protection, nosniff и HSTS проверены на production-like URL; Turnstile/analytics не ломаются | Cloudflare |
| AUD-P0-014 | оба | Добавить custom 404 и проверить redirect matrix | инженер/QA | 404 branded, RU/EN путь назад, корректный HTTP status; нет loop/soft-404 | hosting |
| AUD-P0-015 | оба | Подготовить rollback, backup и incident response | ops | датированный runbook, последний рабочий artifact, ответственный, rehearsal evidence | hosting/CI |
| AUD-P0-016 | оба | Синхронизировать `PROJECT_STATUS`, backlog, open questions и DEC-006 с принятыми решениями | technical writer/product owner | закрытые вопросы удалены; flow без обязательных чувствительных опросников; тесты 9/9; исторические решения помечены как historical | без изменения продукта |
| AUD-P0-017 | оба | Выполнить P0 master-чеклиста с evidence | независимый reviewer | каждый применимый P0 имеет `PASS` + дата + evidence либо обоснованный site-specific `N/A` | все P0 выше |

## 3. P1 — визуал и ключевой UX

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-001 | Wellness | Сократить hero до роли, аудитории, 1–2 outcomes, цены и двух CTA | на 390 px H1, value proposition и основной CTA видны без длинного manifesto-scroll; цена первого шага рядом с CTA |
| AUD-P1-002 | Wellness | Перенести длинный манифест «Мозг — Психика — Тело» ниже первого экрана | hero не превышает согласованную высоту; доказательный и методический текст остаётся доступным |
| AUD-P1-003 | Wellness | Поставить реальный портрет вместо placeholder | адаптивные 1:1/4:3/16:9 варианты, права, alt RU/EN, размеры, no CLS |
| AUD-P1-004 | Wellness | Оставить на главной два главных предложения: первая консультация и 4 недели | визуальная иерархия соответствует продуктовым решениям; остальные форматы находятся ниже/на отдельной странице |
| AUD-P1-005 | Wellness | Унифицировать «первая консультация / установочная встреча» | один термин RU и один EN во всех CTA, карточках, формах и письмах; платный статус не двусмысленен |
| AUD-P1-006 | Wellness | Перестроить booking page в компактный stepper + summary + form | на desktop до первого fold видны цена, четыре шага и CTA/form state; на mobile нет перегрузки; legal детали остаются ниже |
| AUD-P1-007 | Science | Уменьшить hero внутренних страниц на 25–35 % | первый результат/фильтр публикаций виден в первом desktop viewport; mobile CTA не ломается |
| AUD-P1-008 | Science | Расширить главную модульными proof-блоками | присутствуют направления, публикации, проекты, услуги, профили/CV и CTA; нет повторов одной и той же биографии |
| AUD-P1-009 | Science | Заменить универсальные blobs на более содержательный академический visual language | решение работает без ложной инфографики, сохраняет performance и не маскирует отсутствие данных |
| AUD-P1-010 | Science | Локализовать типы публикаций и улучшить карточку | RU/EN labels, DOI/source, venue, year, name variant, copy citation; filter доступен клавиатурой |
| AUD-P1-011 | оба | Добавить mobile affordance горизонтального ряда вкладок | пользователь понимает, что ряд прокручивается; active item виден; 320/390 px проходят без page overflow |
| AUD-P1-012 | оба | Увеличить target size ссылок карточек и footer | минимум 24×24 CSS px по WCAG 2.2; целевые CTA и основные nav ≥44 px |
| AUD-P1-013 | оба | Исправить heading outline footer | нет скачка H1→H4 на коротких страницах; screen reader outline осмыслен |
| AUD-P1-014 | оба | Провести user test вкладок | 5–7 пользователей каждой аудитории; зафиксированы задачи, ошибки навигации и решения |

## 4. P1 — контент, доверие и позиционирование

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-020 | Wellness | Унифицировать формулу опыта | «15+ лет» относится только к точному периоду/области; исчезает конфликт «10+ / 15+» |
| AUD-P1-021 | Wellness | Развести qualification, professional approach и evidence level методов | дипломы не ставятся под сомнение; рекламный текст не объявляет всю комбинацию методов одинаково доказанной; есть первичные/обзорные источники там, где это публично заявляется |
| AUD-P1-022 | Wellness | Подготовить trust block | портрет, ключевые квалификации, B17/register, privacy link и границы услуги расположены рядом с первой конверсией |
| AUD-P1-023 | Wellness | Решить, какие отзывы/кейсы публиковать | только письменный consent, редакционная политика и отсутствие health-identifying деталей |
| AUD-P1-024 | Science | Превратить prose-проекты в `ResearchProject` data | 5 видимых проектов имеют role, period, audience, work/result, source, consent scope и собственный URL либо карточку |
| AUD-P1-025 | Science | Определить границу «избранные» vs «полный список» | summary и UI не обещают полный реестр при шести записях; roadmap полного импорта зафиксирован |
| AUD-P1-026 | Science | Добавить citation export | BibTeX/RIS/plain citation совпадает с записью и проверен для DOI entries |
| AUD-P1-027 | Science | Показать метрики только с base + as-of date | каждая метрика имеет базу, профиль, значение, дату и владельца обновления |
| AUD-P1-028 | оба | Сверить внешние профили | матрица Aqulas/B17/PsyBalkans/TenChat/ORCID/LinkedIn/WoS/Scopus: имя, роль, цены, виды опыта, контакты, URL; изменения внешних площадок — только с разрешения | ✅ Выполнено (TSK-TODO-27, DEC-033, docs/sources/external-profiles-matrix-2026.md) |

## 5. P1 — SEO и structured data

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-030 | оба | Сократить title templates | уникальный смысл в первых 55–65 символах; бренд не дублируется; SERP preview принят |
| AUD-P1-031 | оба | Добавить OG/Twitter image metadata | валидные абсолютные URL, 1:1/4:3/16:9 media, title/alt, social preview проверен |
| AUD-P1-032 | оба | Ввести стабильный `Person @id` | один идентификатор личности на двух сайтах; все WebPage/Article/Service ссылки согласованы |
| AUD-P1-033 | Wellness | Расширить Person/Service entity graph | jobTitle, knowsAbout, sameAs, provider, audience, offers; areaServed только после legal |
| AUD-P1-034 | Science | Нормализовать ScholarlyArticle/Thesis/Project JSON-LD | Person objects с @id, DOI identifier, URL, language, venue, project facts совпадают с visible content |
| AUD-P1-035 | оба | Добавить WebSite/ProfilePage там, где это семантически верно | Google/Schema validators без errors; разметка не обещает unsupported rich result |
| AUD-P1-036 | оба | Убрать placeholder verification values из public | нет `bing-verification-pending`; verification привязан к окончательным доменам и владельцам |
| AUD-P1-037 | оба | Проверить production sitemap/robots/canonical/hreflang | sitemap содержит только canonical public URL; robots не блокирует выбранных crawlers; Search Console test URL проходит |
| AUD-P1-038 | оба | Создать first-party HTML legal/privacy pages | стабильные RU/EN URL, доступность, дата версии, ссылки из формы/footer; внешние PDF могут быть приложениями |
| AUD-P1-039 | оба | Создать internal linking map | каждая важная страница получает контекстные входящие ссылки; orphan pages отсутствуют |

## 6. P1 — AI-search и entity consistency

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-040 | оба | Принять crawler policy | отдельно описаны Googlebot, Bingbot, YandexBot, OAI-SearchBot, GPTBot, ChatGPT-User; search и training decisions не смешаны |
| AUD-P1-041 | оба | Создать identity source block | полное имя, variants, портрет, роли, stable @id, profiles, updated date; RU/EN смысл совпадает |
| AUD-P1-042 | оба | Добавить as-of и provenance для количественных фактов | 40+, 100+, 2000+ и другие цифры имеют дату и страницу-источник/методику | Закрыто (DEC-033: метрики содержат checkedAt/URL, дипломы — часы и даты в @natali/profile; over-engineering исключён) |
| AUD-P1-043 | оба | Добавить author/source/update patterns | на экспертных страницах явно видны автор, дата, первичные профили/источники; JSON-LD совпадает |
| AUD-P1-044 | оба | Проверить agent-readable DOM | важный контент и условия доступны без hover/modal; формы имеют labels/status; нет скрытой agent-only версии |
| AUD-P1-045 | Science | Создать отдельные URL для основных публикаций/проектов | URL имеет цитату, abstract/summary, DOI/source, author entity и related topics |
| AUD-P1-046 | Wellness | Создать first-party ответы на реальные вопросы выбора | короткие точные блоки: кому подходит, первый шаг, цена, онлайн/Белград, границы, отмена; без doorway/keyword stuffing |

## 7. P1 — географическое SEO

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-050 | Wellness | Подтвердить тип очной локации в Белграде | реальная eligible локация или честный сценарий без Business Profile; домашний/виртуальный адрес не публикуется |
| AUD-P1-051 | Wellness | Создать страницу/секцию «Очно в Белграде» | формат, район/доступность при разрешении, языки, часы ответа, CTA, legal boundary; нет thin city page |
| AUD-P1-052 | Wellness | Решить необходимость `sr-Latn` | decision record на основе целевой аудитории и спроса; не создавать пустую локаль ради SEO |
| AUD-P1-053 | Wellness | Добавить local/service schema только после eligibility | видимые NAP/service facts совпадают с schema; Rich Results/Schema validator проходит |
| AUD-P1-054 | Science | Нормализовать географию через affiliation/projects | города и страны появляются только как факты аффилиаций, мероприятий и проектов, не как doorway pages |

## 8. P1 — формы, privacy и безопасность

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-060 | оба | Сделать rate limiter обязательным в production | production gate падает без binding; 429 тестируется |
| AUD-P1-061 | оба | Добавить idempotency/duplicate strategy | повторный submit не создаёт два owner email; UX сообщает состояние |
| AUD-P1-062 | оба | Разделить owner delivery и auto-reply failure | если owner mail доставлен, пользователь не получает ложное «заявка не отправлена»; incident логируется без PII |
| AUD-P1-063 | оба | Ограничить Origin/Host и размер request | чужой origin и oversized/malformed request отклоняются; тесты есть |
| AUD-P1-064 | оба | Формализовать mailbox retention | владелец, срок 1 год, deletion schedule, backup policy и data subject procedure задокументированы |
| AUD-P1-065 | оба | Провести threat model | формы, Turnstile, Resend, Calendar, invoice links, analytics, external legal files и admin access покрыты |

## 9. P1 — accessibility и performance evidence

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P1-070 | оба | Полный keyboard walkthrough | все сценарии без мыши; focus order и sticky header корректны; evidence видео/чек-лист |
| AUD-P1-071 | оба | Screen reader smoke | NVDA + Chrome/Firefox для nav, locale, cards, form errors/status; blockers исправлены |
| AUD-P1-072 | оба | axe/contrast/zoom | нет critical/serious; AA contrast; 200/400 % без потери информации |
| AUD-P1-073 | оба | Responsive matrix | 320, 390, 768, 1024, 1440; long EN strings; landscape; no page overflow |
| AUD-P1-074 | оба | Lighthouse lab + field plan | mobile lab evidence; LCP/INP/CLS budgets; после запуска включён field monitoring |
| AUD-P1-075 | оба | Image performance budget | responsive formats, dimensions, lazy loading ниже fold, портрет preload только при измеренной пользе |

## 10. P2 — операции, аналитика и развитие

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P2-001 | оба | KPI dictionary и event map | event names, purpose, owner, allowed parameters; нет PII/текста формы |
| AUD-P2-002 | оба | Cloudflare Web Analytics verification | cookie-free режим подтверждён; form/contact values отсутствуют в payload |
| AUD-P2-003 | оба | Автоматический link checker | internal/external report в CI; bot-blocked links различаются от broken |
| AUD-P2-004 | оба | Контентный календарь экспертных материалов | темы исходят из реального опыта/исследований; автор, reviewer, update cadence |
| AUD-P2-005 | оба | Search Console/Bing/Yandex setup | ownership на production domains, sitemap submitted, access owner documented |
| AUD-P2-006 | Wellness | Baseline conversion dashboard | enquiry → qualified → paid first meeting → follow-up; без health data |
| AUD-P2-007 | Science | Baseline collaboration dashboard | publication/profile outbound + qualified briefs + proposals + projects |
| AUD-P2-008 | оба | Периодическая сверка внешних профилей | квартальная дата, владелец, список расхождений и разрешённых обновлений |
| AUD-P2-009 | оба | Независимый release rehearsal | Wellness и Science можно выпустить/откатить отдельно без изменения второго сайта |

## 11. P3 — необязательные эксперименты

| ID | Сайт | Задача | Критерий приёмки |
| --- | --- | --- | --- |
| AUD-P3-001 | оба | Рассмотреть `llms.txt` | только после indexable production; источник генерируется из canonical content; есть владелец и измеримая гипотеза; не считается SEO-требованием |
| AUD-P3-002 | Science | Citation/knowledge graph export | JSON/BibTeX/RIS endpoint имеет реального потребителя и не дублирует неподдерживаемые данные |
| AUD-P3-003 | Wellness | Эксперимент с короткими answer blocks | A/B или качественный тест подтверждает пользу людям; нет AI-only текста |

## 12. Рекомендуемая последовательность

1. `AUD-P0-016` — убрать документационный дрейф.
2. `AUD-P0-001`–`005` — инфраструктура, домены и почта.
3. `AUD-P0-006`–`010` — legal, права и обязательные материалы.
4. `AUD-P0-003`, `013`–`015` — security и operations.
5. `AUD-P1-001`–`014` — визуал и ключевой UX.
6. `AUD-P1-020`–`054` — контент, SEO, entity, AI и geo.
7. `AUD-P0-011`–`012` и `AUD-P1-060`–`065` — формы и end-to-end.
8. `AUD-P1-070`–`075` — независимая QA-приёмка.
9. `AUD-P0-017` — закрытие P0 master-чеклиста и отдельный go/no-go каждого сайта.

