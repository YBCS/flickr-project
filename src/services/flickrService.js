// flickr api service
import axios from 'axios'

const baseUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos'

const baseUrlParams = {
  api_key: 'a10d89eaa8a7d185645ffb45cb6a91a6',
  extras: 'url_n,url_m,url_c,url_l,url_h,url_o,url_t,url_s,url_q',
  format: 'json',
  nojsoncallback: '1',
}

const processUrl = (url, params) => {
  return Object.keys(params).reduce((acc, item) => {
    return acc + '&' + item + '=' + params[item]
  }, url)
}

const getRecent = () => {
  /*
    query the recents api
    check below for more
    https://www.flickr.com/services/api/flickr.photos.getRecent.html  
  */  
  let url = `${baseUrl}.getRecent`
  url = processUrl(url, baseUrlParams)

  const request = axios.get(url)
  return request.then((res) => res.data.photos.photo)
}

const getSearch = (search) => {
  /*
    query the search api
    check below for more
    https://www.flickr.com/services/api/flickr.photos.search.htm
  */
  // get a deepcopy
  let searchUrlParams = JSON.parse(JSON.stringify(baseUrlParams))
  searchUrlParams.text = `${search}`
  searchUrlParams.safe_search = '3'

  let url = `${baseUrl}.search`
  url = processUrl(url, searchUrlParams)

  const request = axios.get(url)
  return request.then((res) => res.data.photos)
}

const loadSearch = (search, page) => {
  let searchUrlParams = JSON.parse(JSON.stringify(baseUrlParams))
  searchUrlParams.text = `${search}`
  searchUrlParams.safe_search = '3'
  searchUrlParams.page = `${page + 1}`

  let url = `${baseUrl}.search`
  url = processUrl(url, searchUrlParams)

  const request = axios.get(url)
  return request.then((res) => res.data.photos)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getRecent, getSearch, loadSearch }
