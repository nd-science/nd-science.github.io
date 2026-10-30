# План QA, приёмки и независимого выпуска

Дата: 30 октября 2026 года.  
Исполнители: QA lead, accessibility reviewer, security reviewer, SEO reviewer, DevOps, product owner и Наталия.

## 1. Правило допуска

QA не исправляет требования задним числом и не ставит `PASS` без evidence. Wellness и Science принимаются и выпускаются независимо.

До начала release-candidate проверки должны существовать:

- утверждённый hosting ADR;
- production-like preview;
- реальные домены или полностью эквивалентные staging URL;
- финальные RU/EN тексты;
- legal approval соответствующего сайта;
- финальные media/PDF с правами;
- рабочие email и forms bindings;
- закрытые применимые P0 реализации.

## 2. Этап Q0 — подготовка тестового контура

Ответственные: QA lead и DevOps.

1. Зафиксировать commit кандидата.
2. Зафиксировать URL и окружение.
3. Проверить отсутствие production secrets в логах и artifacts.
4. Подготовить тестовые адреса и тестовые данные без реальных чувствительных сведений.
5. Проверить, что preview закрыт Access и `noindex`.
6. Создать отдельный evidence-каталог с датой, commit и названием сайта.

## 3. Этап Q1 — автоматические проверки

Выполнить из чистого checkout:

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm check
pnpm build
pnpm release:check:wellness
pnpm release:check:science
git diff --check
```

Release-check запускать только для сайта-кандидата; второй сайт может оставаться draft.

Дополнительно проверить:

- все ожидаемые RU/EN routes;
- отсутствие draft/placeholder значений;
- canonical и hreflang;
- sitemap и robots;
- JSON-LD schemas;
- internal broken links;
- custom 404 и redirect matrix;
- dependency audit;
- отсутствие секретов и лишних build artifacts.

Полную матрицу custom 404, Functions errors, form states, privacy/legal, HTML/XML sitemap, robots, redirects и machine files проверять по [плану технических страниц](technical-pages-and-system-states-plan-2026-10-30.md).

Каждое предупреждение классифицировать как blocker, accepted risk или исправляемое после выпуска. Не игнорировать warnings без записи.

## 4. Этап Q2 — контентная приёмка

Ответственные: редактор, Наталия и независимый reviewer.

### Оба сайта

- имя, варианты имени, даты, степени и квалификации совпадают;
- RU/EN имеют одинаковый смысл;
- видимый контент совпадает с JSON-LD;
- ссылки на внешние профили ведут на Наталию;
- цифры имеют дату и источник;
- PDF не раскрывают лишние персональные данные;
- нет вымышленных отзывов, клиентов, публикаций и метрик.

### Wellness

- цены и форматы совпадают на всех страницах и в форме;
- первый шаг везде назван одинаково;
- границы услуги и кризисный текст согласованы;
- онлайн/Белград и правила отмены не противоречат друг другу.

### Science

- DOI, авторы, названия, годы и издания проверены;
- варианты имени корректно связаны;
- CV совпадает с HTML-биографией;
- права на публикации, проекты и логотипы зафиксированы.

## 5. Этап Q3 — визуальная и responsive приёмка

Проверить страницы обоих сайтов на:

- 320×568;
- 390×844;
- 768×1024;
- 1024×768;
- 1440×900;
- long RU/EN strings;
- zoom 200% и 400%;
- portrait и landscape.

Обязательные сценарии:

- header и вкладки;
- переключение RU/EN;
- активная вкладка и горизонтальный scroll;
- hero и основной CTA;
- карточки и длинные заголовки;
- footer;
- forms success/error states;
- 404;
- PDF/download links.

Критерии:

- отсутствует page-level horizontal overflow;
- активная вкладка видна;
- текст не перекрывается;
- CTA не уходит за viewport;
- изображения не вызывают заметный CLS;
- первый содержательный результат не скрыт чрезмерным hero.

## 6. Этап Q4 — accessibility

Ответственные: accessibility reviewer и QA.

1. Полный keyboard walkthrough без мыши.
2. Проверка focus order, focus visibility и skip-link.
3. NVDA smoke в Chrome и Firefox:
   - landmarks;
   - nav;
   - locale switch;
   - cards;
   - form labels;
   - errors;
   - live status;
   - PDF/link purpose.
4. Axe проверка всех шаблонов страниц.
5. Contrast проверка текста, вкладок, CTA и focus states.
6. Target size:
   - минимум WCAG 2.2 — 24×24 CSS px;
   - основные nav и CTA — целевые 44 px.
7. Проверка `prefers-reduced-motion`.

Не закрывать accessibility по одной главной странице; проверить все типы шаблонов.

## 7. Этап Q5 — формы, privacy и abuse

Для Wellness и Science отдельно проверить:

- обязательные и необязательные поля;
- RU/EN validation messages;
- consent и 18+ там, где применимо;
- honeypot;
- Turnstile success/fail/timeout;
- 429 rate limit;
- oversized и malformed request;
- invalid Origin/Host;
- duplicate submit;
- owner email success;
- Resend owner failure;
- auto-reply failure после owner success;
- отсутствие подтверждённой брони в автоответе;
- отсутствие конфиденциальных данных в автоответе;
- логи и analytics без PII;
- retention и deletion procedure.

Использовать только синтетические тестовые данные.

## 8. Этап Q6 — SEO, GEO и AI-search

Ответственные: SEO reviewer и QA.

Для каждого production-like домена:

- один canonical на страницу;
- взаимные hreflang RU/EN;
- корректный sitemap;
- robots соответствует crawler policy;
- нет `noindex` на public candidate после разрешённого release change;
- нет indexable staging/preview;
- title и description уникальны;
- OG/Twitter preview отображается;
- `Person @id` стабилен на двух сайтах;
- Service/Offer и ScholarlyArticle/Thesis/ResearchProject совпадают с HTML;
- важный контент доступен без JavaScript-only interaction;
- Google/Bing/Yandex verification привязан к правильному владельцу;
- локальные факты Wellness совпадают с видимым NAP и schema.

Не включать локальную schema и Business Profile без подтверждённой eligibility.

## 9. Этап Q7 — performance

Ответственные: performance reviewer и frontend-разработчик.

- Lighthouse mobile и desktop на репрезентативных шаблонах.
- LCP, CLS и INP budget.
- Размер HTML, CSS, JS, изображений и шрифтов.
- Responsive images и явные dimensions.
- Lazy loading ниже первого экрана.
- Проверка third-party ресурсов и их отказа.
- Field monitoring plan после запуска.

Performance-исправления не должны ухудшать читаемость, accessibility и полноту server-rendered HTML.

## 10. Этап Q8 — операционные сценарии

### Wellness

Проверить вручную:

`заявка → suitability → счёт → подтверждение оплаты → приватная ссылка Calendar → перенос/возврат`.

Выполнить российский и международный сценарии без реального раскрытия финансовых или клиентских данных в evidence.

### Science

Проверить вручную:

`бриф → owner delivery → автоответ → квалификация → ответ до трёх рабочих дней → предложение`.

### Оба сайта

- rollback rehearsal;
- custom 404;
- email recovery;
- domain/DNS owner recovery;
- incident contact;
- backup последнего рабочего artifact.

## 11. Go/no-go

QA lead готовит отдельный лист для Wellness и Science:

| Поле | Требование |
| --- | --- |
| Commit | точный SHA |
| Environment | production candidate URL |
| P0 | все применимые `DONE` |
| P1 blockers | отсутствуют либо явно приняты |
| Legal | письменное approval |
| Security | approval/risk acceptance |
| Accessibility | approval с evidence |
| Content | Наталия утвердила RU/EN |
| Rollback | проверен |
| Product owner | подписал GO |

Любое отсутствующее обязательное поле означает `NO-GO`.

## 12. Выпуск

Ответственные: DevOps и product owner.

1. Зафиксировать последний production artifact и rollback target.
2. Выпустить только выбранный сайт.
3. Проверить DNS, TLS, canonical, robots, sitemap, 404, форму и analytics.
4. Отправить sitemap в выбранные webmaster systems.
5. Не переносить `noindex` с preview; менять только production policy.
6. Зафиксировать время выпуска, commit и ответственных.

## 13. После выпуска

В течение первых 24 часов:

- проверить доступность ключевых URL;
- проверить доставку форм без чтения содержимого заявок в логах;
- проверить 404/5xx;
- проверить robots и canonical;
- проверить отсутствие PII в analytics;
- выполнить rollback при критическом дефекте.

Через 7 дней:

- проверить индексацию;
- проверить webmaster warnings;
- проверить Core Web Vitals/field data при наличии;
- проверить конверсионные события без PII;
- создать список post-release задач без изменения уже принятого go/no-go evidence.

## 14. Закрытие работ

1. Обновить [реестр задач аудита](site-readiness-action-register-2026-10-29.md).
2. Обновить [master-чеклист](MASTER_SITE_AUDIT_TODO.md).
3. Для каждого `PASS` указать дату и evidence.
4. Для каждого `N/A` указать причину отдельно для Wellness и Science.
5. Сохранить release report в `docs/operations/`.
6. Не объявлять второй сайт готовым автоматически после выпуска первого.

