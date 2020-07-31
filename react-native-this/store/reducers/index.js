
const initialState = {
  userName: '',
  board: [],
  initialBoard: [],
  message: '',
  change: false
}

function Reducers(state = initialState, action) {
  const {type, payload} = action
  if(type === 'SET_USERNAME') {
    return {...state, userName: payload}
  } else if(type === 'SET_BOARD') {
    return {...state, board: payload}
  } else if(type === 'SET_INITIALBOARD') {
    return {...state, initialBoard: payload}
  } else if(type === 'SET_MESSAGE') {
    return {...state, message: payload}
  } else if(type === 'SET_CHANGE') {
    return {...state, change: payload}
  }
  return state
}

export default Reducers