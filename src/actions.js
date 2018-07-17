//Actions used by redux
function setBookmarksAction (bookmarks) {
  return {
    type: 'set_bookmarks',
    bookmarks: bookmarks
  }
}

function setLoginErrorAction (loginError) {
  return {
    type: 'set_loginError',
    loginError: loginError
  }
}

function deleteBookmarkAction (id) {
  return {
    type: 'delete_bookmark',
    id: id
  }
}

export {setBookmarksAction, setLoginErrorAction, deleteBookmarkAction}
