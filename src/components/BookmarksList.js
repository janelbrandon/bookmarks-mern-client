import React from 'react'
import Bookmark from './Bookmark'
import {removeBookmark} from '../services/BookmarkService'

export default (props) => {
  const {bookmarks} = props
  return (
    <div className="bookmarksList">
      <h1>Bookmarks</h1>
      <ul> {
       bookmarks.map(
        bookmark => <Bookmark key={bookmark._id} {...bookmark} remove={remove}/>
      )}
      </ul>
    </div>
  )
}

const remove = (id) => {
  removeBookmark(id)
}
