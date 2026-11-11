# Редактура и SEO-аудит сайтов Наталии

**Дата проверки:** 11 ноября 2026 года  
**Режим:** только аудит; в сайты и исходный контент изменения не вносились.  
**Сайты:** [natalicompass.com](https://natalicompass.com) (Wellness) и [tvet.si](https://tvet.si) (Science).

## Объём и методика

Проверены опубликованные URL из актуальных XML-карт сайтов и исходные контентные файлы:

| Сайт | Языки | Проверено опубликованных URL | Контентных маршрутов | Результат покрытия |
| --- | --- | ---: | ---: | --- |
| `natalicompass.com` | RU, EN | 35 | 13 × 2 | Все URL из `sitemap-0.xml` |
| `tvet.si` | RU, EN, 中文, DE, FR, ES | 85 | 11 × 6 | Все URL из `sitemap-0.xml` |
| **Всего** | 8 языковых версий | **120** | **92** | Полное покрытие доступных публичных страниц |

Для каждого URL проверены доступность, `lang`, Title, meta description, canonical, `hreflang` и количество H1. У 118 индексируемых контентных URL один H1; Title и meta description не дублируются. Два корневых URL (`/`) являются техническими клиентскими языковыми редиректами и намеренно имеют `noindex` — это выделено ниже как SEO-проблема из-за их присутствия в sitemap.

Текстовая вычитка выполнена по опубликенному тексту и контентным моделям для всех языковых версий. Ниже перечислены только случаи, где есть конкретная правка; корректный текст не дублируется в таблицах. Проверка не заменяет юридическое, медицинское или заверенное носителями языка редактирование для публичных утверждений о квалификациях, результатах практики и локальном рынке.

## Сводка приоритетов

| Приоритет | Количество | Что сделать |
| --- | ---: | --- |
| Высокий | 3 | Исключить `noindex` URL из sitemap; унифицировать `hreflang`; убрать гарантированные/медицински чувствительные обещания результата из двух карточек Wellness. |
| Средний | 7 | Сократить слишком длинные сниппеты; исправить неестественные английские формулировки и непоследовательность варианта английского; вычитать отдельные DE/ES формулировки. |
| Низкий | 2 | Доработать короткие descriptions служебных и узких страниц. |

## Wellness — natalicompass.com

| Сайт | Язык | Страница | Элемент | Как сейчас | Как лучше | Причина | Влияние на SEO | Приоритет |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `natalicompass.com` | EN | `/en/practices/psychology/` | Meta description | `Nataliia Dolgova’s psychological consultation with a clear structure and an agreed request.` | `Structured psychological counselling with Nataliia Dolgova: clarify your focus, agree practical next steps, online or in person in Belgrade.` | `agreed request` — калька и неестественное английское словосочетание; `consultation` конкурирует с используемым на странице `counselling`. | Делает сниппет понятнее, добавляет естественный запрос *psychological counselling* и географический модификатор без переспама. | Средний |
| `natalicompass.com` | EN | `/en/practices/play-and-story/` | Meta description | `Image-based and narrative methods in Nataliia Dolgova’s psychological consultation.` | `Image-based and narrative methods in Nataliia Dolgova’s psychological counselling.` | Нужна единая терминология с H1 и страницей психологии; `psychological consultation` здесь звучит как дословный перевод. | Консистентный topical signal для *psychological counselling*; смысл и ключевой термин сохранены. | Средний |
| `natalicompass.com` | EN | `/en/practices/breathing/` | Meta description | `Individual selection and gradual learning of breathing practices with contraindications considered.` | `Individual selection and gradual learning of breathing practices, with due regard for contraindications.` | Оборот `with contraindications considered` грамматически возможен, но неестественен для профессионального английского. | Нейтрально; точнее передаёт осторожный, не-медицинский характер услуги. | Низкий |
| `natalicompass.com` | RU, EN | Карточка «Пакет из пяти встреч» на `/ru/for-individuals/`, `/en/for-individuals/` и связанных страницах | Результат | RU: `Устойчивое снижение тревожности, освоенные навыки саморегуляции и закрепление поддерживающих привычек.`<br>EN: `Sustainable reduction of anxiety, mastered self-regulation tools and reinforced habits.` | RU: `Работа над навыками саморегуляции и поддерживающими привычками в рамках согласованного запроса.`<br>EN: `Work on self-regulation skills and supportive habits within an agreed focus.` | Текущая фраза обещает измеримый психологический результат всем клиентам. Это нельзя обосновать на странице и она не согласована с формулировкой «услуги не являются медицинской помощью». | Снижает риск недоверия и YMYL-претензий; сохраняет релевантность запросам про саморегуляцию и тревогу без обещания результата. | Высокий |
| `natalicompass.com` | RU, EN | Карточка «Четырёхнедельное сопровождение» на `/ru/for-individuals/`, `/en/for-individuals/` и связанных страницах | Результат | RU: `Комплексное восстановление ресурсов, выход из хронического стресса и персональная система самоподдержки.`<br>EN: `Comprehensive resource recovery, relief from chronic stress and a personal resilience system.` | RU: `Индивидуально составленный план саморегуляции и бережной работы со стрессом.`<br>EN: `An individually developed plan for self-regulation and managing stress.` | «Выход из хронического стресса» / `relief from chronic stress` — результативное и потенциально медицински чувствительное обещание. | Улучшает качество и доверие к странице; не ослабляет запросы *stress management* / «работа со стрессом». | Высокий |
| `natalicompass.com` | EN | `/en/` | Meta description | `Practical psychology, neurointegration, breathwork and health qigong: evidence-informed support for stress, burnout, and resilience. Online and in person in Belgrade.` | `Psychological counselling, neurointegration, breathwork and health qigong for stress and self-regulation — online and in person in Belgrade.` | Текущий description 166 символов и с высокой вероятностью будет обрезан; `evidence-informed support` менее конкретно для пользователя, чем основная услуга. | Повышает вероятность полного отображения сниппета и сохраняет основные поисковые сущности. | Средний |
| `natalicompass.com` | RU, EN | `/ru/for-individuals/`, `/en/for-individuals/` | Title | RU: `Индивидуальные консультации и программы саморегуляции | Nataliia Dolgova | Wellness`<br>EN: `Individual consultations and self-regulation programmes | Nataliia Dolgova | Wellness` | RU: `Консультации и программы саморегуляции — Наталия Долгова`<br>EN: `Self-regulation counselling & programmes — Nataliia Dolgova` | 83/85 символов до обрезки; брендовый хвост повторяется и вытесняет предмет страницы. | Более читаемый SERP-title; ключевая тема остаётся в начале. | Средний |
| `natalicompass.com` | RU, EN | `/ru/`, `/en/` и все локализованные страницы | `hreflang` в HTML и XML sitemap | В HTML: `ru`, `en`; в sitemap: `ru-RU`, `en`. | Использовать один набор во всех местах: `ru-RU` и `en` (или осознанно generic-коды в обоих представлениях). | Оба формата допустимы, но расхождение усложняет отладку и создаёт лишний сигнал неопределённости поисковику. | Техническая консистентность международного SEO; без изменения текста и URL. | Высокий |
| `natalicompass.com` | Все | `/` | Sitemap / robots | Корневой URL есть в `sitemap-0.xml`, но отдаёт `noindex` и JavaScript/`noscript`-переход на язык браузера. | Убрать `https://natalicompass.com/` из XML sitemap; оставить его доступным только как language selector/redirect. | Sitemap должен содержать канонические индексируемые URL, а не `noindex` технический URL. | Исключает конфликт sitemap ↔ robots и освобождает crawl budget; `/ru/` и `/en/` остаются в карте. | Высокий |
| `natalicompass.com` | RU, EN | `/ru/sitemap/`, `/en/sitemap/` | Meta description | RU: `Карта страниц Wellness-сайта Наталии Долговой.`<br>EN: `A structured map of the Wellness site pages.` | RU: `Карта страниц сайта Наталии Долговой: консультации, практики саморегуляции, контакты и документы.`<br>EN: `Wellness site map: counselling, self-regulation practices, contact options and legal documents.` | 59/66 символов; текст формально корректен, но слишком общий. | Улучшает сниппет, хотя для sitemap-страниц эффект низкий. | Низкий |

## Science — tvet.si

| Сайт | Язык | Страница | Элемент | Как сейчас | Как лучше | Причина | Влияние на SEO | Приоритет |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `tvet.si` | EN | `/en/contact/` | Абзац + единообразие английского | `Please include your name, organisation, reply email and a brief description of your inquiry or comment.` | `Please include your name, organisation, reply email and a brief description of your enquiry or project.` | На сайте выбран британский вариант (`organisation`, `programme`, `enquiries`), но здесь остался американский `inquiry`; `comment` не описывает деловой запрос. | Косвенно улучшает качество текста и согласованность варианта английского; ключевые слова не меняются. | Средний |
| `tvet.si` | DE | `/de/about/` | H1 | `Akademische Biografie und Forschungstrajektorie` | `Akademische Biografie und Forschungslaufbahn` | `Forschungstrajektorie` понятно, но калькирует академический английский и звучит тяжеловесно для страницы-профиля. | Естественнее для немецкого пользователя; сохраняет семантику «биография + исследовательский путь». | Средний |
| `tvet.si` | DE | `/de/about/` | Позиция / текст | `Taccle AI Botschafterin (Ambassador)` | `Taccle-AI-Botschafterin` | Смешение немецкого и английского в скобках не нужно; дефис соответствует немецкой орфографии сложных наименований. | Нейтрально; улучшает профессиональную естественность текста. | Низкий |
| `tvet.si` | ES | `/es/about/` | Позиция / текст | `Premio de becas de conferencia ECER` | `Becaria de la ECER Conference Bursary`<br>*(или нейтральнее: `Beneficiaria de una beca de la ECER Conference Bursary`)* | `Premio de becas` означает «премия стипендий» и не передаёт статус получателя гранта/стипендии. Выбрать вариант после подтверждения официального испанского названия награды. | Устраняет неестественный перевод; факт и бренд награды сохраняются. | Средний |
| `tvet.si` | FR | `/fr/` | Title | `Nataliia Dolgova — Chercheuse en formation professionnelle et éducation des adultes` | `Nataliia Dolgova — recherche en formation professionnelle et éducation des adultes` | 83 символа до добавления бренда/ограничения SERP; вариант в правой колонке короче и сохраняет поисковую тему. | Меньше риск усечения сниппета, ключевые слова остаются в начале. | Средний |
| `tvet.si` | DE | `/de/`, `/de/conferences/`, `/de/education/`, `/de/expert-services/`, `/de/for-organizations/` | Title | Примеры: `Nataliia Dolgova — Forscherin in Berufsbildung und Erwachsenenbildung`; `Konzeption von Bildungsprogrammen und Erwachsenenbildung | Nataliia Dolgova | Science` | Сократить название страницы до 50–60 символов **до** брендового суффикса, например: `Berufsbildung & Erwachsenenbildung — Nataliia Dolgova`; `Bildungsprogramme und Erwachsenenbildung — Nataliia Dolgova`. | Пять немецких Title имеют 69–85 символов; аналогичная проблема есть у части FR/ES Title. Нужна пакетная редактура по шаблону, но не механическое удаление ключевых слов. | Повышает читабельность SERP-title и снижает вероятность обрезки. | Средний |
| `tvet.si` | ZH | Все 11 страниц `/zh/…` | Meta descriptions | Примеры: `/zh/about/` — 36 символов; `/zh/contact/` — 36; `/zh/research/` — 43. | Довести каждый description до информативных 50–80 китайских иероглифов (не ориентироваться на латинский лимит 70 символов), сохранив имя, тему страницы и тип задачи. | Короткий китайский description не всегда ошибка: CJK-символы несут больше смысла. Однако текущие строки часто не дают контекста страницы в сниппете. | Увеличивает полноту сниппета для китайской выдачи; не добавлять ключевые слова списком. | Низкий |
| `tvet.si` | RU, EN, 中文, DE, FR, ES | Все локализованные страницы | `hreflang` в HTML и XML sitemap | HTML использует `ru`, `en`, `zh`, `de`, `fr`, `es`; XML sitemap — `ru-RU`, `en`, `zh-Hans`, `de-DE`, `fr-FR`, `es-ES`. | Согласовать набор, например: `ru-RU`, `en`, `zh-Hans`, `de-DE`, `fr-FR`, `es-ES`, включая ссылки в HTML и sitemap. | Структура переключателя языков корректна и пары URL присутствуют, но коды в двух источниках различаются. | Убирает неоднозначность в международном SEO и облегчает диагностику в Search Console. | Высокий |
| `tvet.si` | Все | `/` | Sitemap / robots | Корневой URL присутствует в `sitemap-0.xml`, но является `noindex` JavaScript/`noscript` языковым редиректом. | Убрать `https://tvet.si/` из XML sitemap; сохранить в sitemap шесть канонических языковых главных (`/ru/`, `/en/`, `/zh/`, `/de/`, `/fr/`, `/es/`). | То же системное противоречие, что на Wellness. | Исключает сигнал о неканонической noindex-странице из карты сайта. | Высокий |

## Что уже сделано хорошо

- На всех опубликованных контентных URL есть ровно один H1; дублей Title и meta description не обнаружено.
- Заголовки и основные тексты в RU/EN, а также доступные DE/FR/ES/ZH версии в целом сохраняют смысл и структуру исходных страниц. Рекомендаций «ради правки» нет.
- Ключевые темы отражены естественно: для Wellness — психологическое консультирование, саморегуляция, стресс, дыхательные практики и цигун; для Science — vocational education / TVET, adult learning, research, publications и education programme design.
- У страниц есть canonical и двусторонние языковые ссылки; проблема относится к согласованию формата кодов, а не к отсутствию локальных URL.
- Единственное совпадение description — точное англоязычное название диссертации на EN и DE страницах. Это академическое первичное название работы, его не следует «уникализировать» искусственно.

## Порядок внедрения после согласования

1. Исправить sitemap и `hreflang` как одну техническую задачу, затем проверить HTML, XML sitemap и Search Console.
2. Заменить два outcome-обещания Wellness одновременно в RU и EN и проверить, что новые формулировки не меняют границу «не медицинская помощь».
3. Внести редакторские EN/DE/ES правки и согласовать немецко-, франко-, испано- и китайскоязычные Title/description с носителем языка перед публикацией.
4. После внедрения повторно снять XML sitemap, проверить canonical/hreflang и длину Title/description в финальном HTML.

## Ограничения проверки

- Аудит относится к публично доступным страницам на 11 ноября 2026 года. Не проверялись данные в поисковой консоли (позиции, запросы, показы, CTR) и не подбиралось семантическое ядро по странам: для этого нужны доступ к Search Console и отдельное исследование рынков.
- В рабочем дереве были незакоммиченные изменения в формах и Science contact-файлах. Они не трактовались как опубликованный контент и не изменялись.
- Рекомендации по правовым, медицинским и результативным формулировкам — редакторские и SEO-ориентированные, не юридическое заключение.
