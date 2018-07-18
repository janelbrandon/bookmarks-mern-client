import React from 'react'
import Bookmark from './Bookmark'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

jest.mock('../services/BookmarkService')

let {removeBookmark} = require('../services/BookmarkService')

describe('Bookmark', () => {
  it('should render as expected', () => {
    const tree = renderer.create(
      <Bookmark _id='123' title='My Bookmark' url='http://mybookmark.com' remove={ () => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
  it('should call remove with the correct argument', () => {
      const _id='123'
      const removeStub = jest.fn((id) => {
        console.log(`in removeStub mock function with id: ${id}`)
      })

      const wrapper = shallow (
        <Bookmark _id={_id} title="My Bookmark" url="http://mybookmark.com" remove={removeStub}/>
      )

      let btn = wrapper.find('button')
      expect(btn.text()).toEqual('Delete')
      //btn.simulate('click')
      btn.prop('onClick')()
      expect(removeStub).toBeCalledWith(_id)
      expect(removeStub).toHaveBeenCalledTimes(1)
  })

  it('should call removeBookmark in BookmarkService with the correct arg', () => {
    const _id='123'
      const wrapper = shallow (
        <Bookmark _id={_id} title="My Bookmark" url="http://mybookmark.com" remove={removeBookmark}/>
      )

      let btn = wrapper.find('button')
      expect(btn.text()).toEqual('Delete')
      //btn.simulate('click')
      btn.prop('onClick')()
  })
})
