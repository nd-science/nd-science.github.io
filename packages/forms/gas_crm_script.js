/**
 * CRM & Telegram Webhook для сайтов Наталии Долговой
 * Таблица: "CRM Заявки — Наталия Долгова"
 */

// 1. НАСТРОЙКИ ПО УМОЛЧАНИЮ (можно также задать в Настройки проекта -> Свойства скрипта)
const DEFAULT_TG_TOKEN = ""; // Вставьте сюда токен бота от @BotFather (или укажите в Свойствах скрипта)
const DEFAULT_TG_CHAT_ID = ""; // Вставьте сюда ваш chat_id (или укажите в Свойствах скрипта)

/**
 * Инициализация структуры CRM-таблицы (запустите один раз)
 */
function setupCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Заявки");
  if (!sheet) {
    sheet = ss.getActiveSheet();
    sheet.setName("Заявки");
  }

  // Заголовки столбцов
  const headers = [
    "ID заявки",
    "Дата и время",
    "Статус",
    "Имя клиента",
    "Контакт для связи (TG/WA/Email/Тел)",
    "Услуга / Формат",
    "Часовой пояс / Город",
    "Запрос клиента",
    "Заметки специалиста"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Стилизация заголовка
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#3D312A"); // Фирменный тёплый оттенок Wellness
  headerRange.setFontColor("#FFFFFF");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Выпадающий список для статусов (Колонка C)
  const statuses = [
    "1. Новая заявка",
    "2. В работе / Ответ отправлен",
    "3. Время согласовано",
    "4. Оплачено",
    "5. Сессия проведена",
    "6. В сопровождении",
    "7. Архив / Завершено",
    "8. Отказ / Отмена"
  ];
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statuses, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("C2:C1000").setDataValidation(rule);

  // Ширина столбцов
  sheet.setColumnWidth(1, 130); // ID
  sheet.setColumnWidth(2, 150); // Дата
  sheet.setColumnWidth(3, 210); // Статус
  sheet.setColumnWidth(4, 180); // Имя
  sheet.setColumnWidth(5, 240); // Контакт
  sheet.setColumnWidth(6, 260); // Услуга
  sheet.setColumnWidth(7, 180); // Часовой пояс
  sheet.setColumnWidth(8, 380); // Запрос
  sheet.setColumnWidth(9, 260); // Заметки

  // Перенос текста для длинных колонок
  sheet.getRange("E2:I1000").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  SpreadsheetApp.getUi().alert("CRM-таблица успешно настроена!");
}

/**
 * Обработка входящих заявок (POST Webhook)
 */
function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.type && e.postData.type.includes("application/json")) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Антиспам (Honeypot): если скрытое поле заполнено, молча подтверждаем и ничего не пишем
    if (data.website) {
      return createJsonResponse({ ok: true, status: "ignored" });
    }

    // Извлечение полей
    const name = (data.name || data.organisation || "Без имени").trim();
    const contact = (data.contact || data.email || data.phone || data.telegram || "Не указан").trim();
    const service = (data.service || data.serviceName || data.task || "Консультация / Запрос").trim();
    const timezone = (data.timezone || data.timeline || "Не указан").trim();
    const requestText = (data.request || data.comment || "").trim();
    const dateObj = new Date();
    const dateFormatted = Utilities.formatDate(dateObj, "Europe/Belgrade", "dd.MM.yyyy HH:mm");
    
    // Генерация уникального ID заявки (например, ND-2610-482)
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const id = "ND-" + Utilities.formatDate(dateObj, "Europe/Belgrade", "yyMM") + "-" + randomSuffix;

    // Запись в Google Таблицу
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Заявки") || ss.getActiveSheet();
    sheet.appendRow([
      id,
      dateFormatted,
      "1. Новая заявка",
      name,
      contact,
      service,
      timezone,
      requestText,
      "" // Заметки
    ]);

    // Выравнивание добавленной строки
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 9).setVerticalAlignment("top");

    // Отправка в Telegram
    notifyTelegram({
      id: id,
      date: dateFormatted,
      name: name,
      contact: contact,
      service: service,
      timezone: timezone,
      request: requestText
    });

    return createJsonResponse({
      ok: true,
      id: id,
      message: "Заявка успешно принята! Наталия свяжется с вами в ближайшее время."
    });

  } catch (err) {
    return createJsonResponse({
      ok: false,
      error: err.toString()
    });
  }
}

/**
 * Проверка доступности вебхука (GET)
 */
function doGet(e) {
  return createJsonResponse({
    ok: true,
    service: "CRM & Telegram Webhook Наталии Долговой",
    time: new Date().toISOString()
  });
}

/**
 * Отправка оповещения в Telegram
 */
function notifyTelegram(lead) {
  const scriptProps = PropertiesService.getScriptProperties();
  const token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN") || DEFAULT_TG_TOKEN;
  const chatId = scriptProps.getProperty("TELEGRAM_CHAT_ID") || DEFAULT_TG_CHAT_ID;

  if (!token || !chatId) {
    // Токен или chat_id ещё не настроены - заявка сохранена в таблице
    return;
  }

  const message = 
    "🔔 *Новая заявка с сайта!*\n\n" +
    "🆔 *Номер:* `" + escapeMd(lead.id) + "`\n" +
    "👤 *Клиент:* " + escapeMd(lead.name) + "\n" +
    "📱 *Контакт:* `" + escapeMd(lead.contact) + "`\n" +
    "🎯 *Формат:* " + escapeMd(lead.service) + "\n" +
    "🌍 *Часовой пояс:* " + escapeMd(lead.timezone) + "\n" +
    "💬 *Запрос:*\n_" + escapeMd(lead.request || "—") + "_\n\n" +
    "📅 " + lead.date;

  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

/**
 * Тест отправки в Telegram из редактора
 */
function testTelegram() {
  notifyTelegram({
    id: "ND-TEST-001",
    date: Utilities.formatDate(new Date(), "Europe/Belgrade", "dd.MM.yyyy HH:mm"),
    name: "Тестовый Клиент",
    contact: "@telegram_user / +7 (999) 000-00-00",
    service: "Первая консультация (100 €)",
    timezone: "Москва (UTC+3)",
    request: "Проверка связки сайта, Google Таблицы и Telegram-бота."
  });
}

function escapeMd(text) {
  if (!text) return "";
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
