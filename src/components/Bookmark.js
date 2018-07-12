import React from 'react'
import store from '../store'
import styled from 'styled-components'

const StyledBookmark = styled.div`

`

function Bookmark (props) {
  const { _id, title, url, remove } = props
  return (
    <StyledBookmark>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => store.dispatch({ type: 'delete_bookmark', id: _id }) }>Delete!</button>
    </StyledBookmark>
  )
}

export default Bookmark
