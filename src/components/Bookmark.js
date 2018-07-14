import React from 'react'
import {removeBookmark} from '../services/BookmarkService'

function Bookmark (props) {
  const { _id, title, url } = props
  return (
    <li>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => removeBookmark(_id) }>Delete!</button>
    </li>
  )
}

export default Bookmark
