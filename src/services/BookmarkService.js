import store from '../store'
import {setBookmarksAction} from '../actions'
import {api} from '../api/init'

async function fetchBookmarks () {
  try {
    const bookmarks = await api.get('/bookmarks')
    store.dispatch(setBookmarksAction(bookmarks.data))
  }
  catch(error) {
    alert(`Can't get bookmarks! Error: ${error}`)
  }
}

function removeBookmark (id)  {
  const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
  if (index >= 0) {
    //ToDo: Add call to delete the bookmark from the server
    const bookmarks = [...store.getState().bookmarks]
    bookmarks.splice(index, 1)
    store.dispatch(setBookmarksAction(bookmarks))
  }
}

export {fetchBookmarks, removeBookmark}
