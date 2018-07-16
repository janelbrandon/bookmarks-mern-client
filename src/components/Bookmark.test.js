import React from 'react'
import Bookmark from './Bookmark'
import renderer from 'react-test-renderer'

describe('Bookmark', () => {
  it('should render as expected', () => {
    const tree = renderer.create(
      <Bookmark _id='123' title='My Bookmark' url='http://mybookmark.com' remove={ () => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
