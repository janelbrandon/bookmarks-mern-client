import store from '../store'
import {setBookmarksAction} from '../actions'
import {api} from '../api/init'

const fetchBookmarks = async () => {
  try {
    const bookmarks = await api.get('/bookmarks')
    console.log(bookmarks.data)
    store.dispatch(setBookmarksAction(bookmarks.data))
  }
  catch(error) {
    alert(`Can't get bookmarks! Error: ${error}`)
  }
}

const removeBookmark = (id) =>  {
  const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
  if (index >= 0) {
    //ToDo: Add call to delete the bookmark from the server
    const bookmarks = [...store.getState().bookmarks]
    bookmarks.splice(index, 1)
    store.dispatch(setBookmarksAction(bookmarks))
  }
}

export {fetchBookmarks, removeBookmark}
