// localStorage service

/* 
    localStorage:
    {
        suggestions: "word1,word2,..."
    }
*/

const key = 'suggestion'

const setStorage = (suggest) => {
  if (localStorage.getItem(key)) {
    let val = localStorage.getItem(key)
    val = val.split(',')
    val = new Set([...val, suggest])
    val = Array.from(val)

    localStorage.setItem(key, val)
  } else {
    localStorage.setItem(key, suggest)
  }
}

const getStorage = () => {
  if (localStorage.getItem(key)) {
    const val = localStorage.getItem(key)
    return val.split(',')
  } else {
    return
  }
}

const clearStorage = () => localStorage.clear()

 
// eslint-disable-next-line import/no-anonymous-default-export
export default { setStorage, getStorage, clearStorage }
