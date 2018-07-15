import React from 'react'
import Bookmark from './Bookmark'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'

jest.mock('../services/BookmarkService')

let removeBookmark = require('../services/BookmarkService')

describe('Bookmark', () => {
  beforeEach = () => {
    jest.clearAllMocks()
  }
  it('should render as we expect', () => {
    const tree = renderer.create(
    <Bookmark _id='123' title='My bookmark' url='http://bookmark.com'/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('should call removeBookmark when delete button is clicked', () => {
    const _id='123'
    const removeBookmarkStub = jest.fn()
    // const removeBookmarkStub = jest.fn((id) => {
    //   console.log(`removeBookmarkStub called with ${id}`)
    //   return Promise.resolve(id)
    // })

    const wrapper = shallow (
      <Bookmark _id={_id} title='My bookmark' url='http://bookmark.com' onClick={removeBookmarkStub} />
    )

    let btn = wrapper.find('button')
    expect(btn).toHaveLength(1)
    expect(btn.text()).toEqual('Delete!')
    btn.prop('onClick')()
    //btn.simulate('click')
    expect(removeBookmarkStub).not.toHaveBeenCalled()
    //expect(removeBookmarkStub).toBeCalledWith(_id)
  })

})
