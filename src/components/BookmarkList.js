import React from 'react'
import Bookmark from './Bookmark'

export default (props) => {
  const {bookmarks} = props
  const {remove} = props
  return (
    <div className="bookmarkList">
      <h1>Bookmarks</h1>
      <ul> {
       bookmarks.map(
        bookmark => <Bookmark key={bookmark._id} {...bookmark} remove={remove} />
      )}
      </ul>
    </div>
  )
}
