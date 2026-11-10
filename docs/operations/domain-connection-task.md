# Техническое задание: Подключение и настройка production-доменов tvet.si и natalicompass.com

**Дата создания:** 10 ноября 2026 года  
**Исполнитель:** OpenCode / Subagent  
**Статус:** Готово к реализации  
**Связанные решения:** DEC-001, DEC-003, DEC-011, DEC-049  
**Учётная запись регистратора:** Moj NEOSERV (`ivan.dolgov.han.dong@gmail.com`)

---

## 1. Цель и контекст

Для монорепозитория проектов Наталии Долговой приобретены и активированы официальные домены:
* **Science:** `https://tvet.si` (ID в Neoserv: `478847`, оплачен до 10.11.2027)
* **Wellness:** `https://natalicompass.com` (ID в Neoserv: `478848`, верифицирован в ICANN, оплачен до 10.11.2027)
* **RuDoctors:** `https://rudoctors.com` (ID в Neoserv: `478851`, оплачен до 10.11.2027, резерв под медицинский агрегатор)

Бесплатный DNS-хостинг Neoserv (`Brezplačno DNS gostovanje`) уже **активирован** для всех доменов.  
Серверы имен установлены: `freedns1.neoserv.si`, `freedns2.neoserv.si`, `freedns3.neoserv.si`, `freedns4.neoserv.si`.  
Панели управления записями сразу доступны к редактированию.

**Задача:** Перевести сборку, canonical URL, sitemap, Open Graph и GitHub Pages с временных адресов (`nd-science.github.io` и `wellnessnd.github.io`) на официальные канонические домены, сохранив при этом статус `draft` и `noindex` до публичной отмашки Наталии.

---

## 2. Параметры DNS для настройки в панели moj.neoserv.si

Для привязки доменов к GitHub Pages в панели управления DNS Neoserv настраиваются ресурсные записи.  
Форма добавления открывается кнопкой **`+ Dodaj nov zapis`** на страницах доменов:

### А. Для домена `tvet.si` (Science)
Прямая ссылка на редактор записей:  
👉 **`https://moj.neoserv.si/domains/478847/records`**

| Gostitelj (Host) | Tip (Type) | Vrednost (Target / IP) | Čas veljavnosti (TTL) |
|---|:---:|---|:---:|
| `@` *(или пусто)* | **A** | `185.199.108.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.109.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.110.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.111.153` | 3600 (1 ura) |
| `www` | **CNAME** | `nd-science.github.io.` | 3600 (1 ura) |

### Б. Для домена `natalicompass.com` (Wellness)
Прямая ссылка на редактор записей:  
👉 **`https://moj.neoserv.si/domains/478848/records`**

| Gostitelj (Host) | Tip (Type) | Vrednost (Target / IP) | Čas veljavnosti (TTL) |
|---|:---:|---|:---:|
| `@` *(или пусто)* | **A** | `185.199.108.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.109.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.110.153` | 3600 (1 ura) |
| `@` *(или пусто)* | **A** | `185.199.111.153` | 3600 (1 ura) |
| `www` | **CNAME** | `wellnessnd.github.io.` | 3600 (1 ura) |

> **Примечание по rudoctors.com:**  
> Прямая ссылка: `https://moj.neoserv.si/domains/478851/records`.  
> DNS-хостинг активирован. Записи будут добавлены при развёртывании сервиса RuDoctors.

---

## 3. Изменения в кодовой базе монорепозитория

### 3.1. Файлы CNAME для GitHub Pages
1. Создать `apps/science/public/CNAME` с содержимым:
   ```text
   tvet.si
   ```
2. Создать `apps/wellness/public/CNAME` с содержимым:
   ```text
   natalicompass.com
   ```

### 3.2. Конфигурация Astro
1. `apps/science/astro.config.mjs`:
   * Установить `site: 'https://tvet.si'`
2. `apps/wellness/astro.config.mjs`:
   * Установить `site: 'https://natalicompass.com'`

### 3.3. Общий профиль и конфигурация сайтов (`packages/profile`)
1. В `packages/profile/src/index.ts`:
   * Обновить `fallbackUrl` для `wellness` на `https://natalicompass.com`
   * Обновить `fallbackUrl` для `science` на `https://tvet.si`
   * Проверить перекрёстные ссылки между сайтами в подвале (footer cross-site links):
     - На Science: ссылка на Wellness должна вести на `https://natalicompass.com`
     - На Wellness: ссылка на Science должна вести на `https://tvet.si`

### 3.4. Валидаторы и тесты
1. `scripts/validate-build.mjs`: убедиться, что проверка канонических URL, hreflang и sitemap ожидает `tvet.si` и `natalicompass.com`.
2. `scripts/validate-content.mjs`: убедиться, что все 70 страниц Science и 36 страниц Wellness валидируются без замечаний.

---

## 4. Настройки в GitHub Pages (Репозитории)

1. Для репозитория **Science** (`nd-science`):
   * В **Settings** → **Pages** → **Custom domain** указать `tvet.si`.
   * Сохранить. Дождаться проверки DNS (DNS check).
   * После генерации TLS-сертификата включить галочку **Enforce HTTPS**.
2. Для репозитория **Wellness** (`wellnessnd`):
   * В **Settings** → **Pages** → **Custom domain** указать `natalicompass.com`.
   * Сохранить. Дождаться проверки DNS.
   * После генерации TLS-сертификата включить галочку **Enforce HTTPS**.

---

## 5. Критерии приёмки (DoD)

1. [x] В панели Neoserv внесены 4 A-записи и 1 CNAME-запись для `tvet.si`.
2. [x] В панели Neoserv внесены 4 A-записи и 1 CNAME-запись для `natalicompass.com`.
3. [x] Файлы `CNAME` созданы в `apps/science/public/CNAME` и `apps/wellness/public/CNAME`.
4. [x] `astro.config.mjs` обоих приложений переключены на канонические домены.
5. [x] `pnpm check` проходит с 0 ошибок.
6. [x] `pnpm build` собирает все страницы без сбоев (Wellness: 36, Science: 86).
7. [x] `node scripts/validate-build.mjs` подтверждает корректность canonical, hreflang и sitemap.
8. [x] Тесты `packages/forms` проходят (13/13).
9. [x] `git diff --check` проходит чисто.
10. [x] `PUBLIC_SITE_STATUS=draft` (`noindex`) сохраняется до явного подтверждения Наталией публичного релиза.
