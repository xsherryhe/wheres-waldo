export function CSRFToken(cookies) {
  return cookies
    .split('; ')
    .find((cookie) => cookie.startsWith('CSRF-TOKEN'))
    .slice(11);
}
