import React from 'react'
import Bookmark from './Bookmark'

export default (props) => {
  const {bookmarks} = props
  return (
    <div className="bookmarksList">
      <h1>Bookmarks</h1>
      <ul> {
       bookmarks.map(
        bookmark => <Bookmark key={bookmark._id} {...bookmark}/>
      )}
      </ul>
    </div>
  )
}
