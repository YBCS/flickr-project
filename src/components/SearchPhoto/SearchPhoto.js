import './SearchPhoto.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SearchPhoto = ({ search }) => {
  const [flicks, setFlicks] = useState([])

  const urlParams = {
    api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
    extras: 'url_n,url_m,url_c,url_l,url_h,url_o',
    format: 'json',
    nojsoncallback: '1',
  }

  let url =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent'
  url = Object.keys(urlParams).reduce((acc, item) => {
    return acc + '&' + item + '=' + urlParams[item]
  }, url)
  useEffect(() => {
    axios.get(url).then((response) => {
      setFlicks(response.data.photos.photo)
    })
  }, [url])

  const hideWhenFlicksLoaded = { display: flicks === [] ? '' : 'none' }
  return (
    <>
      <div style={hideWhenFlicksLoaded}>
        <h4>Loading...</h4>
      </div>
      {flicks.map((flick) => (
        <img
          src={flick.url_n}
          alt={flick.title}
          key={flick.id}
          className="Image"
        />
      ))}
    </>
  )
}

export default SearchPhoto
