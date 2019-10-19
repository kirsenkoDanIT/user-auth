import axios from 'axios';

import * as CONST from './constants.js';

import { take, put, all } from 'redux-saga/effects';

export const clearErrors = () => ({
  type: CONST.CLEAR_ERRORS
});

export const createUser = user => ({
  type: CONST.REGISTRATION,
  user
});

export const login = user => ({
  type: CONST.LOGIN,
  user
});

export const logout = () => ({
  type: CONST.LOGOUT
});

export const fetchUser = () => ({
  type: CONST.FETCH_USER
});

export const fetchUsers = () => ({
  type: CONST.FETCH_USERS
});

function* createUserSaga() {
  while (true) {
    try {
      const { user } = yield take(CONST.REGISTRATION);
      const response = yield axios.post('/register', user);
      localStorage.setItem('token', response.data.token);
      yield put({
        type: CONST.REGISTRATION_SUCCESS,
        payload: { token: response.data.token, user: response.data.user }
      });
    } catch (error) {
      yield put({
        type: CONST.REGISTRATION_FAIL,
        payload: error.response.data.message
      });
    }
  }
}

function* loginUserSaga() {
  while (true) {
    try {
      const { user } = yield take(CONST.LOGIN);
      const response = yield axios.post('/login', user);
      localStorage.setItem('token', response.data.token);
      yield put({
        type: CONST.LOGIN_SUCCESS,
        payload: { token: response.data.token, user: response.data.user }
      });
    } catch (error) {
      yield put({
        type: CONST.LOGIN_FAIL,
        payload: error.response.data.message
      });
    }
  }
}

function* fetchUserSaga() {
  while (true) {
    try {
      yield take(CONST.FETCH_USER);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      if (token) {
        config.headers['x-auth-token'] = token;
      }
      const response = yield axios.get(`/user`, config);
      yield put({
        type: CONST.FETCH_USER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      yield put({
        type: CONST.FETCH_USER_FAIL,
        payload: error.response.data.message
      });
    }
  }
}

function* fetchUsersSaga() {
  while (true) {
    try {
      yield take(CONST.FETCH_USERS);
      const response = yield axios.get(`/users`);

      yield put({
        type: CONST.FETCH_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* rootSaga() {
  yield all([
    createUserSaga(),
    fetchUserSaga(),
    loginUserSaga(),
    fetchUsersSaga()
  ]);
}
