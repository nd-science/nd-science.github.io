import { handleEnquiry } from "@natali/forms";
export async function onRequestPost({ request, env }) { return handleEnquiry(request, env, "science"); }
