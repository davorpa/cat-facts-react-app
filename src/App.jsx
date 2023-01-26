import { useState } from 'react'

function App() {
  const [fact, setFact] = useState('Lorem ipsum cat fact whatever')

  return (
    <main className="App">
      <header>
        <h1>Cat Facts</h1>
      </header>
      <section>
        <p>{fact}</p>
      </section>
    </main>
  )
}

export default App
