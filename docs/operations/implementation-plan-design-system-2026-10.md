# Технический план реализации утверждённой дизайн-системы

**Дата утверждения:** 30 октября 2026 г.  
**Утверждённые концепции:**
- **Wellness:** **Premium Editorial** (Хлопковый Washi, кашемир, тёмная хвоя `#1E2421`, тосканский кирпич `#964B28`, античная охра `#C2885B`).
- **Science:** **Oxford Academic** (Холодный алебастр `#F8FAFC`, стальной сланец `#4A5D6E`, оксфордский индиго `#0A192F`, академический сапфир `#0284C7`).
- **Шрифтовая система:** **Fraunces Display Serif** (заголовки h1-h3) + **Inter / Inter Tight** (наборный текст).
- **Медиа-активы:** Размещение реального портрета Наталии в деловом блейзере в блоках Hero обоих сайтов; фото с МАК-картами в разделе `/practices/play-and-story/`.

---

## 1. Реестр задач для исполнителей (Work Breakdown Structure)

```
┌───────────────────┬─────────────────────────────────────────────────────────────┬─────────────┐
│ Задача            │ Описание и целевые файлы                                    │ Сложность   │
├───────────────────┼─────────────────────────────────────────────────────────────┼─────────────┤
│ TSK-DS-01         │ CSS-токены палитр в packages/ui/src/styles/themes.css       │ S (1-2 ч)   │
│ TSK-DS-02         │ Подключение Fraunces + Inter в BaseLayout.astro и base.css  │ S (1-2 ч)   │
│ TSK-DS-03         │ Устранение --hero-orb и чистый эдиториал-фон в Hero         │ S (1 ч)     │
│ TSK-DS-04         │ Внедрение реального портрета в Hero (Wellness и Science)    │ M (2-3 ч)   │
│ TSK-DS-05         │ Интеграция фото МАК-карт на /practices/play-and-story/      │ S (1 ч)     │
│ TSK-DS-06         │ Смягчение геометрии вкладок и компактная эдиториал-шапка    │ M (2-3 ч)   │
│ TSK-DS-07         │ Редизайн карточек услуг (Bento, бейдж 100€, терракота)     │ M (2-3 ч)   │
│ TSK-DS-08         │ Комплексное тестирование (pnpm check/build, WCAG, noindex)  │ S (1-2 ч)   │
└───────────────────┴─────────────────────────────────────────────────────────────┴─────────────┘
```

---

## 2. Детальные спецификации задач

### TSK-DS-01: Обновление цветовых дизайн-токенов
**Файл:** `packages/ui/src/styles/themes.css`

#### 1. Тема Wellness (`[data-theme="wellness"]`):
```css
[data-theme="wellness"] {
  --background: #FBF9F5;         /* Японский хлопок Washi (шелковистый светлый) */
  --surface: #F2ECE2;            /* Кашемировый овёс */
  --surface-strong: #E7DFD3;     /* Крафтовый беж */
  --card: #FFFFFF;               /* Чистый пергамент карточек */
  --heading: #1E2421;            /* Тёмный хвойный мох / глубокий лесной */
  --text: #2A332E;               /* Лесной антрацит (контраст 11.4:1 — WCAG AAA) */
  --muted-text: #5E6862;         /* Мягкий лесной пепел (контраст 5.2:1 — WCAG AA) */
  --accent: #C2885B;             /* Тёплая античная охра / коньячная кожа */
  --accent-strong: #964B28;      /* Тосканский кирпич / терракота (контраст 5.6:1) */
  --button-text: #FFFFFF;        /* Белый текст на кнопке действия */
  --border: #E3DAD0;             /* Тонкая рамка цвета льна */
  --border-strong: #C4B7A6;      /* Акцентная граница */
  --focus: #964B28;
  --shadow: rgba(30, 36, 33, 0.06);
  --hero-background: #FBF9F5;
  --hero-orb: transparent;       /* Устранение клише */
  --contact-background: #1E2421; /* Бархатная тёмная секция в подвале */
  --contact-text: #FBF9F5;
  --draft-background: #F2ECE2;
  --draft-text: #5E6862;
  --radius: 1rem;
  --radius-small: 0.5rem;
}
```

#### 2. Тема Science (`[data-theme="science"]`):
```css
[data-theme="science"] {
  --background: #F8FAFC;         /* Холодный академический алебастр */
  --surface: #EDF2F7;            /* Сланцевый серый */
  --surface-strong: #E2E8F0;     /* Плотный серый */
  --card: #FFFFFF;               /* Чистый белый лист */
  --heading: #0A192F;            /* Глубокий оксфордский индиго */
  --text: #1E293B;               /* Тёмный чернильный сланец (контраст 13.2:1) */
  --muted-text: #4A5D6E;         /* Стальной пепел (контраст 5.8:1) */
  --accent: #0284C7;             /* Академический сапфир */
  --accent-strong: #0369A1;      /* Океанический оксфорд (CTA) */
  --button-text: #FFFFFF;
  --border: #CBD5E1;
  --border-strong: #94A3B8;
  --focus: #0284C7;
  --shadow: rgba(10, 25, 47, 0.06);
  --hero-background: #F8FAFC;
  --hero-orb: transparent;
  --contact-background: #0A192F; /* Глубокий ночной оксфорд для футера */
  --contact-text: #F8FAFC;
  --draft-background: #EDF2F7;
  --draft-text: #4A5D6E;
  --radius: 0.5rem;
  --radius-small: 0.25rem;
}
```

---

### TSK-DS-02: Подключение шрифтов Fraunces и Inter
**Файлы:**  
- `packages/ui/src/components/BaseLayout.astro`
- `packages/ui/src/styles/base.css`

1. В `<head>` `BaseLayout.astro` добавить предзагрузку Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```
2. В `packages/ui/src/styles/base.css`:
```css
:root {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

h1, h2, h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-optical-sizing: auto;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
```

---

### TSK-DS-03: Устранение размытого шара в Hero
**Файлы:**  
- `packages/ui/src/styles/base.css`
- `packages/ui/src/styles/themes.css`

Удалить или обнулить правила `.hero::before` / `.hero::after`, генерирующие `background: radial-gradient(...)` с переменной `--hero-orb`. Заменить фон на чистый светлый цвет `--hero-background` с лёгким линейным разделением от контента `border-block-end: 1px solid var(--border)`.

---

### TSK-DS-04: Внедрение реального портрета Наталии Долговой
**Исходник фото:** `docs/assets/photos/natalia_plaid_suit_hero.png` (Наталия в деловом клетчатом жакете).  
**Целевые пути размещения:**
- `apps/wellness/public/images/natalia-portrait.png`
- `apps/science/public/images/natalia-portrait.png`

**Файлы изменения шаблонов:**
- `apps/wellness/src/components/SitePage.astro` (для главной страницы Wellness)
- `apps/science/src/components/SitePage.astro` (для главной страницы Science)

**Код верстки портретной карточки:**
Заменить пустую круглую плашку `<div class="brand-mark">ND</div>` на структурированный компонент:
```html
<aside class="portrait-card" aria-label="Портрет Наталии Долговой">
  <div class="portrait-image-wrapper">
    <img 
      src="/images/natalia-portrait.png" 
      alt="Наталия Долгова — Dr. phil., практический психолог и тренер по нейроинтеграции" 
      width="440" 
      height="520" 
      loading="eager" 
      decoding="async" 
      class="portrait-img"
    />
  </div>
  <div class="portrait-meta">
    <div class="portrait-name">Наталия Долгова</div>
    <div class="portrait-credentials">Dr. phil. · Практический психолог · Тренер по нейроинтеграции</div>
    <div class="portrait-affil">Europa-Universität Flensburg</div>
  </div>
</aside>
```
**Стили в `base.css`:**
- Окружение картинки тонкой рамкой `border: 1px solid var(--border)`.
- Скругление углов: `border-radius: var(--radius)`.
- Мягкая естественная тень `box-shadow: 0 1.25rem 2.5rem var(--shadow)`.

---

### TSK-DS-05: Интеграция фото МАК-карт в раздел «Игра и сказка»
**Исходник фото:** `docs/assets/photos/natalia_white_dress_mak_cards.jpg`.  
**Целевой путь:** `apps/wellness/public/images/natalia-cards.jpg`.  
**Файлы:** `apps/wellness/src/content/pages/ru/play-and-story.md` и `en/play-and-story.md`.

Добавить иллюстрацию в тело страницы с метафорическими картами:
> *«В консультациях используются метафорические ассоциативные карты (МАК) и игровые практики для безопасной работы с подсознательными сценариями...»*

---

### TSK-DS-06: Смягчение геометрии вкладок и компактная эдиториал-шапка
**Файл:** `packages/ui/src/styles/base.css`

1. Заменить агрессивный полигональный скос `clip-path: polygon(...)` на утонченный закругленный контур либо классические сегментные вкладки с плавной нижней акцентной полосой `border-block-end: 2.5px solid var(--accent-strong)`.
2. Уменьшить верхний и нижний padding трея навигации `.page-nav` до `0.25rem`.
3. Сохранить доступность свайпа на мобильных экранах с индикацией затухания `mask-image`.

---

### TSK-DS-07: Редизайн карточек форматов (Bento-стиль)
**Файлы:**
- `apps/wellness/src/components/SitePage.astro`
- `packages/ui/src/styles/base.css`

1. Карточка установочной сессии получает акцентный бейдж «Рекомендуемый старт» с фоном `--surface-strong` и рамкой `--border-strong`.
2. Кнопка «Записаться на установочную встречу» получает цвет `--accent-strong` (`#964B28` в Wellness / `#0369A1` в Science).
3. При наведении карточки плавно поднимаются на 3px с легким усилением тени.

---

### TSK-DS-08: Релизный контроль и верификация
Выполнить стандартные тесты из канонического регламента `AGENTS.md`:
```powershell
pnpm check
pnpm build
git diff --check
```
Проверить в браузере корректность отображения:
- `http://localhost:4321/ru/` и `/en/` (Wellness);
- `http://localhost:4322/ru/` и `/en/` (Science);
- Убедиться, что `robots.txt` сохраняет `noindex` до финального release gate Наталии.

---

## 3. Рекомендации по редактированию фотоматериалов

1. **Фото 1 (Деловой клетчатый жакет):**
   - *Вердикт:* **Главный портрет для Hero (5/5).**
   - *Ретушь:* Слегка смягчить пестрый фон обоев (наложить деликатное радиальное виньетирование или мягкий блюр по краям), чтобы взгляд сразу фокусировался на лице Наталии.
2. **Фото 2 (Белое платье с картами МАК):**
   - *Вердикт:* **Иллюстрация для страницы `/practices/play-and-story/` (4/5).**
   - *Ретушь:* Приглушить насыщенность розового дивана, подчеркнуть белизну платья и детали карт в руках.
3. **Фото 3 и Фото 4 (Короны / песочные часы):**
   - *Вердикт:* **Не использовать на основных сайтах.**
   - Причина: Риск ложных ассоциаций с мистикой и астрологией, что разрушает академическое позиционирование Dr. phil. и доказательную медицину. Сохранить для личных соцсетей/Telegram.
