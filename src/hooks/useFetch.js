import { useEffect, useState } from 'react'
import { FetchError } from '../errors/FetchError'

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    // create a new Controller to can abort fetched request
    const { signal, abort } = new AbortController()
    fetch(
      url,
      // provide the abort signal so the fetch knows whatever have to abort
      { ...options, signal }
    )
      .then((response) => {
        // control response errors
        if (!response.ok) {
          throw new FetchError({
            status: response.status ?? 500,
            statusText: response.statusText ?? 'An error has ocurred'
          })
        }
        // parse response to JSON
        return response.json()
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          // bypass AbortErrors since there are controlled
          console.debug('fetch aborted. URL=' + url)
          return
        }
        setError(error)
      })
      .finally(() => setLoading(false))
    // provide an unmount callback, aborting any request in course
    return () => abort()
  }, [url, options])

  return {
    data,
    loading,
    error
  }
}
