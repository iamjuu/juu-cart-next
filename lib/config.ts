import { assertValue } from "./utils";

export const STRIPE_WEBHOOK_SECRET = assertValue(
  process.env.STRIPE_WEBHOOK_SECRET,
  "Missing environment variable: STRIPE_WEBHOOK_SECRET"
);

export const NEXT_PUBLIC_BASE_URL = assertValue(
  process.env.NEXT_PUBLIC_BASE_URL,
  "Missing environment variable: NEXT_PUBLIC_BASE_URL"
); 