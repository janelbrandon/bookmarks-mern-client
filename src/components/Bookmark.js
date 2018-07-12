import React from 'react'
import store from '../store'
import styled from 'styled-components'

const StyledBookmark = styled.li`
  list-style: none;
  font-size: 1.5rem;
  padding: 1rem 0;
  margin: 0;
`

const Link = styled.a`
  color: red;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: green;
  }
`

const Button = styled.button`
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  display: inline-block;
  margin-left: 1rem;
  color: red;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background: yellow;
  }
`

function Bookmark (props) {
  const { _id, title, url, remove } = props
  return (
    <StyledBookmark>
      {title} (<Link href={url} target="_blank">Visit</Link>)
      <Button onClick={ () => store.dispatch({ type: 'delete_bookmark', id: _id }) }>Delete!</Button>
    </StyledBookmark>
  )
}

export default Bookmark
