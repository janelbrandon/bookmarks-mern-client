import React from 'react'
import Bookmark from './Bookmark'
import {removeBookmark} from '../services/BookmarkService'

export default (props) => {
  const {bookmarks} = props
  return (
    <div className="bookmarkList">
      <h1>Bookmarks</h1>
      <ul> {
       bookmarks.map(
        bookmark => <Bookmark key={bookmark._id} {...bookmark} remove={removeBookmark} />
      )}
      </ul>
    </div>
  )
}
