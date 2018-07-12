import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import axios from 'axios'
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import Bookmark from './components/Bookmark'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import store from './store'
import styled, { injectGlobal, css } from 'styled-components'

const phone = (content) => css`
  @media (max-width: 800px) {
    ${content}
  }
`

const pad = (size=0.5) => css`
  padding: ${size}rem;
`

const border = css`
  border: 2px solid ${p => p.border || '#f00'};
`

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`

const Heading = styled.h4`
  ${border}
  ${pad()}
  ${phone`
    background: red;
  `}
`

const BlueHeading = Heading.extend`
  color: #00f;
  font-weight: 700;
`

injectGlobal`
  body {
    font-family: cursive;
  }
`

class App extends Component {
  // state = {
  //   bookmarks: [],
  //   loginError: null
  // }

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.token = response.data.token
      setJwt(response.data.token)
      this.fetchBookmarks()
      //this.forceUpdate()
    } catch (error) {
      store.dispatch({ type: 'set_loginError' , loginError: error.message })
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch({ type: 'set_bookmarks', bookmarks: [] })
      //this.forceUpdate()
    })
  }

  // remove = (id) => { // id = Mongo _id of the bookmark
  //     const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
  //     if (index >= 0) {
  //       const bookmarks = [...store.getState().bookmarks]
  //       bookmarks.splice(index, 1)
  //       store.dispatch({ type: 'set_bookmarks', bookmarks })
  //     }
  // }

  render() {
    console.log(store.getState())
    const tokenDetails = this.token && decodeJWT(this.token)
    // const { bookmarks } = store.getState()
    const { bookmarks } = store.getState() || []
    return (
      <div className="App">
      {
        <Router>
          <Fragment>
            <Route exact path="/login" render={(props) => {
              if (this.token) {
                return (<Redirect to="/bookmarks"/>)
              } else {
                return (<SignIn loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
              }
            }
            } />
            <Route exact path="/bookmarks" render={(props) => (
              this.token ? (
                <Fragment>
                  <StyledLink to="/bar">Hello!</StyledLink>
                  <BlueHeading border="#0f0">Welcome { tokenDetails.email }!</BlueHeading>
                  <p>You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
                  <p>Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
                  <button onClick={this.handleSignOut}>Logout</button>
                  <h1>Bookmarks</h1>
                  <ul>
                  {
                    bookmarks.map(
                      bookmark => <Bookmark key={bookmark._id} {...bookmark} />
                    )
                  }
                  </ul>
                </Fragment>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            </Fragment>
        </Router>
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.token) {
      setJwt(this.token)
      this.fetchBookmarks()
    }
  }

  async fetchBookmarks() {
    try {
      const bookmarks = await api.get('/bookmarks')
      // store.dispatch({ bookmarks: bookmarks.data })
      // Dispatch a set_bookmarks action to Redux
      store.dispatch({ type: 'set_bookmarks', bookmarks: bookmarks.data })
    }
    catch(error) {
      alert('Can\'t get bookmarks!')
    }
  }
}

export default App;
