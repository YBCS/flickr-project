import React, { useState } from 'react'
import SearchPhoto from '../SearchPhoto/SearchPhoto'

const Header = ({ text }) => {
  const [search, setSearch] = useState('')
  const handleCLick = (e) => {
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <h1>{text}</h1>
      <div className="Src">
        <h3 id="word">Search Photos</h3>
        <input
          placeholder="keyword here"
          value={search}
          onClick={handleCLick}
          onChange={handleSearchChange}
        />
      </div>
      <SearchPhoto search={search} />
    </>
  )
}

export default Header
