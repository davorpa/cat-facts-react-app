import { useEffect, useState } from 'react'
import { getNewRandomFact } from './services/facts'
import { getRandomImageUrlWith } from './services/images'

import './App.css'

function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    getNewRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (!fact) return
    getRandomImageUrlWith({ fact }).then(setImageUrl)
  }, [fact])

  const handleGetAnotherFactClick = (event) => {
    getNewRandomFact().then(setFact)
  }

  return (
    <main className="App">
      <header>
        <h1>Cat Facts</h1>
      </header>
      <button onClick={handleGetAnotherFactClick}>Get another fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img src={imageUrl} alt={`A fancy image with cats saying: ${fact}`} />
      )}
    </main>
  )
}

export default App
