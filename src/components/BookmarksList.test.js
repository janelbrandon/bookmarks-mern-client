import React from 'react'
import BookmarksList from './BookmarksList'
import renderer from 'react-test-renderer'


describe('BookmarksList', () => {
  it('should render as we expect', () => {
    const tree = renderer.create(
    <BookmarksList bookmarks={[{_id:'123',title:'My Bookmark',url:'http://mybookmark.com'}]}/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
