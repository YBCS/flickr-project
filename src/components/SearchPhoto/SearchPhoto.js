import './SearchPhoto.css'
import React, { useState, useEffect } from 'react'

const SearchPhoto = () => {
    const [search, setSearch] = useState('')

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
      <div className='Src'>
        <h3 id='word'>Search Photos</h3>
        <input 
        placeholder='keyword here'
        value={search}
        onClick={handleCLick}
        onChange={handleSearchChange}
        />
      </div>
      // add suggestions in dropdown
    )
  }

export default SearchPhoto
