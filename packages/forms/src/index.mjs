const MAX_FIELD_LENGTH = 4_000;

const copy = {
  ru: {
    accepted: "Спасибо. Заявка получена. Это ещё не подтверждённая запись.",
    invalid: "Проверьте обязательные поля формы.",
    blocked: "Не удалось проверить отправку. Обновите страницу и попробуйте снова.",
    failed: "Заявка не отправлена. Попробуйте позже.",
    subjectWellness: "Новая заявка Wellness",
    subjectScience: "Новый запрос Science",
    replySubject: "Мы получили ваше обращение",
    replyWellness:
      "Наталия ответит в течение трёх рабочих дней. Это письмо не подтверждает запись. Не отправляйте ответным письмом медицинские, платёжные или другие конфиденциальные материалы.",
    replyScience:
      "Наталия ответит в течение трёх рабочих дней. Это письмо не подтверждает принятие проекта. Не отправляйте ответным письмом рукописи, персональные данные участников исследования или конфиденциальные материалы.",
  },
  en: {
    accepted: "Thank you. Your enquiry has been received. This is not a confirmed booking.",
    invalid: "Please review the required form fields.",
    blocked: "We could not verify the submission. Refresh the page and try again.",
    failed: "The enquiry could not be sent. Please try again later.",
    subjectWellness: "New Wellness enquiry",
    subjectScience: "New Science enquiry",
    replySubject: "We received your enquiry",
    replyWellness:
      "Nataliia will respond within three working days. This email does not confirm a booking. Do not reply with medical, payment or other confidential information.",
    replyScience:
      "Nataliia will respond within three working days. This email does not confirm acceptance of a project. Do not reply with manuscripts, participant personal data or confidential material.",
  },
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function clean(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function required(values, fields) {
  return fields.every((field) => clean(values[field]).length > 0);
}

function normalise(formData) {
  return Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [key, clean(value)]),
  );
}

async function verifyTurnstile(token, secret, remoteIp, fetchImpl) {
  if (!token || !secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);
  const response = await fetchImpl(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}

function emailBody(kind, values) {
  const excluded = new Set(["website", "cf-turnstile-response", "consent", "adultConfirmed"]);
  const lines = Object.entries(values)
    .filter(([key, value]) => !excluded.has(key) && value)
    .map(([key, value]) => `${key}: ${value}`);
  return [`Site: ${kind}`, ...lines].join("\n");
}

async function sendEmail({ apiKey, from, to, replyTo, subject, text }, fetchImpl) {
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });
  return response.ok;
}

/**
 * Shared Cloudflare Pages Function handler. It stores nothing and sends only
 * the minimum enquiry data to the protected mailbox through Resend.
 */
export async function handleEnquiry(request, env, kind, fetchImpl = fetch) {
  if (request.method !== "POST") return json(405, { ok: false });

  let values;
  try {
    values = normalise(await request.formData());
  } catch {
    return json(400, { ok: false, message: copy.en.invalid });
  }

  const locale = values.locale === "en" ? "en" : "ru";
  const text = copy[locale];
  if (values.website) return json(202, { ok: true, message: text.accepted });

  const isOrganisation = kind === "wellness" && values.enquiryKind === "organisation";
  const requiredFields =
    isOrganisation
      ? ["organisation", "role", "email", "language", "request", "audience", "delivery", "timeline"]
      : kind === "wellness"
      ? ["name", "request"]
      : [
          "name",
          "organisation",
          "role",
          "email",
          "language",
          "projectType",
          "intendedResult",
          "audience",
          "timeline",
          "budgetRange",
        ];

  const contactProvided = clean(values.contact || values.email).length >= 3;
  const emailValid = values.email ? isEmail(values.email) : true;

  if (
    !required(values, requiredFields) ||
    !contactProvided ||
    !emailValid ||
    values.consent !== "yes" ||
    (kind === "wellness" && !isOrganisation && values.adultConfirmed !== "yes")
  ) {
    return json(422, { ok: false, message: text.invalid });
  }

  const ip = request.headers.get("cf-connecting-ip") || "anonymous";
  if (env.ENQUIRY_RATE_LIMITER) {
    const result = await env.ENQUIRY_RATE_LIMITER.limit({ key: `${kind}:${ip}` });
    if (!result.success) return json(429, { ok: false, message: text.blocked });
  }

  const turnstileOk = await verifyTurnstile(
    values["cf-turnstile-response"],
    env.TURNSTILE_SECRET_KEY,
    ip,
    fetchImpl,
  );
  if (!turnstileOk) return json(403, { ok: false, message: text.blocked });

  if (!env.RESEND_API_KEY || !env.FORM_FROM_EMAIL || !env.FORM_TO_EMAIL) {
    return json(503, { ok: false, message: text.failed });
  }

  const ownerSent = await sendEmail(
    {
      apiKey: env.RESEND_API_KEY,
      from: env.FORM_FROM_EMAIL,
      to: env.FORM_TO_EMAIL,
      replyTo: values.email,
      subject: kind === "wellness" ? text.subjectWellness : text.subjectScience,
      text: emailBody(kind, values),
    },
    fetchImpl,
  );
  if (!ownerSent) return json(502, { ok: false, message: text.failed });

  const replySent = await sendEmail(
    {
      apiKey: env.RESEND_API_KEY,
      from: env.FORM_FROM_EMAIL,
      to: values.email,
      replyTo: env.FORM_TO_EMAIL,
      subject: text.replySubject,
      text: kind === "wellness" ? text.replyWellness : text.replyScience,
    },
    fetchImpl,
  );
  if (!replySent) return json(502, { ok: false, message: text.failed });

  return json(202, { ok: true, message: text.accepted });
}
