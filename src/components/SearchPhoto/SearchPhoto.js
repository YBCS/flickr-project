import './SearchPhoto.css'
import flickrService from '../../services/flickrService'
import ImageModal from '../ImgModal/ImageModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useState, useEffect } from 'react'
import storageService from '../../services/storageService'

const SearchPhoto = ({ search }) => {
  // add some documentation
  const [flicks, setFlicks] = useState([]) /* flicker image data */
  const [hasMore, setHasMore] = useState(true) /* is there more data */
  const [modalPic, setModalPic] = useState([]) /* the pic for modal */
  const [modalShow, setModalShow] = useState(false) /* bool to show/hide modal*/
  const [page, setPage] = useState(0) /* page number of request */
  const [searchvalue, setSearchValue] = useState(
    []
  ) /* current value in search */
  const [total, setTotal] = useState(0) /* total number of pic */

  useEffect(() => {
    flickrService
      .getRecent()
      .then((response) => {
        setFlicks(response)
      })
      .catch((e) => console.error('error query get Recent api', e))
  }, [])

  useEffect(() => {
    if (search) {
      setTimeout(() => {
        flickrService
          .getSearch(search)
          .then((response) => {
            setSearchValue(response.photo)
            setTotal(response.total)
            setPage(response.page)
          })
          .catch((e) => console.error('error query Search api', e))
      }, 300)
    }
  }, [search])

  const fetchSearch = () => {
    // fetch new search results, as search value change

    if (searchvalue.length >= total) {
      // is this in the right place
      setHasMore(false)
    }
    setTimeout(() => {
      flickrService
        .loadSearch(search, page)
        .then((response) => {
          setSearchValue(searchvalue.concat(response.photo))
          setPage(response.page)
          setTotal(response.total)
        })
        .catch((e) => console.error('error query Search api fetch', e))
      // stored only when fetch is queried
      storageService.setStorage(search)
    }, 1500)
  }

  const handleModal = (pic) => {
    setModalPic(pic)
    setModalShow(true)
  }

  const imgUrlOptions = (pic) => {
    /* 
      image size options provided by api.
      Choose smaller size for less network overhead
    */
    const final_url =
      pic.url_n || pic.url_s || pic.url_q || pic.url_t || pic.url_o
    return final_url
  }

  const hideWhenFlicksLoaded = { display: flicks.length === 0 ? '' : 'none' }

  console.log('total right now is ', total)
  console.log('search right now is ', search)
  if (search !== '' && total !== 0) {
    return (
      <>
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
  } else if (search !== '' && total === 0) {
    console.log('render condition')
    return <h1>There are NO More Results!</h1>
  } else {
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
}

export default SearchPhoto
