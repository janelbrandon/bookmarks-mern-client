import { createStore } from 'redux'

const deleteBookmark = (state, action) => {
  const index = state.bookmarks.findIndex(bookmark => bookmark._id === action.id)
  if (index >= 0) {
    // TODO: Remove from API
    const newBookmarks = [...state.bookmarks]
    newBookmarks.splice(index, 1)
    return {...state, bookmarks: newBookmarks}
  }
  return state
}

const initialState = {
  bookmarks: [],
  loginError: null
}

// Define reducers
// Redux will invoke the reducers whenever an action is dispatched
const reducer = (state, action) => {
  // Accepts the current state and an action
  // Returns the new state
  switch (action.type) {
    case 'set_bookmarks':
      return {...state, bookmarks: action.bookmarks}
    case 'set_loginError':
      return {...state, loginError: action.loginError}
    case 'delete_bookmark':
      return deleteBookmark(state, action)
    default:
      console.log(`Redux reducer: Action ${action.type} does not exist!`)
      return state
  }
}

// Create and export a new Redux store
export default createStore(reducer, initialState)
