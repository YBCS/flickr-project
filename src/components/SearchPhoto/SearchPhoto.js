import './SearchPhoto.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchPhoto = () => {
  const [flicks, setFlicks] = useState([])
  const [search, setSearch] = useState('')

  const urlParams = {
    api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
    extras: 'url_n,url_m,url_c,url_l,url_h,url_o',
    format: 'json',
    per_page: '10',
    nojsoncallback: '1',
  }

  let url =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent'
  url = Object.keys(urlParams).reduce((acc, item) => {
    return acc + '&' + item + '=' + urlParams[item]
  }, url)
  console.log('url is ', url)
  useEffect(() => {
    axios.get(url).then((response) => {
      setFlicks(response.data.photos.photo)
    })
  }, [url])

  const handleCLick = (e) => {
    console.log('search bar clicked!', e)
    // implements past suggestions here
    // store value in browser
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    // pass this to the api
    // bind it to a value
  }

  return (
    <>
      <div className="Src">
        <h3 id="word">Search Photos</h3>
        <input
          placeholder="keyword here"
          value={search}
          onClick={handleCLick}
          onChange={handleSearchChange}
        />
      </div>
      {/* add suggestions in dropdown */}
      <div>
        {flicks.map((flick) => (
          <img
            src={flick.url_n}
            alt={flick.title}
            key={flick.id}
            className="Image"
          />
        ))}
      </div>
    </>
  )
}

export default SearchPhoto
