export const fetcher = (url) => fetch(url).then((r) => r.json());

export const postFetcher = (url, body) =>
  fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
