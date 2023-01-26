import { useEffect, useState } from 'react'
import { getNewRandomFact } from './services/facts'

import './App.css'

function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    getNewRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (!fact) return

    const sayText = fact.split(/\s/g, 5).join(' ') + '...'
    fetch(
      `https://cataas.com/cat/says/${encodeURIComponent(sayText)}?json=true`
    )
      .then((response) => response.json())
      .then(({ url }) => setImageUrl('https://cataas.com' + url))
  }, [fact])

  return (
    <main className="App">
      <header>
        <h1>Cat Facts</h1>
      </header>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img src={imageUrl} alt={`A fancy image with cats saying: ${fact}`} />
      )}
    </main>
  )
}

export default App
