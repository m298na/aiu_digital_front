export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    (typeof window === "undefined"
      ? process.env.APP_URL?.replace(/\/$/, "") || "http://127.0.0.1:3847"
      : "")
  );
}

export function oidcConfigured(): boolean {
  return Boolean(
    process.env.AUTH_OIDC_ISSUER &&
      process.env.AUTH_OIDC_CLIENT_ID &&
      process.env.AUTH_OIDC_CLIENT_SECRET,
  );
}

export function allowDevLogin(): boolean {
  return (
    process.env.AUTH_ALLOW_DEV_LOGIN === "true" ||
    (!oidcConfigured() && process.env.NODE_ENV !== "production")
  );
}
