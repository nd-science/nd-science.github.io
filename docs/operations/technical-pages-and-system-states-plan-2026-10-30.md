# План технических страниц и системных состояний

Дата: 30 октября 2026 года.  
Исполнители: technical lead, frontend-разработчик, forms/backend-разработчик, DevOps, SEO, legal reviewer, accessibility reviewer и QA.

## 1. Правило реализации

Сначала утвердить hosting contract. Затем реализовать технические страницы и состояния отдельно для Wellness и Science. Не копировать домены, контакты, legal-тексты и формы между сайтами автоматически.

Все технические страницы должны:

- соответствовать визуальной теме своего сайта;
- иметь RU/EN там, где страницу читает человек;
- сохранять доступную навигацию и ссылку на главную;
- иметь корректный HTTP status;
- не создавать soft-404;
- не попадать в sitemap и индекс, если это служебное состояние;
- не раскрывать stack traces, bindings, email delivery details и секреты.

## 2. Обязательная матрица страниц

| Компонент | Wellness | Science | Индексация | Требование |
| --- | --- | --- | --- | --- |
| Custom 404 | обязательно | обязательно | `noindex`, не в sitemap | бренд, понятное сообщение, главная, основные разделы, поиск/карта при наличии |
| 500 / server error state | обязательно для Functions | обязательно для Functions | `noindex`, не в sitemap | безопасное сообщение, request ID без PII, повторить позже, контакт |
| Form success state | обязательно | обязательно | не индексировать как отдельную ценную страницу | подтверждает только получение, не бронирование и не договор |
| Form validation/error state | обязательно | обязательно | не индексировать | поле, причина, способ исправить, focus management |
| Rate-limit / abuse state | обязательно | обязательно | не индексировать | понятный 429-текст без раскрытия защитной логики |
| Privacy | обязательно RU/EN | обязательно RU/EN | индексировать | first-party HTML, версия и дата |
| Consent | обязательно RU/EN | обязательно RU/EN | индексировать по решению legal | точный scope формы и обработки данных |
| Terms / offer | обязательно | по модели сотрудничества | индексировать | Wellness: условия, оплата, отмена, возврат; Science: условия запроса/сотрудничества |
| Professional boundaries | обязательно | academic ethics обязательно | индексировать | Wellness: не экстренная/медицинская помощь; Science: authorship и no ghostwriting |
| Accessibility statement | рекомендуется | рекомендуется | индексировать | уровень цели, известные ограничения, канал обратной связи |
| HTML sitemap | обязательно | обязательно | индексировать | человекочитаемая карта RU/EN |
| XML sitemap | обязательно | обязательно | machine file | только canonical public URL |
| `robots.txt` | обязательно | обязательно | machine file | policy по окружениям и crawler decisions |
| `security.txt` | рекомендуется | рекомендуется | machine file | `/.well-known/security.txt`, контакт и срок действия |
| Manifest/icons | обязательно | обязательно | machine assets | favicon, touch icon, manifest только если используется |
| OG fallback image | обязательно | обязательно | asset | отдельный визуал сайта с корректными размерами |
| 410 strategy | обязательно как правило | обязательно как правило | не в sitemap | удалённый материал возвращает 410 либо осмысленный redirect |
| Maintenance state | условно | условно | `noindex` | только если hosting допускает управляемый maintenance mode |
| Offline page | не требуется без PWA | не требуется без PWA | — | не создавать без service worker/PWA-сценария |
| Cookie policy | условно | условно | индексировать | нужна только при cookies или non-essential tracking |
| `llms.txt` | P3, необязательно | P3, необязательно | machine file | только после canonical production; не SEO-gate |

## 3. Custom 404

### 3.1. Техническая реализация

1. Создать один app-controlled 404 template для каждого сайта.
2. Для static hosting генерировать корневой `404.html` либо эквивалент, который реально возвращается платформой.
3. Не делать `/ru/404/` и `/en/404/` обычными страницами со статусом `200`.
4. Определять язык по URL-префиксу или безопасному fallback-правилу.
5. Возвращать HTTP `404`, а не redirect на главную.
6. Не ставить canonical на главную.
7. Добавить `noindex, follow` или более строгую согласованную robots policy.
8. Исключить 404 из XML sitemap.

### 3.2. Содержание Wellness 404

- «Страница не найдена».
- Короткое объяснение без технических деталей.
- Ссылки: главная, форматы и цены, запись/контакты.
- При необходимости ссылка на HTML sitemap.
- Не показывать форму заявки прямо на 404.

### 3.3. Содержание Science 404

- «Страница не найдена».
- Ссылки: главная, публикации, исследования, контакты.
- При необходимости ссылка на HTML sitemap.
- Не подменять отсутствующую публикацию общей страницей со статусом `200`.

### 3.4. Проверка

- случайный несуществующий URL RU;
- случайный несуществующий URL EN;
- отсутствующий PDF;
- URL с неверным регистром;
- удалённый route;
- status в network/CLI;
- keyboard, screen reader, contrast и mobile.

## 4. Ошибки Functions и формы

Не создавать отдельную публичную `/500/` как индексируемую страницу. Реализовать общий error template и состояния компонента формы.

Обязательные состояния:

1. idle;
2. submitting;
3. validation error;
4. Turnstile unavailable/failed;
5. rate limited (`429`);
6. network unavailable;
7. owner delivery failed;
8. owner delivery succeeded, auto-reply failed;
9. duplicate submission;
10. success.

Для каждого состояния определить:

- видимый заголовок;
- текст RU/EN;
- focus target;
- `aria-live` policy;
- допустимое повторное действие;
- что записывается в лог;
- какой HTTP status возвращается;
- передаётся ли incident ID.

Success Wellness сообщает: заявка получена, suitability и бронирование ещё не подтверждены.  
Success Science сообщает: запрос получен, ответ ожидается до трёх рабочих дней, сотрудничество ещё не подтверждено.

## 5. Privacy, consent и legal

### Wellness

Создать first-party HTML:

- privacy policy;
- consent на обработку формы;
- informed consent / границы услуги;
- договор-оферту или условия оказания услуг;
- cancellation/refund policy;
- crisis and emergency notice;
- payment route notice без раскрытия лишних финансовых данных.

Внешние PDF могут быть приложениями, но не единственным способом прочитать основные условия.

### Science

Создать first-party HTML:

- privacy policy;
- consent на обработку брифа;
- confidentiality notice;
- academic ethics and authorship policy;
- условия экспертного сотрудничества;
- права на присланные материалы и запрет отправлять конфиденциальные документы через короткую форму.

## 6. HTML sitemap и XML sitemap

### HTML sitemap

1. Создать отдельный человекочитаемый route RU и EN.
2. Сгруппировать страницы по смыслу, а не выводить плоский список URL.
3. Добавить ссылку из footer.
4. Не называть прямую ссылку на `sitemap.xml` «Карта сайта» без уточнения, что это XML для поисковых систем.
5. Не включать preview, success/error states, 404, query URLs и draft pages.

### XML sitemap

- абсолютные production URL;
- только canonical public pages;
- правильные локали;
- никаких 404, redirects, noindex и служебных состояний;
- дата обновления только при реальном изменении;
- независимый файл каждого сайта.

## 7. Robots и crawler policy

Для каждого окружения зафиксировать:

- preview/staging: Access + `noindex`; robots не является защитой доступа;
- production до GO: `noindex` и запрет индексации;
- public production: разрешение поисковых crawler по принятой policy;
- отдельные решения для Googlebot, Bingbot, YandexBot, OAI-SearchBot, GPTBot и ChatGPT-User.

Не блокировать CSS, изображения и другие ресурсы, необходимые для рендеринга публичных страниц.

## 8. Redirects, 410 и изменение URL

1. Вести versioned redirect map.
2. Использовать 301 только при настоящем постоянном переносе.
3. Не перенаправлять все отсутствующие URL на главную.
4. Для удалённой публикации без замены использовать 410 либо 404 по принятой политике.
5. Проверять redirect loops, chains и потерю locale.
6. Обновлять internal links и sitemap одновременно с переносом.

## 9. Технические метаданные и assets

Для каждого сайта подготовить:

- favicon SVG/PNG/ICO;
- Apple touch icon;
- theme color;
- web manifest только при реальной необходимости;
- default OG image;
- page-specific OG images для ключевых страниц;
- корректные `lang`, `dir`, title и description;
- `color-scheme` только если тема действительно поддерживается;
- печатные стили для CV, публикаций и legal pages при необходимости.

## 10. Не создавать без продукта

Не добавлять только ради полноты:

- страницу входа и личный кабинет;
- checkout;
- newsletter unsubscribe;
- поиск без достаточного объёма контента;
- PWA/offline;
- cookie banner при отсутствии cookies;
- пустые category/tag archives;
- `llms.txt` как замену HTML и schema;
- status page без operational owner.

## 11. Приёмка

Исполнитель обязан приложить матрицу:

| URL/состояние | Ожидаемый status | Robots | Sitemap | RU/EN | Keyboard | Screen reader | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Минимальные проверки:

- неизвестный URL возвращает custom 404;
- exception Functions не раскрывает детали;
- form states доступны;
- privacy/legal открываются без внешнего диска;
- HTML sitemap существует отдельно от XML;
- XML sitemap не содержит служебных URL;
- preview не индексируется;
- public production не наследует draft robots policy;
- `git diff --check`, `pnpm check`, `pnpm build` и соответствующий release-check проходят.

