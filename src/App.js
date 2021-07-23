import React, { useState, useEffect } from 'react'
import axios from "axios"
import Header from './components/Header/Header'
import SearchPhoto from './components/SearchPhoto/SearchPhoto';
import './App.css';

function App() {
  const [flicks, setFlicks] = useState([]) 

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL).then((response) => {
      setFlicks(response.data.photos.photo);
    });
  }, [])

  return (
    <div className="App">
      {/* let the search be inside Header component */}
      {/* let the image be rendered from inside the SearcPhoto component */}
      <Header text='ReactJS Assignment'/>
      <SearchPhoto />
      <div>
        {flicks.map((flick, i) => (
          <img 
          src={flick.url_n} 
          alt={flick.title} 
          key={flick.id}
          className='Image' 
          />
        ))}
      </div>
    </div>
  )
}

export default App;
