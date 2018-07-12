import React from 'react'
import store from '../store'

function Bookmark (props) {
  const { _id, title, url, remove } = props
  return (
    <div>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => store.dispatch({ type: 'delete_bookmark', id: _id }) }>Delete!</button>
    </div>
  )
}

export default Bookmark
