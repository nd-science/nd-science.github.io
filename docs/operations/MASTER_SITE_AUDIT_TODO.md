# Master TODO: всесторонняя проверка сайтов Наталии

Канонический постоянный чек-лист для `wellness` и `science`. Этот файл хранит состав и состояние проверок. Результаты конкретного прогона оформляются отдельным датированным отчётом и не заменяют этот TODO.

## Правила ведения

- Статусы: `TODO`, `IN PROGRESS`, `BLOCKED`, `PASS`, `FAIL`, `N/A`.
- Приоритеты: `P0` — блокирует выпуск или создаёт существенный риск; `P1` — обязательно до публичного запуска; `P2` — важно после появления проверенного прототипа; `P3` — развитие и оптимизация.
- В колонках Wellness и Science хранится только один допустимый статус.
- `PASS` требует ссылки на доказательство и даты проверки. Без доказательства пункт остаётся `TODO` или `BLOCKED`.
- `N/A` требует объяснения в колонке «Зависимость / блокер».
- Ответственный указывается как роль до назначения конкретного человека.
- Факты из заполненной анкеты и профессиональной карты принимаются как канонические. Публичный текст должен точно им соответствовать; отдельная проверка требуется только для изменяемых внешних данных, прав публикации и юридических выводов.
- Юридический, медицинский и академический вывод подтверждается профильным специалистом; техническая команда лишь фиксирует запрос и полученное заключение.
- Политики поисковиков, AI-crawler'ов и внешних платформ перепроверяются по первичным источникам при каждом полном аудите.

## 1. Продукт и рынок

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PRD-001 | Определить цель сайта и главную конверсию | P0 | TODO | TODO | Product | Утверждённая цель и одно измеримое целевое действие | — | Решение Наталии |
| PRD-002 | Описать сегменты, запросы, контекст выбора и альтернативы | P0 | TODO | TODO | Product research | Карта сегментов и альтернатив | — | Интервью и исходные данные |
| PRD-003 | Проверить соответствие сайта реальным Jobs и критериям выбора | P1 | TODO | TODO | Product research | Jobs-карта с подтверждёнными критериями | — | PRD-002, интервью |
| PRD-004 | Зафиксировать отличия Наталии без вымышленных преимуществ | P0 | TODO | TODO | Product + Content | Проверяемая таблица дифференциации | — | Подтверждённый профиль |
| PRD-005 | Проверить спрос, размер сегмента и коммерческую целесообразность | P1 | TODO | TODO | Product + Finance | Исследование спроса и модель экономики | — | Сегменты, формат и цена |
| PRD-006 | Провести интервью с потенциальными и прошлыми клиентами | P1 | TODO | TODO | Product research | Протоколы, согласия и синтез интервью | — | Доступ к респондентам |
| PRD-007 | Проверить рисковые гипотезы до вложений в продвижение | P1 | TODO | TODO | Product | Реестр гипотез и результаты дешёвых тестов | — | PRD-002–006 |
| PRD-008 | Развести два сайта так, чтобы они усиливали позиционирование друг друга | P1 | TODO | TODO | Product + Brand | Карта ролей сайтов и правила перекрёстных ссылок | — | Утверждённое позиционирование |

## 2. Маркетинг и бренд

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MKT-001 | Проверить понятность позиционирования за 5–10 секунд | P1 | TODO | TODO | Marketing + UX research | Результаты пятисекундного теста | — | Репрезентативные респонденты |
| MKT-002 | Проверить ценность, аудиторию, проблему и результат | P0 | TODO | TODO | Marketing | Утверждённая message map | — | PRD-002–004 |
| MKT-003 | Оценить название, слоган, tone of voice и визуальную индивидуальность | P1 | TODO | TODO | Brand | Brand brief и результаты проверки | — | Публичные названия не утверждены |
| MKT-004 | Проверить язык против ожиданий RU- и EN-аудитории | P1 | TODO | TODO | Content + Localization | Редакторское заключение для RU/EN | — | Финальные тексты |
| MKT-005 | Проверить эмоциональную привлекательность без манипуляций | P1 | TODO | TODO | Marketing + Ethics | Экспертный разбор и пользовательские реакции | — | MKT-001, финальный дизайн |
| MKT-006 | Сформировать карту возражений и ответы | P1 | TODO | TODO | Marketing + Sales | Карта возражений с источниками | — | Интервью и заявки |
| MKT-007 | Проверить конкурентов и смысловую дифференциацию | P1 | TODO | TODO | Market research | Датированный конкурентный обзор | — | Целевые рынки и сегменты |
| MKT-008 | Проверить единообразие сообщений сайта, соцсетей, писем и календаря | P2 | TODO | TODO | Marketing operations | Cross-channel content audit | — | Каналы ещё не определены |
| MKT-009 | Утвердить правила использования имени, фото и экспертного статуса | P0 | TODO | TODO | Brand + Legal | Brand usage guide и подтверждение прав | — | Фото, имя и права |

## 3. Продажи и конверсия

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SAL-001 | Определить целевое действие для каждого типа посетителя | P0 | TODO | TODO | Sales + Product | Матрица сегмент → действие | — | PRD-001–003 |
| SAL-002 | Проверить CTA на первом экране и после ключевых разделов | P1 | TODO | TODO | UX + Conversion | Запись walkthrough и first-click test | — | SAL-001 |
| SAL-003 | Исключить тупиковые сценарии и неработающие контакты | P0 | TODO | TODO | QA + Sales ops | Пройденные end-to-end сценарии | — | Публичные контакты отсутствуют |
| SAL-004 | Спроектировать запись, квалификацию запроса и предварительный отбор | P0 | TODO | TODO | Sales ops + Legal | Схема процесса и утверждённые вопросы | — | Правила работы и приватность |
| SAL-005 | Проверить условия платной первой встречи и последующего предложения | P0 | TODO | N/A | Sales + Legal | Условия, цена и сценарий на странице соответствуют каноническому ТЗ | — | Wellness: открыты правила отмены, переноса и возврата; Science: не применяется |
| SAL-006 | Определить показ формата, цены, ограничений и ожиданий | P1 | TODO | TODO | Sales + Content | Решение по прозрачности предложения | — | Формат и цены не утверждены |
| SAL-007 | Подготовить подтверждение заявки, напоминания и follow-up | P1 | TODO | TODO | Sales ops | Шаблоны и тест доставки | — | Канал записи и CRM |
| SAL-008 | Спроектировать минимальный CRM без лишних чувствительных данных | P1 | TODO | TODO | Sales ops + Privacy | Data-flow diagram и перечень полей | — | Политика данных |
| SAL-009 | Проверить отказ, отмену, перенос и кризисные запросы | P0 | TODO | TODO | Operations + Legal | Сценарии и утверждённые ответы | — | Для Wellness нужен кризисный протокол |
| SAL-010 | Измерять этапы воронки без передачи персональных данных | P1 | TODO | TODO | Analytics + Privacy | Схема событий и privacy review | — | Аналитика не подключена |

## 4. Контент, доверие и доказательства

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CNT-001 | Проверить каждое фактическое утверждение по каноническому источнику | P0 | TODO | TODO | Content governance | Матрица покрытия и diff публичного текста с `docs/specs` | — | Анкета и профессиональная карта приняты как фактическая основа |
| CNT-002 | Проверить единообразие биографии, квалификаций, ролей и дат | P0 | TODO | TODO | Content owner | Согласованные RU/EN-поля из профессиональной карты | — | `docs/specs/00-professional-map.md` |
| CNT-003 | Проверить DOI, ORCID, аффилиации и научные метрики | P0 | N/A | TODO | Science editor | Ссылки, даты проверки и сверка авторства | — | Science: профили и библиография; Wellness: не применяется, научные метрики не входят в его содержание |
| CNT-004 | Разделить научные, конференционные, популярные и коммерческие тексты | P1 | N/A | TODO | Science editor | Типизированная подтверждённая библиография | — | Science: CNT-003; Wellness: не применяется, научная библиография не входит в его содержание |
| CNT-005 | Проверить права на фото, отзывы, кейсы и примеры работ | P0 | TODO | TODO | Legal + Content | Согласия, лицензии и реестр прав | — | Материалы не получены |
| CNT-006 | Исключить медицинские обещания и недоказуемые гарантии | P0 | TODO | TODO | Legal + Subject expert | Построчный review утверждений | — | Финальные тексты |
| CNT-007 | Указывать даты проверки изменяемых данных | P1 | TODO | TODO | Content governance | Поля дат в контенте и UI | — | Типы данных и редакционный процесс |
| CNT-008 | Добавить авторство, редакционную политику и порядок обновления | P1 | TODO | TODO | Content governance | Опубликованная политика и owner matrix | — | Роли не назначены |
| CNT-009 | Проверить английскую версию носителем или профессиональным редактором | P1 | TODO | TODO | EN editor | Отчёт редактора и принятые правки | — | Финальные EN-тексты |
| CNT-010 | Исключить заглушки, служебные формулировки и шаблонные значения | P0 | TODO | TODO | QA + Content | Автоматический поиск и ручной content audit | — | Финальный content freeze |

## 5. Пользователь и юзабилити

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UX-001 | Проверить сценарии нового, сомневающегося и готового обратиться посетителя | P1 | TODO | TODO | UX research | Journey map и записи тестов | — | Сегменты и респонденты |
| UX-002 | Провести пятисекундный, first-click и task-based тесты | P1 | TODO | TODO | UX research | Протокол, выборка и результаты | — | Тестируемый прототип |
| UX-003 | Проверить информационную архитектуру и порядок блоков | P1 | TODO | TODO | UX + Content | Tree/content walkthrough | — | Финальный состав контента |
| UX-004 | Проверить сканируемость, длину текста и термины | P1 | TODO | TODO | UX writing | Readability и comprehension review | — | Финальные тексты |
| UX-005 | Провести тесты на mobile, tablet и desktop | P1 | TODO | TODO | QA | Матрица viewport'ов и скриншоты | — | Стабильная сборка |
| UX-006 | Проверить длинные тексты, пустые состояния и ошибки | P1 | TODO | TODO | QA + UX | Каталог состояний и browser evidence | — | Страницы и формы ещё не полны |
| UX-007 | Проверить RU/EN и сохранение контекста при переключении | P1 | TODO | TODO | Localization QA | Матрица маршрутов и видео сценария | — | Полный набор локализованных страниц |
| UX-008 | Провести наблюдаемое тестирование представителей сегментов | P1 | TODO | TODO | UX research | Согласия, записи и синтез | — | Рекрутинг респондентов |
| UX-009 | Проверить чувство безопасности, доверия и профессиональности | P1 | TODO | TODO | UX research | Качественные оценки и цитаты респондентов | — | Репрезентативная выборка |
| UX-010 | Ранжировать проблемы по частоте, влиянию и уверенности | P1 | TODO | TODO | UX lead | Приоритизированный issue register | — | UX-001–009 |

## 6. Доступность

Целевой уровень — WCAG 2.2 AA. Автоматический балл не является доказательством полной доступности.

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A11Y-001 | Проверить клавиатуру, focus order, skip-link и ловушки | P0 | TODO | TODO | Accessibility QA | Запись полного keyboard walkthrough | — | Стабильный интерфейс |
| A11Y-002 | Проверить основную навигацию и контент через NVDA | P1 | TODO | TODO | Accessibility QA | Протокол NVDA с найденными проблемами | — | NVDA и финальный контент |
| A11Y-003 | Проверить 200%/400% zoom, reflow и resize text | P1 | TODO | TODO | Accessibility QA | Скриншоты и viewport matrix | — | Стабильные стили |
| A11Y-004 | Проверить контраст текста, UI и focus indicator | P0 | TODO | TODO | Design + Accessibility | Расчёты contrast ratio | — | Финальные темы |
| A11Y-005 | Проверить landmarks, заголовки, accessible names и lang | P0 | TODO | TODO | Accessibility QA | Accessibility tree и ручной review | — | Финальная разметка |
| A11Y-006 | Проверить alt-тексты и декоративные изображения | P1 | TODO | TODO | Content + Accessibility | Реестр изображений и alt-решений | — | Изображения не утверждены |
| A11Y-007 | Проверить размеры целей и расстояния между ними | P1 | TODO | TODO | Accessibility QA | Измерения интерактивных элементов | — | Финальная навигация и формы |
| A11Y-008 | Проверить reduced motion и Windows High Contrast | P1 | TODO | TODO | Accessibility QA | Скриншоты и записи сценариев | — | Финальная анимация |
| A11Y-009 | Выполнить Lighthouse и axe | P1 | TODO | TODO | QA automation | Сохранённые отчёты обеих систем | — | Совместимый браузер и driver |
| A11Y-010 | Повторять ручной аудит после значимых изменений | P1 | TODO | TODO | Accessibility owner | Запись в release checklist | — | Процесс релизов |

## 7. Визуальная привлекательность

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VIS-001 | Проверить визуальную иерархию, ритм, сетку и плотность | P1 | TODO | TODO | Visual design | Дизайн-review с аннотированными экранами | — | Финальный content length |
| VIS-002 | Оценить первый экран и баланс текста с визуальными материалами | P1 | TODO | TODO | Brand + UX | Desktop/mobile review и тест внимания | — | Фото и позиционирование |
| VIS-003 | Проверить две темы как одну личность с разными характерами | P1 | TODO | TODO | Brand design | Сравнительная дизайн-матрица | — | Утверждённый бренд |
| VIS-004 | Проверить у Wellness ощущение поддержки и безопасности | P1 | TODO | N/A | Brand + UX research | Результаты perception test | — | Wellness: респонденты; Science: не применяется, его характер проверяется в VIS-005 |
| VIS-005 | Проверить у Science точность и академическую строгость | P1 | N/A | TODO | Brand + UX research | Результаты perception test | — | Science: респонденты; Wellness: не применяется, его характер проверяется в VIS-004 |
| VIS-006 | Проверить типографику кириллицы и латиницы | P1 | TODO | TODO | Visual design | Glyph/layout review RU/EN | — | Финальные шрифты |
| VIS-007 | Проверить качество, оригинальность и права на изображения | P0 | TODO | TODO | Art direction + Legal | Asset register и подтверждение прав | — | Изображения не утверждены |
| VIS-008 | Исключить шаблонность и визуальные клише | P2 | TODO | TODO | Art direction | Экспертный и пользовательский review | — | Конкурентный обзор |
| VIS-009 | Проверить hover, focus, active, loading, disabled и error | P1 | TODO | TODO | Design QA | State inventory и снимки | — | Интерактивные элементы и формы |
| VIS-010 | Утвердить критерии приёмки mobile и desktop | P1 | TODO | TODO | Design lead | Visual acceptance checklist | — | VIS-001–009 |

## 8. Инженерия и качество кода

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ENG-001 | Проверить архитектуру монорепозитория и независимость сборок | P1 | TODO | TODO | Engineering | ADR review и отдельные успешные build | — | — |
| ENG-002 | Проверить типы коллекций и валидацию данных | P1 | TODO | TODO | Engineering | Type/check tests для валидных и невалидных данных | — | Контентные схемы |
| ENG-003 | Проверить дублирование между приложениями и пакетами | P2 | TODO | TODO | Engineering | Code review и dependency map | — | — |
| ENG-004 | Проверить зависимости, лицензии, обновления и уязвимости | P0 | TODO | TODO | Engineering + Security | Audit report и license inventory | — | Актуальный lockfile |
| ENG-005 | Добавить CI для install, check, lint, build, links и a11y smoke | P1 | TODO | TODO | DevOps | Успешный CI run | — | Репозиторий и CI-провайдер не выбраны |
| ENG-006 | Добавить unit-, integration- и browser-тесты критических сценариев | P1 | TODO | TODO | QA automation | Покрытие сценариев и test reports | — | Стабильные требования |
| ENG-007 | Проверить воспроизводимую сборку и зафиксированные версии | P1 | TODO | TODO | Engineering | Clean install/build на чистом окружении | — | CI или disposable environment |
| ENG-008 | Проверить env-переменные и отсутствие клиентских секретов | P0 | TODO | TODO | Security + Engineering | Secret scan и bundle inspection | — | Все интеграции |
| ENG-009 | Проверить 404, редиректы, языковые маршруты и повреждённый контент | P0 | TODO | TODO | QA automation | HTTP/link report | — | Полная карта URL |
| ENG-010 | Проверить HTML/CSS/JS в поддерживаемых браузерах и устройствах | P1 | TODO | TODO | Cross-browser QA | Browser/device matrix | — | Определить support policy |
| ENG-011 | Выполнять diff-check, build и Git status перед выпуском | P1 | TODO | TODO | Release owner | Сохранённый release log | — | Release process |

## 9. Производительность и надёжность

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PERF-001 | Установить бюджеты HTML, CSS, JS, изображений и шрифтов | P1 | TODO | TODO | Performance owner | Утверждённые budgets и CI thresholds | — | Финальный дизайн |
| PERF-002 | Проверять LCP, INP, CLS и Lighthouse Performance | P1 | TODO | TODO | Performance QA | Lab reports и после запуска field data | — | Публичный deployment для field data |
| PERF-003 | Оптимизировать изображения, размеры, форматы, lazy load и preload | P1 | TODO | TODO | Frontend | Asset report и network trace | — | Финальные изображения |
| PERF-004 | Проверить блокирующие ресурсы и лишний клиентский JS | P1 | TODO | TODO | Frontend | Bundle/network analysis | — | Финальная сборка |
| PERF-005 | Проверить caching, compression, CDN и HTTP-заголовки | P1 | TODO | TODO | DevOps | Header report и повторные network requests | — | Хостинг не выбран |
| PERF-006 | Проверить медленный интернет и слабое устройство | P1 | TODO | TODO | Performance QA | Throttled trace и task completion | — | Стабильный deployment |
| PERF-007 | Проверить деградацию календаря и аналитики | P1 | TODO | TODO | Resilience QA | Failure injection и fallback evidence | — | Интеграции не подключены |
| PERF-008 | Настроить uptime, broken links и контроль TLS | P1 | TODO | TODO | Operations | Monitor configuration и test alert | — | Домены и hosting |
| PERF-009 | Подготовить backup, rollback и восстановление | P0 | TODO | TODO | Operations | Runbook и успешная учебная процедура | — | Hosting/release platform |
| PERF-010 | Проверить 404/410/301/302 и redirect loops | P0 | TODO | TODO | QA + SEO | Status/redirect crawl report | — | Полная карта URL |

## 10. Безопасность, приватность и юридическая готовность

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | Провести threat modelling форм, календаря, аналитики и оплаты | P0 | TODO | TODO | Security | Threat model и список мер | — | Архитектура интеграций |
| SEC-002 | Проверить CSP, HSTS, Referrer-Policy и Permissions-Policy | P0 | TODO | TODO | Security + DevOps | Header scan и browser verification | — | Hosting configuration |
| SEC-003 | Исключить утечки email, токенов, путей и персональных данных | P0 | TODO | TODO | Security | Secret/PII scan и bundle review | — | Финальная сборка |
| SEC-004 | Добавить защиту форм от спама и злоупотреблений | P0 | TODO | TODO | Security + Backend | Abuse test и rate-limit evidence | — | Формы ещё не реализованы |
| SEC-005 | Определить данные, срок хранения, основание и удаление | P0 | TODO | TODO | Privacy + Legal | Data inventory и retention policy | — | SAL-008, интеграции |
| SEC-006 | Подготовить privacy, terms, cookies и consent | P0 | TODO | TODO | Legal + Privacy | Утверждённые и опубликованные документы | — | Юридическая модель и аналитика |
| SEC-007 | Проверить требования Сербии и целевых стран | P0 | TODO | TODO | Qualified legal counsel | Письменное юридическое заключение | — | Целевые рынки |
| SEC-008 | Определить границы и кризисный протокол Wellness | P0 | TODO | N/A | Subject expert + Legal | Утверждённый протокол и публичные границы | — | Wellness: квалификация Наталии; Science: не применяется, это не сайт практики |
| SEC-009 | Зафиксировать академическую этику и правила авторства Science | P0 | N/A | TODO | Academic ethics + Legal | Опубликованная политика услуг | — | Science: форматы услуг; Wellness: не применяется, научные авторские услуги не входят в его предложение |
| SEC-010 | Проверить права на бренд, домены, тексты, фото и публикации | P0 | TODO | TODO | Legal | IP register и подтверждения прав | — | Материалы и домены |
| SEC-011 | Не активировать оплату до проверки налоговой и юридической модели | P0 | TODO | TODO | Legal + Finance | Письменный go/no-go | — | Налоговая и юридическая экспертиза |

## 11. SEO и поисковые системы

Первичные ориентиры: [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical?hl=en), [Google structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEO-001 | Проверить HTTP 200, индексируемый контент и crawler access перед снятием noindex | P0 | TODO | TODO | Technical SEO | URL Inspection и crawl report | — | Публичные домены и проверенный контент |
| SEO-002 | Проверить title, description, H1, canonical, hreflang и x-default | P0 | TODO | TODO | Technical SEO | DOM crawl RU/EN | — | Реальные домены |
| SEO-003 | Проверить sitemap: только canonical URL и корректный lastmod | P1 | TODO | TODO | Technical SEO | Валидированный sitemap | — | Полная карта URL |
| SEO-004 | Проверить robots, noindex/noarchive и разделение окружений | P0 | TODO | TODO | Technical SEO + DevOps | Матрица directives по окружениям | — | Preview/staging/production |
| SEO-005 | Проверить внутренние ссылки, breadcrumbs и orphan pages | P1 | TODO | TODO | SEO + IA | Crawl graph и broken-link report | — | Многостраничная структура |
| SEO-006 | Проверить Person, Service, Article и ScholarlyArticle | P1 | TODO | TODO | Structured data owner | Schema Validator/Rich Results evidence | — | Видимый проверенный контент |
| SEO-007 | Проверить совпадение structured data с видимым содержанием | P0 | TODO | TODO | SEO + Content verification | Построчная сверка JSON-LD и страницы | — | SEO-006, CNT-001 |
| SEO-008 | Проверить Open Graph, social preview, favicon и изображения | P1 | TODO | TODO | SEO + Design | Preview captures на целевых платформах | — | Финальные домены и изображения |
| SEO-009 | Подключить Search Console, Bing и при необходимости Яндекс | P1 | TODO | TODO | SEO operations | Подтверждённые properties и owners | — | Домены и доступы |
| SEO-010 | Проверить индексирование и международную выдачу RU/EN | P1 | TODO | TODO | International SEO | Coverage reports и выборка SERP | — | После публичного запуска |
| SEO-011 | Настроить IndexNow после появления изменяемого контента | P2 | TODO | TODO | SEO + Engineering | Успешные submissions и logs | — | Публичный домен и стратегия обновлений |
| SEO-012 | Контролировать 404, дубликаты, crawl waste и стабильность URL | P1 | TODO | TODO | Technical SEO | Регулярный crawl report | — | Публичный сайт |
| SEO-013 | Проверить запросы, интенты и брендовые/небрендовые страницы | P1 | TODO | TODO | SEO strategy | Keyword-intent map с источниками | — | PRD-002, search data |
| SEO-014 | Создать people-first контент-план по вопросам аудитории | P1 | TODO | TODO | SEO + Content | Тематическая карта с источниками спроса | — | Интервью и SEO-013 |
| SEO-015 | Проверить пригодность для Bing/Copilot grounding и цитирования | P1 | TODO | TODO | SEO + AI discoverability | Bing crawl/index evidence | — | Публичный индексируемый сайт |

## 12. AI-агенты и машинная читаемость

OpenAI документирует разные назначения `OAI-SearchBot`, `GPTBot` и `ChatGPT-User`; настройки для них принимаются независимо: [официальная документация OpenAI](https://developers.openai.com/api/docs/bots).

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AI-001 | Определить политику AI search, обучения моделей и user-triggered agents | P1 | TODO | TODO | Product + Legal | Утверждённая crawler policy | — | Публичная стратегия данных |
| AI-002 | Проверить правила OAI-SearchBot, GPTBot и ChatGPT-User | P1 | TODO | TODO | AI discoverability | Актуальная матрица robots/access | — | AI-001, публичный домен |
| AI-003 | Проверить актуальные правила Bing/Copilot и других значимых систем | P1 | TODO | TODO | AI discoverability | Датированный source review | — | Выбранные платформы |
| AI-004 | Обеспечить ключевые факты в server-rendered HTML с ясной структурой | P1 | TODO | TODO | Engineering + Content | Raw HTML extraction test | — | Подтверждённый контент |
| AI-005 | Добавить источники, даты, авторство и устойчивые URL | P1 | TODO | TODO | Content governance | Проверка provenance полей | — | Многостраничный контент |
| AI-006 | Проверить извлечение имени, роли, услуг, контакта и публикаций | P1 | TODO | TODO | AI QA | Набор extraction evals | — | Финальный HTML/JSON-LD |
| AI-007 | Провести agent-сценарии понимания, проверки, языка и контакта | P1 | TODO | TODO | Agent QA | Записи воспроизводимых прогонов | — | Публичный или локально доступный сайт |
| AI-008 | Проверить, что агент не принимает служебный текст за факты | P0 | TODO | TODO | Agent QA + Content | Adversarial eval results | — | Draft и production content states |
| AI-009 | Проверить логи crawler'ов и блокировки CDN/WAF | P1 | TODO | TODO | Operations + Security | Access logs и WAF rules review | — | Hosting и публичный трафик |
| AI-010 | Оценить llms.txt только как необязательный эксперимент | P3 | TODO | TODO | AI discoverability | Decision record и измеримый эксперимент | — | Не является заменой SEO/robots |
| AI-011 | Проверить отсутствие скрытого контента только для агентов | P0 | TODO | TODO | Security + SEO | DOM/raw response comparison | — | Финальная сборка |

## 13. Продвижение и дистрибуция

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PROMO-001 | Составить отдельную карту каналов | P1 | TODO | TODO | Growth marketing | Channel map с гипотезами и ограничениями | — | Сегменты и позиционирование |
| PROMO-002 | Оценить search, social, партнёрства, рекомендации и выступления | P1 | TODO | TODO | Growth marketing | Scored channel assessment | — | PROMO-001 |
| PROMO-003 | Подготовить контент-план с аудиторией, задачей, каналом и CTA | P1 | TODO | TODO | Content marketing | Редакционный календарь | — | MKT-002, SEO-014 |
| PROMO-004 | Согласовать личный бренд и внешние профили | P1 | TODO | TODO | Brand | Profile consistency audit | — | MKT-009 |
| PROMO-005 | Проверить ссылки с ORCID, издателей и профессиональных профилей | P1 | N/A | TODO | Science marketing + SEO | Backlink/profile register | — | Science: проверенные профили; Wellness: не применяется, научные профили относятся к Science |
| PROMO-006 | Подготовить referral-механику без нарушения конфиденциальности | P2 | TODO | TODO | Growth + Privacy | Process map и privacy review | — | Политика данных |
| PROMO-007 | Определить правила email-подписки и отписки | P2 | TODO | TODO | Lifecycle marketing + Legal | Consent flow и шаблоны | — | Решение о рассылке |
| PROMO-008 | Утвердить UTM-разметку и названия кампаний | P1 | TODO | TODO | Analytics + Marketing ops | Tracking convention | — | Каналы и аналитика |
| PROMO-009 | Не запускать рекламу до проверки позиции и конверсии | P0 | TODO | TODO | Marketing owner | Go/no-go по PRD/MKT/SAL | — | PRD, MKT и SAL без P0 FAIL |
| PROMO-010 | Оценивать качество обращений, а не только трафик | P1 | TODO | TODO | Growth + Sales | Dashboard с qualified outcomes | — | CRM и analytics |

## 14. Аналитика и эксперименты

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ANA-001 | Определить KPI до подключения инструментов | P0 | TODO | TODO | Product analytics | KPI dictionary с владельцами | — | Цели сайтов |
| ANA-002 | Определить Wellness KPI: заявки, запись, явка, fit, сопровождение | P1 | TODO | N/A | Product + Sales | Утверждённая metric tree | — | Wellness: воронка практики; Science: не применяется, его KPI определяются в ANA-003 |
| ANA-003 | Определить Science KPI: запрос, услуга, источник, согласование | P1 | N/A | TODO | Product + Sales | Утверждённая metric tree | — | Science: воронка услуг; Wellness: не применяется, его KPI определяются в ANA-002 |
| ANA-004 | Сформировать event map без чувствительных данных | P0 | TODO | TODO | Analytics + Privacy | Event specification и privacy review | — | KPI и data inventory |
| ANA-005 | Настроить consent-aware privacy-friendly аналитику | P1 | TODO | TODO | Analytics + Privacy | Реальный consent test и network trace | — | SEC-005–006 |
| ANA-006 | Проверить атрибуцию календаря, email и внешних каналов | P1 | TODO | TODO | Analytics | End-to-end attribution tests | — | Интеграции и UTM |
| ANA-007 | Создать baseline до экспериментов | P1 | TODO | TODO | Product analytics | Датированный baseline report | — | Достаточный трафик |
| ANA-008 | Для A/B-теста задавать гипотезу, метрику, срок и stop rule | P2 | TODO | TODO | Experimentation owner | Experiment template и preregistration | — | Baseline и достаточная выборка |
| ANA-009 | Не делать выводы по малой выборке без неопределённости | P1 | TODO | TODO | Analytics owner | Review статистических выводов | — | Аналитические отчёты |
| ANA-010 | Совмещать количественные данные с качественными исследованиями | P1 | TODO | TODO | Product research | Сводный insight report | — | UX research и analytics |

## 15. Эксплуатация и выпуск

| ID | Проверка | Приоритет | Wellness | Science | Ответственный | Требуемое доказательство | Проверено | Зависимость / блокер |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OPS-001 | Определить отдельные домены, окружения и владельцев доступов | P0 | TODO | TODO | Operations | Access/domain register без секретов | — | Домены не выбраны |
| OPS-002 | Подготовить DNS, TLS, SPF, DKIM и DMARC | P0 | TODO | TODO | Operations | DNS/TLS/mail validation reports | — | Домены и почтовый провайдер |
| OPS-003 | Зафиксировать release checklist и go/no-go | P0 | TODO | TODO | Release owner | Утверждённый checklist и sign-off | — | Master TODO и владельцы |
| OPS-004 | Разделить preview, staging и production; draft не индексировать | P0 | TODO | TODO | DevOps | Environment matrix и crawler tests | — | Hosting platform |
| OPS-005 | Настроить uptime, ошибки, ссылки и Core Web Vitals | P1 | TODO | TODO | Operations | Dashboards и test alerts | — | Production deployment |
| OPS-006 | Назначить обновление контента и перепроверку фактов | P1 | TODO | TODO | Content governance | RACI и review calendar | — | Роли и редакционная политика |
| OPS-007 | Подготовить incident response и rollback | P0 | TODO | TODO | Operations + Security | Runbook и rehearsal evidence | — | Hosting/release design |
| OPS-008 | Проверить переносимость на выбранный хостинг | P1 | TODO | TODO | Engineering + DevOps | Clean deployment test | — | Хостинг не выбран |
| OPS-009 | Отложить OpenAI Sites до устойчивого веб-прототипа | P2 | TODO | TODO | Product + Engineering | Decision gate и отдельный adaptation backlog | — | Проверенный обычный веб-прототип |
| OPS-010 | Ввести ежемесячную лёгкую и ежеквартальную полную проверку | P2 | TODO | TODO | Operations | Календарь, владелец и шаблон отчёта | — | После запуска |

## Система оценок

Для каждого раздела рассчитываются две оценки по каждому сайту:

- **Current** — качество реально существующего и работающего состояния.
- **Potential** — пригодность текущего каркаса после заполнения подтверждёнными материалами. Не считается обещанием будущего результата.

### Шкала пункта

| Балл | Требование |
| ---: | --- |
| 0 | Отсутствует или блокирует выпуск |
| 1 | Заглушка или критически слабое решение |
| 2 | Частичная реализация с серьёзными пробелами |
| 3 | Приемлемый прототип |
| 4 | Готово к запуску с небольшими замечаниями |
| 5 | Сильное проверенное решение |

Каждая оценка содержит ссылку на доказательство, уверенность `HIGH` / `MEDIUM` / `LOW` и условие повторной проверки.

### Веса итоговой оценки

| Область | Вес |
| --- | ---: |
| Продукт и рынок | 10 |
| Маркетинг и бренд | 10 |
| Продажи и конверсия | 10 |
| Контент, доверие и юридические ограничения | 10 |
| UX и доступность | 15 |
| Визуальная привлекательность | 8 |
| Инженерия и качество | 10 |
| Производительность, безопасность и надёжность | 8 |
| SEO и поисковые системы | 8 |
| AI-агенты и машинная читаемость | 4 |
| Продвижение | 4 |
| Аналитика и эксплуатация | 3 |
| **Всего** | **100** |

### Scorecard

| Сайт | Current / 100 | Potential / 100 | Уверенность | Дата | Отчёт |
| --- | ---: | ---: | --- | --- | --- |
| Wellness | — | — | — | — | — |
| Science | — | — | — | — | — |

## Порядок выполнения

1. **Инвентаризация:** требования, страницы, контент, интеграции, ограничения и источники.
2. **P0-аудит:** безопасность, достоверность, юридические и профессиональные границы.
3. **Продукт, маркетинг и продажи:** аудитория, ценность, доверие и воронка.
4. **Пользовательский аудит:** UX, accessibility, mobile, RU/EN и реальные тесты.
5. **Инженерный аудит:** код, сборка, тесты, безопасность, производительность и отказоустойчивость.
6. **Discoverability:** SEO, поисковые системы, structured data и AI-агенты.
7. **Продвижение и аналитика:** каналы, контент, события и KPI.
8. **Итог:** Current/Potential scorecard для каждого сайта и приоритетный backlog.
9. **Повторная проверка:** после исправлений и непосредственно перед публикацией.

## Шаблон датированного отчёта

Каждый аудит создаёт отдельный файл `docs/operations/audits/YYYY-MM-DD-site-audit.md` и содержит:

- область, окружение, версии и дату проверки;
- итоговые Current/Potential;
- подтверждённые сильные стороны;
- проблемы со ссылками на доказательства;
- рекомендации `P0–P3` и оценку усилий `S/M/L`;
- зависимости, владельцев и блокировки;
- критерии приёмки и список повторных тестов;
- итоговое решение `GO`, `CONDITIONAL GO` или `NO-GO`.

## Release gate

- `NO-GO`: есть хотя бы один `P0 FAIL`, `P0 BLOCKED` без принятого риска или публичный контент расходится с каноническими ТЗ.
- `CONDITIONAL GO`: все P0 закрыты, но остаются документированные P1 с владельцем, сроком и принятым риском.
- `GO`: все P0 и обязательные P1 имеют `PASS`; юридические, медицинские и академические заключения получены там, где применимо; production-проверка пройдена.
