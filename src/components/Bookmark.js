import React from 'react'
import {removeBookmark} from '../services/BookmarkService'

function Bookmark (props) {
  const { _id, title, url, remove } = props

  return (
    <li>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => remove ? remove(_id) : removeBookmark(_id) }>Delete!</button>
    </li>
  )
}

export default Bookmark
