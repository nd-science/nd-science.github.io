/**
 * CRM & Telegram Webhook для сайтов Наталии Долговой
 * Таблица: "CRM Заявки — Наталия Долгова"
 */

// 1. НАСТРОЙКИ ПО УМОЛЧАНИЮ (можно также задать в Настройки проекта -> Свойства скрипта)
const DEFAULT_TG_TOKEN = "9021022866:AAHfN9x9jSDt5JlpkIuoOL5OUGHMn39lq6o";
const DEFAULT_TG_CHAT_ID = "400839444,5218564894";

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
 * Обработка входящих запросов (POST Webhook)
 */
function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // --- 1. ОБРАБОТКА ВХОДЯЩИХ СООБЩЕНИЙ ИЗ TELEGRAM ---
    if (data.update_id) {
      handleTelegramUpdate(data);
      return createJsonResponse({ ok: true });
    }

    // --- 2. ОБРАБОТКА ЗАЯВКИ С ВЕБ-САЙТА ---
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

    // Отправка в Telegram специалистам
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
 * Обработка событий Telegram (команды /start, сообщения клиентов, кнопки)
 */
function handleTelegramUpdate(update) {
  const scriptProps = PropertiesService.getScriptProperties();
  const token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN") || DEFAULT_TG_TOKEN;
  if (!token) return;

  // 1. Нажатия inline-кнопок
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId = cb.message && cb.message.chat ? cb.message.chat.id : cb.from.id;
    const action = cb.data;

    if (action === "show_ru") {
      sendWelcomeMessage(token, chatId, "ru");
    } else if (action === "show_en") {
      sendWelcomeMessage(token, chatId, "en");
    }

    // Ответ на callback_query для снятия анимации загрузки
    try {
      UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/answerCallbackQuery", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({ callback_query_id: cb.id }),
        muteHttpExceptions: true
      });
    } catch (e) {}
    return;
  }

  // 2. Входящие текстовые сообщения
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = (msg.text || "").trim();
    const userLang = (msg.from && msg.from.language_code && msg.from.language_code.startsWith("ru")) ? "ru" : "en";

    // Главное меню и приветствие
    if (text.startsWith("/start") || text.startsWith("/help")) {
      sendWelcomeMessage(token, chatId, userLang);
      return;
    }

    // Быстрые ссылки по командам
    if (text.startsWith("/site")) {
      sendMessage(token, chatId, userLang === "ru"
        ? "🌿 Официальный сайт Наталии Долговой (Wellness): https://wellnessnd.github.io/ru/"
        : "🌿 Official website of Natalia Dolgova (Wellness): https://wellnessnd.github.io/en/");
      return;
    }

    if (text.startsWith("/science")) {
      sendMessage(token, chatId, userLang === "ru"
        ? "🎓 Научный и академический профиль (Science): https://nd-science.github.io/ru/"
        : "🎓 Scientific and academic profile (Science): https://nd-science.github.io/en/");
      return;
    }

    if (text.startsWith("/contact")) {
      sendMessage(token, chatId, userLang === "ru"
        ? "💬 Написать Наталии Долговой напрямую в Telegram: @natali_tvet_pro\n📞 Страница записи на сайте: https://wellnessnd.github.io/ru/booking/"
        : "💬 Message Natalia Dolgova directly in Telegram: @natali_tvet_pro\n📞 Booking page: https://wellnessnd.github.io/en/booking/");
      return;
    }

    if (text.startsWith("/channel")) {
      sendMessage(token, chatId, userLang === "ru"
        ? "📢 Официальный Telegram-канал «Компас»: @natalicompass"
        : "📢 Official Telegram Channel 'Compass': @natalicompass");
      return;
    }

    // Если клиент прислал произвольный текст в чат боту:
    // Записываем его как новую заявку в CRM!
    const dateObj = new Date();
    const dateFormatted = Utilities.formatDate(dateObj, "Europe/Belgrade", "dd.MM.yyyy HH:mm");
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const id = "ND-TG-" + Utilities.formatDate(dateObj, "Europe/Belgrade", "yyMM") + "-" + randomSuffix;
    const clientName = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" ") || "Клиент Telegram";
    const clientTg = msg.from.username ? ("@" + msg.from.username) : ("Telegram ID: " + chatId);

    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = ss.getSheetByName("Заявки") || ss.getActiveSheet();
      sheet.appendRow([
        id,
        dateFormatted,
        "1. Новая заявка",
        clientName,
        clientTg,
        "Сообщение через Telegram-бота",
        "Telegram",
        text,
        "Написано напрямую в диалоге с ботом"
      ]);
    } catch (e) {}

    // Уведомляем специалистов
    notifyTelegram({
      id: id,
      date: dateFormatted,
      name: clientName,
      contact: clientTg,
      service: "Сообщение в бот",
      timezone: "Telegram",
      request: text
    });

    // Отвечаем клиенту
    sendMessage(token, chatId, userLang === "ru"
      ? "Спасибо за ваше сообщение! Наталия свяжется с вами в ближайшее время.\n\nВы также можете написать ей напрямую: @natali_tvet_pro"
      : "Thank you for your message! Natalia will reply to you shortly.\n\nYou can also message her directly: @natali_tvet_pro");
  }
}

/**
 * Приветственное сообщение с кнопками перехода на сайты и контакты
 */
function sendWelcomeMessage(token, chatId, lang) {
  let text = "";
  let keyboard = [];

  if (lang === "ru") {
    text =
      "Здравствуйте! 🌿\n\n" +
      "Это официальный ассистент Наталии Долговой — психолога, тренера по нейроинтеграции и преподавателя оздоровительных практик.\n\n" +
      "Чем я могу помочь:\n" +
      "• Познакомиться с практиками и форматами работы\n" +
      "• Узнать стоимость и записаться на консультацию\n" +
      "• Перейти к научным публикациям и проектам\n" +
      "• Связаться с Наталией лично\n\n" +
      "Выберите интересующий раздел кнопками ниже:";

    keyboard = [
      [
        { text: "🌐 Сайт Wellness (практика)", url: "https://wellnessnd.github.io/ru/" },
        { text: "📋 Форматы и цены", url: "https://wellnessnd.github.io/ru/for-individuals/" }
      ],
      [
        { text: "💬 Написать Наталии лично", url: "https://t.me/natali_tvet_pro" },
        { text: "📢 Канал «Компас»", url: "https://t.me/natalicompass" }
      ],
      [
        { text: "🎓 Научный профиль (Science)", url: "https://nd-science.github.io/ru/" }
      ],
      [
        { text: "🇬🇧 Switch to English", callback_data: "show_en" }
      ]
    ];
  } else {
    text =
      "Hello and welcome! 🌿\n\n" +
      "This is the official assistant of Natalia Dolgova — psychologist, neurointegration trainer, and somatic wellness practitioner.\n\n" +
      "How this assistant can help:\n" +
      "• Explore practical approaches and consultation formats\n" +
      "• Check pricing and book a 1:1 session or workshop\n" +
      "• Access scientific publications and educational research\n" +
      "• Message Natalia directly\n\n" +
      "Please choose an option below:";

    keyboard = [
      [
        { text: "🌐 Wellness Website", url: "https://wellnessnd.github.io/en/" },
        { text: "📋 Formats & Pricing", url: "https://wellnessnd.github.io/en/for-individuals/" }
      ],
      [
        { text: "💬 Message Natalia Directly", url: "https://t.me/natali_tvet_pro" },
        { text: "📢 Telegram Channel", url: "https://t.me/natalicompass" }
      ],
      [
        { text: "🎓 Scientific Profile (Science)", url: "https://nd-science.github.io/en/" }
      ],
      [
        { text: "🇷🇺 Переключить на русский", callback_data: "show_ru" }
      ]
    ];
  }

  const payload = {
    chat_id: chatId,
    text: text,
    reply_markup: {
      inline_keyboard: keyboard
    }
  };

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function sendMessage(token, chatId, text) {
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      disable_web_page_preview: false
    }),
    muteHttpExceptions: true
  });
}

/**
 * Отправка оповещения в Telegram специалистам
 */
function notifyTelegram(lead) {
  const scriptProps = PropertiesService.getScriptProperties();
  const token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN") || DEFAULT_TG_TOKEN;
  const chatId = scriptProps.getProperty("TELEGRAM_CHAT_ID") || DEFAULT_TG_CHAT_ID;

  if (!token || !chatId) {
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
  const chatIds = String(chatId).split(",").map(function(item) { return item.trim(); }).filter(Boolean);

  for (let i = 0; i < chatIds.length; i++) {
    const payload = {
      chat_id: chatIds[i],
      text: message,
      parse_mode: "Markdown"
    };

    try {
      UrlFetchApp.fetch(url, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
    } catch (sendErr) {
      // Игнорируем ошибку отдельного чата (если адресат ещё не нажал /start)
    }
  }
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
