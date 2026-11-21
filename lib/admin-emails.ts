/** Server-side allowlist of admin emails (env `ADMIN_EMAIL`, comma-separated). */
export function normalizeEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase();
}

export function isAdminEmail(email: string | null | undefined) {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean)
    .includes(normalized);
}
