import { FetchError } from '../errors/FetchError'

export function getRandomImageUrlWith(
  { fact, size = 640 } = {},
  // request options
  { signal } = {}
) {
  let endpointUrl = 'https://cataas.com/cat'
  if (fact) {
    const text = fact.split(' ', 5).join(' ') + '...'
    endpointUrl += '/says/' + encodeURIComponent(text)
  }

  return fetch(`${endpointUrl}?type=sq&width=${size}&json=true`, { signal })
    .then((response) => {
      if (!response.ok) {
        throw new FetchError({
          status: response.status ?? 500,
          statusText: response.statusText ?? 'An error has ocurred'
        })
      }
      return response.json()
    })
    .then(({ url }) => 'https://cataas.com' + url)
}
