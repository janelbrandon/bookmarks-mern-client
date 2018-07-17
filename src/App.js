import React, { Component, Fragment } from 'react';
import './App.css';
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import store from './store'
import BookmarkList from './components/BookmarkList'
import {setBookmarksAction,setLoginErrorAction} from './actions'

class App extends Component {

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
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setBookmarksAction([]))
    })
  }

  remove = (id) => { // id = Mongo _id of the bookmark
      const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
      if (index >= 0) {
        const bookmarks = [...store.getState().bookmarks]
        bookmarks.splice(index, 1)
        store.dispatch(setBookmarksAction(bookmarks))
      }
  }

  render() {
    const tokenDetails = this.token && decodeJWT(this.token)
    const { bookmarks } = store.getState()
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
                  <h4>Welcome { tokenDetails.email }!</h4>
                  <p>You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
                  <p>Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
                  <button onClick={this.handleSignOut}>Logout</button>
                  <BookmarkList bookmarks={bookmarks} remove={this.remove} />
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
      store.dispatch(setBookmarksAction(bookmarks.data))
    }
    catch(error) {
      alert('Can\'t get bookmarks!')
    }
  }
}


export default App;
