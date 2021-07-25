import './SearchPhoto.css'
import flickrService from '../../services/flickrService'
import ImageModal from '../ImgModal/ImageModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useState, useEffect } from 'react'

const SearchPhoto = ({ search }) => {
  const [flicks, setFlicks] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [modalPic, setModalPic] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [page, setPage] = useState(0)
  const [searchvalue, setSearchValue] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    flickrService.getRecent().then((response) => {
      setFlicks(response)
    }).catch(e => console.error('error query get Recent api',e))
  }, [])

  useEffect(() => {
    if (search) {
      flickrService.getSearch(search).then((response) => {
        setSearchValue(response.photo)
        setTotal(response.total)
        setPage(response.page)
      }).catch(e => console.error('error query Search api',e))
    }
  }, [search])

  const fetchSearch = () => {
    // fetch new search results, as search value change

    if (searchvalue.length >= total) {
      // is this in the right place
      setHasMore(false)
    }
    setTimeout(() => {
      flickrService.loadSearch(search, page).then((response) => {
        setSearchValue(searchvalue.concat(response.photo))
        setPage(response.page)
      }).catch(e => console.error('error query Search api fetch',e))
    }, 1500)
  }

  const handleModal = (pic) => {
    setModalPic(pic)
    setModalShow(true)
  }

  const imgUrlOptions = (pic) => {
    const final_url =
      pic.url_n || pic.url_s || pic.url_q || pic.url_t || pic.url_o
    return final_url
  }

  const hideWhenFlicksLoaded = { display: flicks.length === 0 ? '' : 'none' }

  if (search !== '') {
    return (
      <>
        <p> {search} </p>
        <InfiniteScroll
          dataLength={searchvalue.length}
          next={fetchSearch}
          hasMore={hasMore}
          loader={<h4>Loading ...</h4>}
        >
          {searchvalue.map((src) => (
            <img
              src={imgUrlOptions(src)}
              alt={src.title}
              key={src.id}
              className="Image"
              onClick={() => handleModal(src)}
            />
          ))}
        </InfiniteScroll>
        <ImageModal
          pic={modalPic}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    )
  }
  return (
    <>
      <div style={hideWhenFlicksLoaded}>
        <h4>Loading...</h4>
      </div>
      {flicks.map((flick) => (
        <img
          src={imgUrlOptions(flick)}
          alt={flick.title}
          key={flick.id}
          className="Image"
          onClick={() => handleModal(flick)}
        />
      ))}
      <ImageModal
        pic={modalPic}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default SearchPhoto
