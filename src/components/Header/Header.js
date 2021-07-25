import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState } from 'react'
import SearchPhoto from '../SearchPhoto/SearchPhoto'

const Header = ({ text }) => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const someStyle = {
    width: 400,
  }

  return (
    <>
      <h1>{text}</h1>
      <div className="Src">
        <h3 id="word">Search Photos</h3>
        <InputGroup className="mx-auto" style={someStyle}>
          <FormControl
            placeholder="Search Keyword~"
            aria-label="Search Keyword~"
            aria-describedby="basic-addon1"
            value={search}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </div>
      <SearchPhoto search={search} />
    </>
  )
}

export default Header
