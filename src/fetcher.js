const headerData = { csrf: null };

export default async function fetcher(url, { headers = {}, ...options } = {}) {
  const response = await fetch(url, {
    mode: 'cors',
    credentials: 'include',
    headers: { 'X-CSRF-Token': headerData.csrf, ...headers },
    ...options,
  });

  headerData.csrf = response.headers.get('CSRF-TOKEN') || headerData.csrf;
  return response;
}
