import { useEffect, useState } from 'react'
import { getNewRandomFact } from './services/facts'
import { getRandomImageUrlWith } from './services/images'

import './App.css'

function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    setError(null)
    getNewRandomFact()
      .then(setFact)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    setLoading(true)
    setError(null)
    getRandomImageUrlWith({ fact })
      .then(setImageUrl)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [fact])

  const handleGetAnotherFactClick = (event) => {
    if (loading) return
    setLoading(true)
    setError(null)
    getNewRandomFact()
      .then(setFact)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className="App">
      <header>
        <h1>Cat Facts</h1>
      </header>
      <button disabled={loading} onClick={handleGetAnotherFactClick}>
        Get another fact
      </button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img src={imageUrl} alt={`A fancy image with cats saying: ${fact}`} />
      )}
      {error && <p className="error">{error.message}</p>}
    </main>
  )
}

export default App
