import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';
import { UserActionTypes } from './types'
import { login, logout, editUser, signup, loginSuccess, loginError, error} from './actions'
import { callLogin, callLogout, callSignup } from '../../utils/api'
import history from '../../components/history'
import { render } from 'react-dom';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleLogin(user: any) {
  try {
    console.log('Attempting to log in: '+user.username);
    const res = yield call(callLogin, user.username, user.password )
    if (JSON.parse(res).error) {
      yield put(error(res.error))
      console.log('Login unsuccesful');
      const err = JSON.parse(res);
      yield put(loginError(err));
      console.dir(err);
    } else {
      localStorage.setItem('username',user.username);
      localStorage.setItem('user', res);
      let tmpUser = JSON.parse(res);
      tmpUser.username = user.username;
      yield put(loginSuccess(tmpUser));
      console.log('Login succesful');
      history.push('/ballot');
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(error(err.stack!))
    } else {
      yield put(error('An unknown error occured.'))
    }
  }
}

function* handleSignup(user: any) {
  try {
    console.log('Attempting to Signup: '+user.username);
    const res = yield call(callSignup, user.username, user.password, user.email )
    if (JSON.parse(res).error) {
      //yield put(error(res.error))
      console.log('Signup unsuccesful');
      yield put(loginError(JSON.parse(res)));
    } else {
      localStorage.setItem('username',user.username);
      yield put(loginSuccess(res));
      console.log('Signup succesful');
      //yield history.push('/login');
      //yield put(push('/login'));
      history.push('/login');
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(error(err.stack!))
    } else {
      yield put(error('An unknown error occured.'))
    }
  }
}

function* handleLogout() {
  try {
    console.log('Attempting to log out');
    // fire and forget logout
    yield call(callLogout);
    yield localStorage.clear();
    console.log('Logged out');
    history.push('/login');
  } catch (err) {
    if (err instanceof Error) {
      yield put(error(err.stack!))
    } else {
      yield put(error('An unknown error occured.'))
    }
  }
}

function* watchLoginRequest() {
  yield takeEvery(UserActionTypes.LOGIN, handleLogin,)
}

function* watchSignupRequest() {
  yield takeEvery(UserActionTypes.SIGNUP, handleSignup,)
}

function* watchLogoutRequest() {
  yield takeEvery(UserActionTypes.LOGOUT, handleLogout,)
}

function* entriesSaga() {
  yield all([
    fork(watchLoginRequest), 
    fork(watchLogoutRequest),
    fork(watchSignupRequest),
  ])
}

export default entriesSaga