# Пакет форм, валидации и CRM (`packages/forms`)

Пакет отвечает за клиентскую валидацию, защиту от спама, форматирование данных и интеграцию веб-форм сайта с внешней CRM-системой и Telegram-ботом.

---

## Структура пакета

```
packages/forms/
├── gas_crm_script.js   # Исходный код скрипта Google Apps Script (Webhook + CRM + Бот)
├── src/
│   ├── index.mjs       # Клиентская валидация, honeypot и форматирование данных
│   └── index.d.ts       # TypeScript определения типов полей и ответов
├── test/
│   └── enquiry.test.mjs# Модульные тесты валидатора формы
├── README.md           # Эта документация
└── package.json
```

---

## 1. Клиентская часть (`src/index.mjs`)

Экспортирует функции:
* `validateEnquiry(formData, site)`: проверяет корректность заполнения обязательных полей (`name`, `contact`, `request` для сайта `wellness`), согласие на обработку данных и отсутствие honeypot-заполнения.
* `formatEnquiryPayload(data)`: генерирует нормализованный JSON-объект для отправки в вебхук.

---

## 2. Серверная часть Google Apps Script (`gas_crm_script.js`)

Файл содержит готовый к развертыванию код Google Apps Script:
* **`doPost(e)`**: точка входа для внешних POST-запросов (обрабатывает и JSON с сайта, и вебхуки от Telegram).
* **`recordEnquiryInSheet(data)`**: вставляет строку заявки в Google Таблицу `CRM Заявки — Наталия Долгова` (`1PUybRboQFuNJldodtck2S6aYqHDTQpvkszn3DJlzXM8`) и форматирует ячейки.
* **`sendTelegramNotification(data)`**: отправляет форматированную карточку лида в Telegram Наталии (`400839444`) и администратору (`5218564894`).
* **`handleTelegramUpdate(update)`**: обрабатывает команды (`/start`, `/help`, `/site` и т.д.) и нажатия инлайн-кнопок переключения языка (`show_ru`, `show_en`).
* **`setupCRM()`**: служебная функция первичного создания столбцов, цветового оформления и выпадающих списков статусов воронки.

> Полное архитектурное описание см. в [docs/architecture/0003-forms-crm-and-telegram-bot.md](../../docs/architecture/0003-forms-crm-and-telegram-bot.md).
