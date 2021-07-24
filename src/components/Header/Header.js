import React from 'react'
import SearchPhoto from '../SearchPhoto/SearchPhoto'

const Header = ({ text }) => (
  <>
    <h1>{text}</h1>
    <SearchPhoto />
  </>
)

export default Header
