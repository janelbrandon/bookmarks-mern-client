import React from 'react'
import SignIn from './SignIn'
import renderer from 'react-test-renderer'

describe('SignIn', () => {
  it('should render as expected', () => {
    const tree = renderer.create(
      <SignIn handleSignIn={ () => {} } loginError='There was an error'/>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
