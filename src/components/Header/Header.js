import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import SearchPhoto from '../SearchPhoto/SearchPhoto'
import storageService from '../../services/storageService'

const Header = ({ text }) => {
  const [search, setSearch] = useState('')            /* current search value */
  const [suggestions, setsuggestions] = useState([])  /* list of suggestions */

  useEffect(() => {
    setsuggestions(storageService.getStorage())
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSuggestion = (sug) => {
    setSearch(sug)
  }

  const handleSuggestionClear = () => {
    storageService.clearStorage()
    setsuggestions(undefined)
  }

  const someStyle = {
    width: 400,
  }

  if (suggestions) {
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
            <InputGroup.Append>
              <DropdownButton id="dropdown-basic-button" title="Suggestions">
                {suggestions.map((sug, i) => (
                  <Dropdown.Item
                    href="#/action-1"
                    key={i}
                    onClick={() => handleSuggestion(sug)}
                  >
                    {sug}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item>
                  <Button
                    variant="outline-secondary"
                    onClick={handleSuggestionClear}
                  >
                    clear
                  </Button>
                </Dropdown.Item>
              </DropdownButton>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <SearchPhoto search={search} />
      </>
    )
  } else {
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
}

export default Header
