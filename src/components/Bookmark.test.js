import React from 'react'
import Bookmark from './Bookmark'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import sinon from 'sinon'

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

  it('should call remove with correct argument when delete button is clicked', () => {
    const _id='123'
    const removeBookmarkStub = jest.fn((id) => {
      console.log(`in removeBookmarkStub with ${id}`)
      return id
    })

    const wrapper = shallow (
      <Bookmark _id={_id} title='My bookmark' url='http://bookmark.com' remove={removeBookmarkStub} />
    )

    let btn = wrapper.find('button')
    expect(btn).toHaveLength(1)
    expect(btn.text()).toEqual('Delete!')
    btn.prop('onClick')()
    //btn.simulate('click')
    //expect(removeBookmarkStub).not.toHaveBeenCalled()
    expect(removeBookmarkStub).toBeCalledWith(_id)
  })

  it('should call removeBookmark in BookmarkService', () => {
    const _id='123'
    const wrapper = shallow (
      <Bookmark _id={_id} title='My bookmark' url='http://bookmark.com'  />
    )

    let btn = wrapper.find('button')
    expect(btn).toHaveLength(1)
    expect(btn.text()).toEqual('Delete!')
    btn.prop('onClick')()
  })
})
