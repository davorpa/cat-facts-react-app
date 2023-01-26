import { FetchError } from '../errors/FetchError'

export function getNewRandomFact({ signal } = {}) {
  return fetch('https://catfact.ninja/fact', { signal })
    .then((response) => {
      if (!response.ok) {
        throw new FetchError({
          status: response.status ?? 500,
          statusText: response.statusText ?? 'An error has ocurred'
        })
      }
      return response.json()
    })
    .then(({ fact }) => fact)
}
