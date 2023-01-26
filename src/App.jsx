import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [fact, setFact] = useState()

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then((response) => response.json())
      .then((data) => setFact(data.fact))
  }, [])

  return (
    <main className="App">
      <header>
        <h1>Cat Facts</h1>
      </header>
      {fact && <p>{fact}</p>}
    </main>
  )
}

export default App
