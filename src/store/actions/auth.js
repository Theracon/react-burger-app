import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return { type: actionTypes.AUTH_START }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId,
  }
}

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error }
}

export const authLogout = () => {
  return { type: actionTypes.AUTH_LOGOUT }
}

export const logout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, SignUpMode) => {
  return (dispatch) => {
    dispatch(authStart())
    const API_KEY = 'AIzaSyDTIReasTXB5gCJfQXtZwzWluCF6ZVlvMw'
    const URL = SignUpMode
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    axios
      .post(`${URL}?key=${API_KEY}`, userData)
      .then((response) => {
        dispatch(authSuccess(response.data))
        dispatch(logout(response.data.expiresIn))
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error))
      })
  }
}
