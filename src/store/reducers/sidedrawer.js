import * as actionTypes from '../actions/actionTypes'

const initialState = { showSidedrawer: false }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEDRAWER:
      return { showSidedrawer: !state.showSidedrawer }
    default:
      return state
  }
}

export default reducer
