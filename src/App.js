import React from 'react'
import Header from './components/Header/Header'
import './App.css'

function App() {
  return (
    <div className="App">
      {/* let the search be inside Header component */}
      {/* let the image be rendered from inside the SearcPhoto component */}
      <Header text="ReactJS Assignment" />
    </div>
  )
}

export default App
