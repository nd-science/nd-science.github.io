export interface RateLimiterBinding {
  limit(input: { key: string }): Promise<{ success: boolean }>;
}

export interface EnquiryEnvironment {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  FORM_FROM_EMAIL?: string;
  FORM_TO_EMAIL?: string;
  ENQUIRY_RATE_LIMITER?: RateLimiterBinding;
}

export function handleEnquiry(
  request: Request,
  env: EnquiryEnvironment,
  kind: "wellness" | "science",
  fetchImpl?: typeof fetch,
): Promise<Response>;
