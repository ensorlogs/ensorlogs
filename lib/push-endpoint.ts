/** Only real browser push services may receive server-side web-push requests. */
const PUSH_HOSTS = [
  "fcm.googleapis.com",
  "updates.push.services.mozilla.com",
  "web.push.apple.com",
];
const PUSH_HOST_SUFFIXES = [".notify.windows.com"];

export function isAllowedPushEndpoint(endpoint: string) {
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) {
    return false;
  }
  const host = url.hostname.toLowerCase();
  return (
    PUSH_HOSTS.includes(host) ||
    PUSH_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))
  );
}
