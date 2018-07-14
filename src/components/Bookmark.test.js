import React from 'react'
import Bookmark from './Bookmark'
import renderer from 'react-test-renderer'


describe('Bookmark', () => {
  it('should render as we expect', () => {
    const tree = renderer.create(
    <Bookmark _id='123' title='My bookmark' url='http://bookmark.com' remove={() =>{}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
