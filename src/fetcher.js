import server from './server';

const headerData = { csrf: null };

function duration(milliseconds, promise) {
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Timed out. Please try again.')),
      milliseconds
    )
  );

  return Promise.race([promise, timeout]);
}

export default async function fetcher(
  path = '',
  { headers = {}, ...options } = {}
) {
  let response;
  try {
    response = await duration(
      5000,
      fetch(`${server}/${path}`, {
        mode: 'cors',
        credentials: 'include',
        headers: { 'X-CSRF-Token': headerData.csrf, ...headers },
        ...options,
      })
    );
  } catch (err) {
    throw new Error('Sorry, something went wrong.');
  }

  if (response.status !== 200) throw new Error('Sorry, something went wrong.');

  headerData.csrf = response.headers.get('CSRF-TOKEN') || headerData.csrf;
  return response;
}
