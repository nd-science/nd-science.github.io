# Проверка инициализации — 2026-10-20

## Успешно

- `pnpm install` — зависимости установлены, peer-конфликтов нет.
- `pnpm check` — content validation и `astro check` для обоих приложений.
- `pnpm build` — статические RU/EN-страницы, корневой redirect и `robots.txt` обоих сайтов.
- HTTP smoke test — `/` возвращает 302 на `/ru/`, `/ru/`, `/en/` и `/robots.txt` отвечают успешно.
- Внутренние ссылки и якоря — проверены для двух языков обоих сайтов.
- Playwright — переключение RU/EN, мобильная ширина 390 px, семантическое дерево и первый Tab на skip-link.
- Консоль браузера — без ошибок и предупреждений после добавления SVG favicon.
- Lighthouse Accessibility — 100/100 для русских главных страниц wellness и science, бинарных нарушений не найдено.
- SEO DOM — один `h1`, корректный `lang`, draft `noindex`, canonical и alternates `ru`, `en`, `x-default`.

## Ограничения и предупреждения

- Научная content collection пока пуста и Astro выводит ожидаемое предупреждение glob-loader. Фиктивная публикация не добавлялась.
- Rollup удаляет два некорректно расположенных служебных комментария из зависимости Zod; сборка завершается успешно.
- `axe-cli` не стартовал: bundled ChromeDriver поддерживает Chrome 152, а установлен Chrome 155. Вместо него выполнен Lighthouse и ручная проверка доступности.
- Astro 7 не используется, потому что Windows Application Control блокирует его нативный compiler binding. Зафиксирован Astro 6.4.8 с официальным WebAssembly-компилятором.

