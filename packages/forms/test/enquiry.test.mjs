import test from "node:test";
import assert from "node:assert/strict";
import { handleEnquiry } from "../src/index.mjs";

function formRequest(kind = "wellness", overrides = {}) {
  const base =
    kind === "wellness"
      ? {
          locale: "en",
          name: "Test Person",
          email: "person@example.test",
          language: "en",
          timezone: "Europe/Belgrade",
          service: "consultation",
          delivery: "online",
          request: "A short non-sensitive request",
          adultConfirmed: "yes",
          consent: "yes",
          "cf-turnstile-response": "token",
        }
      : {
          locale: "ru",
          name: "Тест",
          organisation: "Организация",
          role: "Руководитель",
          email: "person@example.test",
          language: "ru",
          projectType: "research",
          intendedResult: "Аналитический отчёт",
          audience: "Команда",
          timeline: "Q1",
          budgetRange: "by-proposal",
          consent: "yes",
          "cf-turnstile-response": "token",
        };
  const body = new FormData();
  for (const [key, value] of Object.entries({ ...base, ...overrides })) body.set(key, value);
  return new Request("https://site.invalid/api/enquiry", { method: "POST", body });
}

function fetchOk(url) {
  if (String(url).includes("siteverify")) {
    return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
  }
  return Promise.resolve(new Response(JSON.stringify({ id: "email" }), { status: 200 }));
}

const env = {
  TURNSTILE_SECRET_KEY: "secret",
  RESEND_API_KEY: "resend",
  FORM_FROM_EMAIL: "site@example.test",
  FORM_TO_EMAIL: "owner@example.test",
  ENQUIRY_RATE_LIMITER: { limit: async () => ({ success: true }) },
};

test("accepts a valid Wellness enquiry and returns the English auto-reply state", async () => {
  const response = await handleEnquiry(formRequest(), env, "wellness", fetchOk);
  assert.equal(response.status, 202);
  assert.match((await response.json()).message, /not a confirmed booking/i);
});

test("accepts a valid Science enquiry and returns the Russian auto-reply state", async () => {
  const response = await handleEnquiry(formRequest("science"), env, "science", fetchOk);
  assert.equal(response.status, 202);
  assert.match((await response.json()).message, /не подтвержд/iu);
});

test("rejects a missing adult confirmation", async () => {
  const response = await handleEnquiry(
    formRequest("wellness", { adultConfirmed: "" }),
    env,
    "wellness",
    fetchOk,
  );
  assert.equal(response.status, 422);
});

test("rejects a missing language choice", async () => {
  const response = await handleEnquiry(
    formRequest("wellness", { language: "" }),
    env,
    "wellness",
    fetchOk,
  );
  assert.equal(response.status, 422);
});

test("accepts a honeypot submission without sending any email", async () => {
  let resendCalls = 0;
  const countingFetch = async (url) => {
    if (String(url).includes("siteverify")) {
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    }
    resendCalls += 1;
    return Promise.resolve(new Response(JSON.stringify({ id: "email" }), { status: 200 }));
  };
  const response = await handleEnquiry(
    formRequest("wellness", { website: "spam.example" }),
    env,
    "wellness",
    countingFetch,
  );
  assert.equal(response.status, 202);
  assert.equal(resendCalls, 0);
});

test("rejects non-POST requests", async () => {
  const response = await handleEnquiry(
    new Request("https://site.invalid/api/enquiry", { method: "GET" }),
    env,
    "wellness",
    fetchOk,
  );
  assert.equal(response.status, 405);
});

test("rejects the submission when Turnstile verification fails", async () => {
  const blockedFetch = async (url) => {
    if (String(url).includes("siteverify")) {
      return new Response(JSON.stringify({ success: false }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: "email" }), { status: 200 });
  };
  const response = await handleEnquiry(formRequest(), env, "wellness", blockedFetch);
  assert.equal(response.status, 403);
});

test("returns 429 when the edge rate limiter rejects a repeated submission", async () => {
  const limitedEnv = {
    ...env,
    ENQUIRY_RATE_LIMITER: { limit: async () => ({ success: false }) },
  };
  const response = await handleEnquiry(formRequest(), limitedEnv, "wellness", fetchOk);
  assert.equal(response.status, 429);
});

test("reports a Resend failure without exposing provider details", async () => {
  const failedFetch = async (url) => {
    if (String(url).includes("siteverify")) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response("provider detail", { status: 500 });
  };
  const response = await handleEnquiry(formRequest(), env, "wellness", failedFetch);
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /provider detail/i);
});
