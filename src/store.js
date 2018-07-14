import { createStore } from "redux"

const initialState = {
  token: null,
  bookmarks: [],
  loginError: null
}

const reducer = (state, action) => {
  switch (action.type) {
  		case "set_bookmarks":
        return {...state, bookmarks: action.bookmarks }
      case "delete_bookmark":
        const index = state.bookmarks && state.bookmarks.findIndex(bookmark => bookmark._id === action.bookmark_id)
        if (state.bookmarks && index >= 0) {
          // TODO: Delete from server
          const newstate = {...state}
          newstate.bookmarks.splice(index, 1)
          return newstate
        } else {
          return state
        }
      case "set_loginError":
        return {...state, loginError: action.error }
      case "reset_state":
        return initialState
  		default:
        if ( !action.type.match(/@@redux.*/) ) {
          console.log(`Redux: Action not recognized: ${action.type}`)
      }
  		  return state
  }
}

export default createStore(reducer, initialState)
