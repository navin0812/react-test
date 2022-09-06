async function fetcher(url, params = "") {
  const ConstructUrl = `${url}/${params}`;
  const response = await fetch(ConstructUrl);
  const data = await response.json();
  return data;
}

async function list() {
  const fetch = await fetcher(`https://swapi.dev/api/films`);
  return fetch;
}

async function get({queryKey}) {
  const [_key, { id }] = queryKey
  const fetch = await fetcher(`https://swapi.dev/api/films`, id);
  return fetch;
}

export { list, get };
