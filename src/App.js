import React, { Component, Fragment } from 'react';
import './App.css';
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import store from './store'
import {fetchBookmarks} from './services/BookmarkService'
import BookmarksList from './components/BookmarksList'

class App extends Component {

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  setBookmarksAction = (bookmarks) => {
    return {
      type: 'set_bookmarks',
      bookmarks: bookmarks
    }
  }

  setLoginErrorAction (loginError) {
    return {
      type: 'set_loginError',
      loginError: loginError
    }
  }

  deleteBookmarksAction (id) {
    return {
      type: 'delete_bookmark',
      id: id
    }
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
      fetchBookmarks()
    } catch (error) {
      store.dispatch(this.setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(this.setBookmarksAction([]))
    })
  }

  // remove = (id) => { // id = Mongo _id of the bookmark
  //   removeBookmark(id)
  // }

  render() {
    const tokenDetails = this.token && decodeJWT(this.token)
    return (
      <div className="App">

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
                  <h4>Welcome { tokenDetails.email }!</h4>
                  <p>You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
                  <p>Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
                  <button onClick={this.handleSignOut}>Logout</button>
                  <BookmarksList bookmarks={store.getState().bookmarks}/>
                </Fragment>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            </Fragment>
        </Router>
      </div>
    );
  }

  componentDidMount() {
    if (this.token) {
      setJwt(this.token)
      fetchBookmarks()
    }
  }

}


export default App;
