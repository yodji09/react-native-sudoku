import axios from 'axios';
const SET_USERNAME = 'SET_USERNAME';
const SET_BOARD = 'SET_BOARD';
const SET_INITIALBOARD = 'SET_INITIALBOARD';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_CHANGE = 'SET_CHANGE'

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}
export const setChange = change => {
  return {
    type: SET_CHANGE,
    payload: change
  }
}

export const setInitialBoard = data => {
  return {
    type: SET_INITIALBOARD,
    payload: data
  }
}

export const setBoard = data => {
  return {
    type: SET_BOARD,
    payload: data
  }
}

export const setUserName = data => {
  return {
    type: SET_USERNAME,
    payload: data
  }
}

function Encode(data) {
  const encodeBoard = (data) => data.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === data.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) =>
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
  return (encodeParams(data))
}

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const asyncResponse = await axios({
        url: 'https://sugoku.herokuapp.com/board?difficulty=random',
        method: 'GET'
      })
      const {data} = asyncResponse
      dispatch(setBoard(data.board))
      const value = data.board.map(row => [...row])
      dispatch(setInitialBoard(value))

    } catch (error) {
      dispatch(setMessage('Ada Error :p'))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000);
    }
  }
}

export const fetchDataSolve = board => {
  return async (dispatch) => {
    try {
      const asyncResponse = await axios({
        url: 'https://sugoku.herokuapp.com/solve',
        method: 'POST',
        data: Encode({board}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const {data} = asyncResponse
      dispatch(setBoard(data.solution))
      dispatch(setMessage(data.status))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000);

    } catch (error) {
      if (error) dispatch(setMessage('Ada Error :p'))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000);
    }
  }
}

export const handleDataSubmit = board => {
  return async (dispatch) => {
    try {
      const asyncResponse = await axios({
        url: 'https://sugoku.herokuapp.com/validate',
        method: 'POST',
        data: Encode({board})
      })
      const {data} = asyncResponse
      dispatch(setMessage(data.status))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000);

    } catch (error) {
      dispatch(setMessage('Ada Error :p'))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000);
    }
  }
}