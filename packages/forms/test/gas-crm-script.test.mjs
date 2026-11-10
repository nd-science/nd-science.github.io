import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../gas_crm_script.js", import.meta.url), "utf8");

function createRuntime({ turnstileSuccess = true } = {}) {
  const rows = [];
  const cache = new Map();
  const calls = [];
  const sheet = {
    appendRow(row) { rows.push(row); },
    getLastRow() { return rows.length + 1; },
    getRange() { return { setVerticalAlignment() {}, setValues() {}, setFontWeight() {}, setBackground() {}, setFontColor() {}, setHorizontalAlignment() {}, setWrapStrategy() {}, setDataValidation() {} }; },
    setColumnWidth() {}, setRowHeight() {}, setFrozenRows() {}, setName() {},
  };
  const context = {
    JSON,
    Date,
    Math,
    String,
    Number,
    RegExp,
    console: { error() {}, warn() {} },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput(body) { return { body, setMimeType() { return this; } }; } },
    HtmlService: { createHtmlOutput(body) { return { body }; } },
    PropertiesService: { getScriptProperties() { return { getProperty(key) { return ({ TURNSTILE_SECRET_KEY: "test-secret", TELEGRAM_BOT_TOKEN: "token", TELEGRAM_CHAT_ID: "1" })[key] || ""; } }; } },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest() { return [1, 2, 3]; },
      formatDate() { return "09.11.2026 12:00"; },
    },
    UrlFetchApp: {
      fetch(url, options = {}) {
        calls.push({ url: String(url), options });
        if (String(url).includes("siteverify")) return { getResponseCode: () => 200, getContentText: () => JSON.stringify({ success: turnstileSuccess, hostname: "wellnessnd.github.io" }) };
        return { getResponseCode: () => 200, getContentText: () => "{}" };
      },
    },
    CacheService: { getScriptCache() { return { get: (key) => cache.get(key) || null, put: (key, value) => cache.set(key, value) }; } },
    LockService: { getScriptLock() { return { tryLock: () => true, releaseLock() {} }; } },
    SpreadsheetApp: { getActiveSpreadsheet() { return { getSheetByName: () => sheet, getActiveSheet: () => sheet }; }, newDataValidation() { return { requireValueInList() { return this; }, setAllowInvalid() { return this; }, build() { return {}; } }; } },
  };
  vm.runInNewContext(source, context, { filename: "gas_crm_script.js" });
  const post = (data) => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(data) } }).body);
  return { calls, context, post, rows };
}

function wellnessPayload(overrides = {}) {
  return {
    site: "wellness", locale: "en", name: "TEST — DO NOT CONTACT", contact: "test@example.test",
    request: "Automated verification only", adultConfirmed: "yes", consent: "yes",
    "cf-turnstile-response": "test-token", ...overrides,
  };
}

test("Apps Script stores a verified Wellness form and sends its notification", () => {
  const runtime = createRuntime();
  const result = runtime.post(wellnessPayload());
  assert.equal(result.ok, true);
  assert.equal(runtime.rows.length, 1);
  assert.match(runtime.rows[0][3], /TEST/);
  assert.equal(runtime.calls.filter((call) => call.url.includes("siteverify")).length, 1);
  const telegram = runtime.calls.find((call) => call.url.includes("api.telegram.org"));
  assert.ok(telegram);
  assert.match(JSON.parse(telegram.options.payload).text, /\*Сайт:\* Wellness/);
});

test("Apps Script ignores a filled honeypot without CRM or Telegram side effects", () => {
  const runtime = createRuntime();
  const result = runtime.post(wellnessPayload({ website: "bot.example" }));
  assert.equal(result.ok, true);
  assert.equal(runtime.rows.length, 0);
  assert.equal(runtime.calls.length, 0);
});

test("Apps Script blocks an invalid Turnstile response before CRM or Telegram", () => {
  const runtime = createRuntime({ turnstileSuccess: false });
  const result = runtime.post(wellnessPayload());
  assert.equal(result.ok, false);
  assert.equal(runtime.rows.length, 0);
  assert.equal(runtime.calls.filter((call) => call.url.includes("api.telegram.org")).length, 0);
});

test("Apps Script identifies Science as the source in Telegram notifications", () => {
  const runtime = createRuntime();
  runtime.context.notifyTelegram({
    source: "Science", id: "ND-TEST-002", date: "09.11.2026 12:00", name: "Test", contact: "test@example.test",
    service: "Science: research", timezone: "Timeline", request: "Verification",
  });
  const telegram = runtime.calls.find((call) => call.url.includes("api.telegram.org"));
  assert.ok(telegram);
  assert.match(JSON.parse(telegram.options.payload).text, /\*Сайт:\* Science/);
});
