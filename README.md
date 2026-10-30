# Сайты Наталии

Канонический монорепозиторий двух независимых сайтов Наталии Долговой:

- `apps/wellness` — практика, индивидуальное сопровождение и материалы;
- `apps/science` — научный профиль, публикации и авторские услуги.

Оба сайта находятся в статусе черновика, используют маршруты `/ru/` и `/en/` и по умолчанию закрыты от индексации. Draft опубликован на GitHub Pages; аналитика, оплата и реальные внешние интеграции не подключены.

## Рабочие адреса

- Science: [https://nd-science.github.io](https://nd-science.github.io)
  - RU: [https://nd-science.github.io/ru/](https://nd-science.github.io/ru/)
  - EN: [https://nd-science.github.io/en/](https://nd-science.github.io/en/)
- Wellness: [https://wellnessnd.github.io](https://wellnessnd.github.io)
  - RU: [https://wellnessnd.github.io/ru/](https://wellnessnd.github.io/ru/)
  - EN: [https://wellnessnd.github.io/en/](https://wellnessnd.github.io/en/)

Это действующие GitHub Pages draft-адреса. Сайты сохраняют `noindex`; отдельные production-домены, формы, оплата и остальные внешние интеграции требуют самостоятельного release-решения.

Актуальная точка входа для команды и агентов: [текущий статус, решения, открытые вопросы и слепые зоны](docs/PROJECT_STATUS.md).

## Быстрый старт

Требуются Node.js 24+ и pnpm 11+.

```powershell
pnpm install
pnpm dev:wellness
pnpm dev:science
```

Общие проверки:

```powershell
pnpm check
pnpm build
```

## Локальный дизайн-прототип

Концепция двух отдельных сайтов с внутренней навигацией в виде вкладок описана в [дизайн-документе](docs/design/workspace-navigation-concept.md). Независимые buildless-прототипы находятся в `docs/design/prototypes/workspace-tabs/wellness` и `docs/design/prototypes/workspace-tabs/science` и не меняют production-маршруты Astro.

```powershell
cd docs/design/prototypes/workspace-tabs
npx --yes http-server . -p 4177 -c-1
```

После запуска открыть Wellness по адресу `http://127.0.0.1:4177/wellness/ru/` или Science по адресу `http://127.0.0.1:4177/science/ru/`. Корневой экран — только технический launcher.

## Структура

Каноническая основа следующего этапа разработки находится в `docs/specs/`:

- `00-professional-map.md` — общая профессиональная карта;
- `10-wellness-site-spec.md` — окончательное ТЗ Wellness;
- `20-science-site-spec.md` — окончательное ТЗ Science;
- `30-shared-implementation-contract.md` — общий технический контракт;
- `40-source-coverage-matrix.md` — контроль полноты переноса анкеты.

```text
apps/          два независимо собираемых Astro-сайта
packages/      общие UI, профиль и SEO-функции
assets/        каталог исходных и утверждённых материалов
docs/          требования, источники, решения и инструкции
KompasIMG/     существующие legacy-материалы; путь не менять
```

Начать работу следует с [текущего статуса](docs/PROJECT_STATUS.md), затем открыть [реестр источников](docs/sources/README.md) и вопросы соответствующего сайта. Подробности запуска и выпуска находятся в [операционной инструкции](docs/operations/development.md).

## Ограничения

- Не публиковать неподтверждённые квалификации, научные метрики, отзывы и медицинские обещания.
- Не утверждать, что консультации юридически разрешены во всех странах, пока это не проверено.
- Не добавлять секреты и персональные платёжные данные в Git.
- `KompasIMG` не перемещать: два Python-скрипта используют абсолютный путь.

