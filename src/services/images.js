import { FetchError } from '../errors/FetchError'

export function getRandomImageUrlWith(
  { fact, size = 100 } = {},
  { signal } = {}
) {
  const sayText = fact.split(/\s/g, 5).join(' ') + '...'

  return fetch(
    `https://cataas.com/cat/says/${encodeURIComponent(
      sayText
    )}?type=sq&width=640&json=true`,
    { signal }
  )
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
