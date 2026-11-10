/**
 * CRM & Telegram Webhook для сайтов Наталии Долговой
 * Таблица: "CRM Заявки — Наталия Долгова"
 */

// 1. НАСТРОЙКИ (задаются исключительно в: Настройки проекта -> Свойства скрипта)
//   - TELEGRAM_BOT_TOKEN: токен бота Telegram, полученный от @BotFather
//   - TELEGRAM_CHAT_ID: ID получателей уведомлений через запятую (например: 400839444,5218564894)
//   - TURNSTILE_SECRET_KEY: секрет Cloudflare Turnstile для server-side проверки формы

const FORM_MAX_LENGTH = 2000;
const FORM_CONTACT_LIMIT = 3;
const FORM_CONTACT_WINDOW_SECONDS = 60 * 60;
const FORM_GLOBAL_LIMIT = 20;
const FORM_GLOBAL_WINDOW_SECONDS = 5 * 60;
const FORM_HOSTNAMES = {
  wellness: "wellnessnd.github.io",
  science: "nd-science.github.io"
};

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

function formText(value, maxLength) {
  const limit = maxLength || FORM_MAX_LENGTH;
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function formLocale(data) {
  return data.locale === "en" ? "en" : "ru";
}

function formMessage(data, kind) {
  const en = formLocale(data) === "en";
  return {
    accepted: en
      ? "Thank you. Your enquiry has been received. This is not a confirmed booking."
      : "Спасибо. Заявка получена. Это ещё не подтверждённая запись.",
    invalid: en
      ? "Please review the required form fields."
      : "Проверьте обязательные поля формы.",
    blocked: en
      ? "We could not verify the submission. Refresh the page and try again."
      : "Не удалось проверить отправку. Обновите страницу и попробуйте снова.",
    limited: en
      ? "Please wait before sending another enquiry."
      : "Пожалуйста, подождите перед повторной отправкой.",
    failed: en
      ? "The enquiry could not be sent. Please try again later."
      : "Заявка не отправлена. Попробуйте позже."
  }[kind];
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidForm(data, site) {
  if (data.consent !== "yes") return false;
  if (site === "science") {
    return ["name", "organisation", "role", "email", "language", "projectType", "intendedResult", "audience", "timeline", "budgetRange"]
      .every(function(key) { return formText(data[key]).length > 0; }) && isValidEmail(formText(data.email, 254));
  }
  if (data.enquiryKind === "organisation") {
    return ["organisation", "role", "contact", "language", "request", "audience", "delivery", "timeline"]
      .every(function(key) { return formText(data[key]).length > 0; });
  }
  return data.adultConfirmed === "yes" && ["name", "contact", "request"]
    .every(function(key) { return formText(data[key]).length > 0; });
}

function verifyTurnstile(token, site) {
  const secret = PropertiesService.getScriptProperties().getProperty("TURNSTILE_SECRET_KEY");
  if (!token || !secret || !FORM_HOSTNAMES[site]) return false;
  try {
    const response = UrlFetchApp.fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "post",
      payload: { secret: secret, response: formText(token, 2048) },
      muteHttpExceptions: true
    });
    const result = JSON.parse(response.getContentText());
    return response.getResponseCode() === 200 && result.success === true && result.hostname === FORM_HOSTNAMES[site];
  } catch (err) {
    return false;
  }
}

function hashForCache(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)
    .map(function(byte) { return ((byte + 256) % 256).toString(16).padStart(2, "0"); })
    .join("");
}

function reserveFormSubmission(site, contact) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(2000)) return false;
  try {
    const cache = CacheService.getScriptCache();
    const contactKey = "form:contact:" + site + ":" + hashForCache(contact.toLowerCase());
    const globalKey = "form:global:" + site;
    const contactCount = Number(cache.get(contactKey) || 0);
    const globalCount = Number(cache.get(globalKey) || 0);
    if (contactCount >= FORM_CONTACT_LIMIT || globalCount >= FORM_GLOBAL_LIMIT) return false;
    cache.put(contactKey, String(contactCount + 1), FORM_CONTACT_WINDOW_SECONDS);
    cache.put(globalKey, String(globalCount + 1), FORM_GLOBAL_WINDOW_SECONDS);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function toStoredLead(data, site) {
  if (site !== "science") {
    const isOrganisation = data.enquiryKind === "organisation";
    return {
      source: "Wellness",
      name: formText(data.name || data.organisation, 180),
      contact: formText(data.contact || data.email, 254),
      service: isOrganisation
        ? "Wellness organisation: " + formText(data.delivery, 180)
        : formText(data.service || "Консультация / Запрос", 180),
      timezone: isOrganisation ? "Сроки: " + formText(data.timeline, 180) : formText(data.timezone, 180),
      request: isOrganisation
        ? ["Организация: " + formText(data.organisation), "Роль: " + formText(data.role), "Аудитория: " + formText(data.audience), "Запрос: " + formText(data.request), formText(data.comment) ? "Комментарий: " + formText(data.comment) : ""].filter(Boolean).join("\n")
        : formText(data.request)
    };
  }
  return {
    source: "Science",
    name: formText(data.name, 180),
    contact: formText(data.email, 254),
    service: "Science: " + formText(data.projectType, 180),
    timezone: "Сроки: " + formText(data.timeline, 180),
    request: [
      "Организация: " + formText(data.organisation),
      "Роль: " + formText(data.role),
      "Язык: " + formText(data.language),
      "Результат: " + formText(data.intendedResult),
      "Аудитория: " + formText(data.audience),
      "Бюджет: " + formText(data.budgetRange),
      formText(data.comment) ? "Комментарий: " + formText(data.comment) : ""
    ].filter(Boolean).join("\n")
  };
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

    // Telegram webhook остаётся независимым от веб-форм.
    if (data.update_id) {
      handleTelegramUpdate(data);
      return HtmlService.createHtmlOutput("OK");
    }

    // Honeypot: бот получает нейтральный успех, но CRM и Telegram не затрагиваются.
    if (formText(data.website)) return createJsonResponse({ ok: true, status: "ignored" });

    const site = data.site === "science" ? "science" : "wellness";
    if (!isValidForm(data, site)) return createJsonResponse({ ok: false, message: formMessage(data, "invalid") });
    if (!verifyTurnstile(data["cf-turnstile-response"], site)) return createJsonResponse({ ok: false, message: formMessage(data, "blocked") });

    const lead = toStoredLead(data, site);
    if (!reserveFormSubmission(site, lead.contact)) return createJsonResponse({ ok: false, message: formMessage(data, "limited") });

    const dateObj = new Date();
    const dateFormatted = Utilities.formatDate(dateObj, "Europe/Belgrade", "dd.MM.yyyy HH:mm");
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const id = "ND-" + Utilities.formatDate(dateObj, "Europe/Belgrade", "yyMM") + "-" + randomSuffix;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Заявки") || ss.getActiveSheet();
    sheet.appendRow([id, dateFormatted, "1. Новая заявка", lead.name, lead.contact, lead.service, lead.timezone, lead.request, ""]);
    sheet.getRange(sheet.getLastRow(), 1, 1, 9).setVerticalAlignment("top");

    notifyTelegram({ source: lead.source, id: id, date: dateFormatted, name: lead.name, contact: lead.contact, service: lead.service, timezone: lead.timezone, request: lead.request });
    return createJsonResponse({ ok: true, id: id, message: formMessage(data, "accepted") });
  } catch (err) {
    console.error("Website form processing failed");
    return createJsonResponse({ ok: false, message: formMessage({}, "failed") });
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
  const token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN");
  if (!token) {
    console.warn("handleTelegramUpdate: TELEGRAM_BOT_TOKEN не задан в Свойствах скрипта (Script Properties).");
    return;
  }

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
      source: "Telegram-бот",
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
  const token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = scriptProps.getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    console.warn("notifyTelegram: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в Свойствах скрипта (Script Properties).");
    return;
  }

  const safeId = String(lead.id || "").replace(/[`]/g, "");
  const safeContact = String(lead.contact || "").replace(/[`]/g, "");
  const safeSource = escapeMd(lead.source || "Не указан");
  const safeName = escapeMd(lead.name || "Без имени");
  const safeService = escapeMd(lead.service || "Консультация / Запрос");
  const safeTimezone = escapeMd(lead.timezone || "Не указан");
  const safeRequest = escapeMd(lead.request || "—");

  const message = 
    "🔔 *Новая заявка с сайта!*\n\n" +
    "🆔 *Номер:* `" + safeId + "`\n" +
    "👤 *Клиент:* " + safeName + "\n" +
    "📱 *Контакт:* `" + safeContact + "`\n" +
    "🌐 *Сайт:* " + safeSource + "\n" +
    "🎯 *Формат:* " + safeService + "\n" +
    "🌍 *Часовой пояс:* " + safeTimezone + "\n" +
    "💬 *Запрос:*\n_" + safeRequest + "_\n\n" +
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
    source: "Wellness",
    id: "ND-TEST-001",
    date: Utilities.formatDate(new Date(), "Europe/Belgrade", "dd.MM.yyyy HH:mm"),
    name: "Тестовый Клиент",
    contact: "@telegram_user / +7 (999) 000-00-00",
    service: "Консультация (100 €)",
    timezone: "Москва (UTC+3)",
    request: "Проверка связки сайта, Google Таблицы и Telegram-бота."
  });
}

function escapeMd(text) {
  if (!text) return "";
  return String(text).replace(/([_*`\[])/g, "\\$1");
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
