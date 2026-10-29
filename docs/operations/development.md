# Локальная разработка

## Установка

```powershell
Set-Location -LiteralPath 'D:\Projects\Natali'
pnpm install
```

## Запуск

```powershell
pnpm dev:wellness
pnpm dev:science
```

Команды запускаются по отдельности и используют разные свободные порты Astro.

## Переменные

Скопировать `.env.example` внутри нужного приложения в `.env` и заполнить только публичные значения. Секреты в переменных `PUBLIC_*` запрещены: они попадают в клиентскую сборку.

## Проверки

```powershell
pnpm check
pnpm build
git diff --check
git status --short --branch
```

## Контент

- Страницы обоих сайтов: `apps/<site>/src/content/pages` (маршрут, locale, SEO-поля, секции в frontmatter).
- Услуги wellness: `apps/wellness/src/content/services`; направления: `methods`; вопросы: `faq`.
- Публикации science: `apps/science/src/content/publications`.
- Схемы проверяют обязательные поля во время `astro check` и сборки.
- Публичность записи определяет `publicationScope` (`public`, `internal`, `consent_required`); не публичные записи исключаются из выдачи.

