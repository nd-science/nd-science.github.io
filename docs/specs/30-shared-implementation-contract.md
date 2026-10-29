# Общий технический контракт Wellness и Science

Дата: 29 октября 2026 года

Статус: обязательные требования для следующего этапа реализации

## 1. Граница документа

Контракт определяет общие данные, интерфейсы, локализацию, интеграции и критерии выпуска двух независимых Astro-приложений:

- `apps/wellness` — частная практика и коммерческие wellness-услуги;
- `apps/science` — научный профиль, публикации, проекты и экспертные услуги.

Сайты имеют отдельные сборки, домены, sitemap, аналитику, формы, релизы и SEO-цели. Общими являются только канонический профессиональный профиль Наталии, дизайн-токены, базовые UI-компоненты, правила локализации и технические стандарты. Общей пользовательской оболочки или переключателя Wellness/Science нет.

## 2. Источники контента

Приоритет источников:

1. [Профессиональная карта](./00-professional-map.md).
2. [Wellness ТЗ](./10-wellness-site-spec.md).
3. [Science ТЗ](./20-science-site-spec.md).
4. [Матрица покрытия анкеты](./40-source-coverage-matrix.md).
5. Заполненная профессиональная анкета и приложенные к ней документы.

Старые briefs, inventories, questionnaires и прототипные тексты используются только как история проекта. При расхождении приоритет имеют документы `docs/specs`.

## 3. Общая навигационная модель

### Верхний уровень

Верхняя панель содержит:

- имя `Наталия Долгова` / `Natalia Dolgova`;
- вкладку `Wellness`;
- вкладку `Science`;
- переключатель `RU / EN`.

Переход между Wellness и Science ведёт на соответствующий самостоятельный URL. Переход RU/EN сохраняет логически эквивалентную страницу; при отсутствии зеркала используется главная нужной локали с уведомлением только для редактора, не для посетителя.

### Второй уровень

Каждое приложение имеет собственный набор вкладок. Все вкладки являются обычными ссылками, доступны с клавиатуры, имеют видимый фокус и `aria-current="page"` для активной страницы.

### URL

- Русский: `/ru/.../`.
- Английский: `/en/.../`.
- Корень `/` перенаправляет на `/ru/` до отдельного решения о locale detection.
- Slug не переводится после публичного запуска без redirect map.
- Каждая страница имеет canonical и взаимные hreflang `ru`, `en`, `x-default`.

## 4. Модель общих данных

Существующий `verificationStatus` заменить состояниями деятельности и публикации. Факты из профессиональной карты не маркируются как сомнительные.

```ts
export type Locale = "ru" | "en";

export type LifecycleStatus =
  | "completed"
  | "current"
  | "in_progress"
  | "planned";

export type PublicationScope =
  | "public"
  | "internal"
  | "consent_required";

export type ServiceAvailability =
  | "available"
  | "pilot"
  | "planned";

export interface LocalizedText {
  ru: string;
  en: string;
}
```

### Credential

```ts
export interface Credential {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  programme?: LocalizedText;
  startDate?: string;
  endDate?: string;
  year: number;
  hours?: number;
  lifecycleStatus: LifecycleStatus;
  publicationScope: PublicationScope;
  publicDocument?: string;
  sites: Array<"wellness" | "science">;
}
```

### ExperienceEntry

```ts
export interface ExperienceEntry {
  id: string;
  organisation: LocalizedText;
  role: LocalizedText;
  startDate: string;
  endDate?: string;
  summary: LocalizedText;
  outcomes?: LocalizedText[];
  publicationScope: PublicationScope;
  sites: Array<"wellness" | "science">;
}
```

### Method

```ts
export interface Method {
  id: string;
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  useCases: LocalizedText[];
  typicalPractice?: LocalizedText;
  adaptation?: LocalizedText;
  limitations?: LocalizedText[];
  credentials: string[];
  relatedServices: string[];
  lifecycleStatus: LifecycleStatus;
  publicationScope: PublicationScope;
}
```

### Service

```ts
export interface Money {
  amount: number;
  currency: "EUR";
  unit?: "session" | "participant" | "programme";
}

export interface Service {
  id: string;
  slug: string;
  site: "wellness" | "science";
  name: LocalizedText;
  audience: LocalizedText;
  task: LocalizedText;
  includes: LocalizedText[];
  duration?: LocalizedText;
  delivery: Array<"online" | "in_person" | "hybrid">;
  price?: Money | Money[];
  priceLabel?: LocalizedText;
  preparation?: LocalizedText[];
  outcome: LocalizedText;
  support?: LocalizedText;
  limitations?: LocalizedText[];
  relatedMethods?: string[];
  serviceAvailability: ServiceAvailability;
  publicationScope: PublicationScope;
  cta: LocalizedText;
}
```

### Publication

```ts
export type PublicationType =
  | "thesis"
  | "journal_article"
  | "book_chapter"
  | "conference_paper"
  | "abstract"
  | "professional_article"
  | "presentation";

export interface Publication {
  id: string;
  slug: string;
  title: string;
  summary: LocalizedText;
  authors: string[];
  nataliaNameVariant: "Dolgova" | "Ovchinnikova";
  year: number;
  type: PublicationType;
  venue: string;
  doi?: string;
  url?: string;
  language: string;
  researchAreas: string[];
  featured: boolean;
  publicationScope: PublicationScope;
}
```

### ResearchProject

```ts
export interface ResearchProject {
  id: string;
  slug: string;
  title: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  audience?: LocalizedText;
  challenge: LocalizedText;
  work: LocalizedText;
  outcomes: LocalizedText[];
  relatedPublications?: string[];
  publicationScope: PublicationScope;
}
```

### ContentPage

```ts
export interface ContentPage {
  id: string;
  site: "wellness" | "science";
  locale: Locale;
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  audience: string[];
  relatedMethods?: string[];
  relatedServices?: string[];
  cta?: {
    label: string;
    href: string;
  };
  publishedAt?: string;
  updatedAt: string;
  publicationScope: PublicationScope;
}
```

## 5. Хранение контента

Для первой версии использовать Astro Content Collections и типизированные данные внутри репозитория. Внешняя CMS не подключается до появления ответственного редактора и регулярного процесса публикации.

Рекомендуемые коллекции:

- общие: `credentials`, `experience`, `profiles`;
- Wellness: `services`, `methods`, `resources`, `faq`, `testimonials`;
- Science: `publications`, `researchProjects`, `educationProjects`, `talks`, `services`;
- системные: `pages`, `legal`, `navigation`.

Каждая запись хранится один раз на сущность и содержит RU/EN-поля. Не создавать две независимые копии факта в разных locale-файлах, если их можно типизировать общей записью.

## 6. Локализация

- Обязательные локали: `ru`, `en`.
- Пользовательские строки не размещаются непосредственно в Astro-компонентах.
- Навигация, формы, ошибки, email-шаблоны, legal UI и metadata имеют RU/EN-версии.
- Значения цен используют `Intl.NumberFormat`; даты — `Intl.DateTimeFormat`.
- Английские титулы: `Dr. phil.`, `Candidate of Economic Sciences`, `practical psychologist`, `neurointegration trainer`.
- Русские и английские страницы должны иметь одинаковый набор блоков, фактов, цен и CTA.
- Проверка паритета сравнивает route id, heading id, CTA, связанные услуги и заполненность обязательных полей.
- Язык формы определяется текущей страницей и сохраняется в заявке.

## 7. Медиа

Типы: портреты, фотографии занятий, сканы дипломов, изображения проектов, видео, аудиопрактики и превью материалов.

Обязательные поля: автор, право использования, дата согласия, alt RU/EN, focal point, source file, derivatives и publication scope.

Правила:

- персональные номера и подписи на дипломах закрываются в публичной копии;
- оригиналы хранятся вне публичного каталога;
- фото третьих лиц публикуются только при `consent_required → public`;
- видео имеет субтитры RU/EN и текстовое описание;
- аудио имеет название, продолжительность, текстовое вступление и предупреждения, если они предусмотрены практикой;
- изображения оптимизируются в AVIF/WebP с responsive `srcset`.

## 8. Формы

### Wellness private enquiry

Поля: имя, email или мессенджер, язык, часовой пояс, предпочитаемый формат, выбранная услуга, краткое описание запроса, согласие с обработкой данных.

Не собирать в первичной форме: диагнозы, подробную историю здоровья, результаты тестов, документы и сведения третьих лиц.

### Wellness organisation enquiry

Поля: организация, роль, контакт, язык, размер группы, задача, желаемый формат, сроки и комментарий.

### Science collaboration enquiry

Поля: имя, организация, роль, email, тип проекта, ожидаемый результат, аудитория, язык, сроки, бюджетный диапазон и комментарий.

### Общие требования

- server-side validation;
- CSRF и rate limiting;
- honeypot или эквивалентная антиспам-защита;
- доступные сообщения об ошибках;
- не отправлять чувствительные данные в URL, аналитику или логи;
- подтверждение отправителю на языке формы;
- отдельные адреса назначения для Wellness и Science;
- retention period и процедура удаления заявок.

## 9. Запись и оплата Wellness

Порядок состояния заявки:

```text
submitted
→ reviewed
→ accepted_for_first_meeting | referred | declined
→ terms_sent
→ payment_pending
→ paid
→ scheduling_enabled
→ scheduled
→ completed | cancelled | rescheduled
```

Календарь не показывается до состояния `paid` либо ручного административного разрешения. Провайдер календаря и оплаты скрыт за адаптером, чтобы его можно было заменить без изменения контента.

Публично показываются EUR-цены. Платёжные и налоговые реквизиты не хранятся в Git.

## 10. Переменные окружения

В `.env.example` документируются только пустые значения:

```text
PUBLIC_SITE_STATUS=
PUBLIC_WELLNESS_SITE_URL=
PUBLIC_SCIENCE_SITE_URL=
PUBLIC_CONTACT_EMAIL_WELLNESS=
PUBLIC_CONTACT_EMAIL_SCIENCE=
PUBLIC_CALENDAR_PROVIDER=
PUBLIC_ANALYTICS_PROVIDER=
FORMS_ENDPOINT_WELLNESS=
FORMS_ENDPOINT_SCIENCE=
PAYMENT_PROVIDER=
PAYMENT_RETURN_URL=
```

Токены, секреты, приватные ключи и реквизиты оплаты не входят в Git и не отображаются в логах.

## 11. SEO GEO и AI-доступность

### Общие требования

- server-rendered HTML для основного контента;
- уникальные title, description и h1;
- canonical, hreflang и x-default;
- sitemap отдельно для каждого сайта;
- robots по окружению;
- Open Graph и social image;
- breadcrumbs;
- стабильные URL и redirect map;
- author, datePublished и dateModified для материалов;
- ссылки на первичные профессиональные профили;
- JSON-LD только из тех же данных, которые видны на странице.

### Crawlers

Политика отдельно определяет доступ `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, Bingbot, Googlebot и YandexBot. Настройки поискового доступа не смешиваются с разрешением на обучение моделей.

Ключевые данные — имя, роли, услуги, цены, публикации и контакты — должны извлекаться из обычного HTML без выполнения пользовательских действий.

## 12. Аналитика и приватность

### Запрещённые данные

Не передавать в аналитику:

- текст запроса клиента;
- ответы PHQ-8, GAD-7 и других опросников;
- диагнозы и состояние здоровья;
- содержание консультаций;
- email, телефон, имя и идентификаторы формы;
- названия конфиденциальных проектов.

### Общие события

`page_view`, `language_switch`, `site_switch`, `navigation_click`, `resource_view`, `outbound_profile_click`, `form_start`, `form_submit_success`, `form_submit_error`.

Site-specific события определяются в соответствующих ТЗ. Названия событий, параметры и consent category фиксируются до подключения аналитики.

## 13. Accessibility

Цель — WCAG 2.2 AA.

- один `h1` на страницу и последовательная иерархия;
- landmarks и skip-link;
- полная клавиатурная навигация;
- видимый `focus-visible`;
- активная вкладка обозначена не только цветом;
- минимальная интерактивная область 44×44 px;
- контраст по WCAG AA;
- альтернативный текст RU/EN;
- корректные label, description и error summary в формах;
- статусы и ошибки объявляются через live regions;
- `prefers-reduced-motion`;
- горизонтальные вкладки доступны обычным скроллом;
- субтитры для видео и текстовая альтернатива для аудио.

## 14. Производительность

Цели для мобильного p75 после запуска:

- LCP ≤ 2,5 s;
- INP ≤ 200 ms;
- CLS ≤ 0,1;
- HTML первого экрана доступен без клиентского JavaScript;
- критические шрифты self-hosted или системные;
- изображения имеют размеры и lazy loading ниже первого экрана;
- JavaScript загружается только для интерактивных функций;
- бюджет initial JS — не более 100 KB gzip на информационных страницах.

## 15. Окружения и публикация

| Окружение | Индексация | Реальные формы | Аналитика | Оплата |
| --- | --- | --- | --- | --- |
| local | noindex | mock | off | mock |
| preview | noindex | test endpoint | test/off | sandbox |
| staging | noindex | staging | staging | sandbox |
| production draft | noindex | production-ready but disabled or limited | consent-aware | disabled until release |
| production public | index | enabled | consent-aware | enabled for Wellness |

`PUBLIC_SITE_STATUS=draft` сохраняется до выполнения release gate. Wellness и Science выпускаются независимо; готовность одного не снимает блокировки второго.

## 16. Тестирование

### Контент

- все route id существуют в RU и EN;
- обязательные поля заполнены;
- цены и факты совпадают с профессиональной картой;
- нет `verificationStatus` и текстов о сомнительности дипломов;
- нет внутренних ссылок и личных реквизитов в публичной сборке;
- cross-site ссылки ведут на соответствующую локаль.

### Функциональность

- формы: success, validation, server error, rate limit, duplicate submit;
- Wellness workflow: accepted, referred, payment failed, paid, rescheduled, cancelled;
- Science enquiry: research, education, speaking и invalid attachment attempts;
- calendar/payment adapters: sandbox и provider unavailable;
- analytics: события не содержат PII.

### UI

- 320, 390, 768, 1024 и 1440 px;
- клавиатура и screen reader smoke test;
- reduced motion;
- длинные английские строки;
- изображения отсутствуют или не загрузились;
- Lighthouse и axe без critical/serious нарушений;
- отсутствие console errors.

### Сборка

```powershell
pnpm check
pnpm build
git diff --check
```

Дополнительно проверить `/ru/`, `/en/`, переключение языка, переключение сайтов, sitemap, robots, canonical и hreflang в обеих сборках.

## 17. Release gate

Приёмка выполняется также по [master-чеклисту проекта](../operations/MASTER_SITE_AUDIT_TODO.md): статус `PASS` требует доказательства и даты, `N/A` — отдельного обоснования для Wellness или Science. Настоящий контракт не заменяет stable-ID проверки master-чеклиста, а задаёт входные требования для них.

Публичный выпуск конкретного сайта возможен, когда:

- все обязательные страницы и RU/EN-тексты приняты;
- формы, адреса назначения и процесс ответа работают;
- юридические страницы подключены;
- реальный домен, TLS и почта настроены;
- privacy и consent проверены;
- у изображений и отзывов есть права публикации;
- SEO, accessibility, performance и security проверки пройдены;
- нет открытого P0 в master-чеклисте;
- выполнена production smoke-проверка и зафиксирован rollback.
