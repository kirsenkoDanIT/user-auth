import { combineReducers } from 'redux';
import * as CONST from './constants.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
  message: null,
  users: null
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CONST.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true
      };
    case CONST.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload
      };
    case CONST.REGISTRATION_SUCCESS:
    case CONST.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuth: true
      };
    case CONST.LOGOUT:
    case CONST.FETCH_USER_FAIL:
    case CONST.LOGIN_FAIL:
    case CONST.REGISTRATION_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: null,
        user: null,
        message: payload
      };

    case CONST.CLEAR_ERRORS:
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  userReducer
});
