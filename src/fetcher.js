import server from './server';

const headerData = { csrf: null };

export default async function fetcher(
  path = '',
  { headers = {}, ...options } = {}
) {
  const response = await fetch(`${server}/${path}`, {
    mode: 'cors',
    credentials: 'include',
    headers: { 'X-CSRF-Token': headerData.csrf, ...headers },
    ...options,
  });

  headerData.csrf = response.headers.get('CSRF-TOKEN') || headerData.csrf;
  return response;
}
