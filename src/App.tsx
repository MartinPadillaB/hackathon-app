import './App.css'

function App() {
  throw new Error('Intentional crash for testing')

  return (
    <main className="app">
      <h1>Hello Hackathon Project Finder</h1>
      <p>The React + TypeScript app is initialized and ready for feature work.</p>
    </main>
  )
}

export default App
