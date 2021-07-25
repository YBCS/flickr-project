import './SearchPhoto.css'
import axios from 'axios'
import ImageModal from '../ImgModal/ImageModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useState, useEffect } from 'react'

const SearchPhoto = ({ search }) => {
  const [flicks, setFlicks] = useState([])
  const [searchvalue, setSearchValue] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [modalShow, setModalShow] = useState(false)
  const [modalPic, setModalPic] = useState([])


  const urlParams = {
    api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
    extras: 'url_n,url_m,url_c,url_l,url_h,url_o,url_t,url_s,url_q',
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

  useEffect(() => {
    const urlParams = {
      api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
      text: `${search}`,
      extras: 'url_n,url_m,url_c,url_l,url_h,url_o',
      format: 'json',
      nojsoncallback: '1',
    }

    let url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search'
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + '&' + item + '=' + urlParams[item]
    }, url)

    if (search) {
      console.log('search has some value')
      axios.get(url).then((response) => {
        setSearchValue(response.data.photos.photo)
        setTotal(response.data.photos.total)
        setPage(response.data.photos.page)
      })
    }
  }, [search])

  const fetchSearch = () => {
    // fetch new search results, as search value change

    const urlParams = {
      api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
      text: `${search}`,
      extras: 'url_n,url_m,url_c,url_l,url_h,url_o',
      format: 'json',
      page: `${page + 1}`,
      nojsoncallback: '1',
    }

    let url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search'
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + '&' + item + '=' + urlParams[item]
    }, url)

    if (searchvalue.length >= total) {
      // is this in the right place
      setHasMore(false)
    }
    setTimeout(() => {
      axios.get(url).then((response) => {
        setSearchValue(searchvalue.concat(response.data.photos.photo))
        setPage(response.data.photos.page)
      })
    }, 1500)
  }

  const handleModal = (pic) => {
    setModalPic(pic)
    setModalShow(true)
  }

  const imgUrlOptions = (pic) => {
    const final_url = pic.url_n || pic.url_s || pic.url_q || pic.url_t || pic.url_o
    return final_url
  } 

  const hideWhenFlicksLoaded = { display: flicks === [] ? '' : 'none' }

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
