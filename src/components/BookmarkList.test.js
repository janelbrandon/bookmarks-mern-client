import React from 'react'
import BookmarkList from './BookmarkList'
import renderer from 'react-test-renderer'


describe('BookmarksList', () => {
  it('should render as we expect', () => {
    const tree = renderer.create(
    <BookmarkList bookmarks={[{_id:'123',title:'My Bookmark',url:'http://mybookmark.com'}]} remove={() => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
