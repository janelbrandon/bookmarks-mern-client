import store from '../store'
import {setBookmarksAction} from '../actions'
import {api} from '../api/init'

const removeBookmark = (id) => { // id = Mongo _id of the bookmark
    console.log(`In the REAL removeBookmark with id: ${id}`)
    const {bookmarks} = store.getState()
    const index = bookmarks.findIndex(bookmark => bookmark._id === id)
    if (index >= 0) {
      api.delete(`/bookmarks/${id}`)
      bookmarks.splice(index, 1)
      store.dispatch(setBookmarksAction(bookmarks))
    }
}

export {removeBookmark}
