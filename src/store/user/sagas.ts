import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { UserActionTypes } from './types'
import { login, logout, editUser, signup, loginSuccess, loginError, error} from './actions'
import { callLogin, callLogout, callSignup, callEditUser, callResetPassword, callRequestChange } from '../../utils/api'
import history from '../../components/history'
import { isAuthenticated } from '../../utils/auth';

function* handleLogin(user: any) {
  try {
    const res = yield call(callLogin, user.username, user.password )
    if (JSON.parse(res).error) {
      yield put(error(res.error))
      const err = JSON.parse(res);
      yield put(loginError(err));
    } else {
      localStorage.setItem('username',user.username);
      localStorage.setItem('user', res);
      let tmpUser = JSON.parse(res);
      tmpUser.username = user.username;
      yield put(loginSuccess(tmpUser));
      console.log('login redirect');
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
    const res = yield call(callSignup, user.username, user.password, user.email )
    if (JSON.parse(res).error) {
      yield put(loginError(JSON.parse(res)));
    } else {
      localStorage.setItem('username',user.username);
      //ToDo: signupSuccess
      yield put(loginSuccess(res));
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

function* handleRequestChange(user: any) {
  try {
    const email = user.email;
    const res = yield call(callRequestChange, email );
    if ( res && JSON.parse(res).error) {
      yield put(loginError(JSON.parse(res)));
    } else {
      //ToDo: resetSuccess &  Fail
      yield put(loginSuccess(res));
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

function* handleResetPassword(user: any) {
  try {
    const res = yield call(callResetPassword, user.token, user.password );
    if ( res && JSON.parse(res).error) {
      yield put(loginError(JSON.parse(res)));
    } else {
      //ToDo: resetSuccess
      yield put(loginSuccess(res));
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
function* handleEdit(user: any) {
  try {
    const res = yield call(callEditUser, user.id, user.username, user.password, user.email )
    if (JSON.parse(res).error) {
      yield put(loginError(JSON.parse(res)));
    } else {
      localStorage.setItem('username',user.username);
      let localUser = localStorage.getItem('user');
      let tmpUser;
      if (localUser) {
        tmpUser = JSON.parse(localUser);
      }
      let tmpUser2 = JSON.parse(res);
      if (tmpUser2.username) {
        tmpUser.username = tmpUser2.username;
      }
      localStorage.setItem('user', tmpUser);
      yield put(loginSuccess(tmpUser));
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
    // fire and forget logout
    yield call(callLogout);
    yield localStorage.clear();
    history.push('/login');
  } catch (err) {
    if (err instanceof Error) {
      yield put(error(err.stack!))
    } else {
      yield put(error('An unknown error occured.'))
    }
  }
}

function* handleAddToken(action: any) {
  yield call(isAuthenticated);
  //ToDo
  //console.log('addToken redirect: ' + action.redirect);
  //console.dir(action.redirect);
  const redirect = (action.redirect)? action.redirect : '/ballot';
  history.push(redirect);
}

function* watchLoginRequest() {
  yield takeEvery(UserActionTypes.LOGIN, handleLogin,)
}

function* watchSignupRequest() {
  yield takeEvery(UserActionTypes.SIGNUP, handleSignup,)
}

function* watchRequestChange() {
  yield takeEvery(UserActionTypes.REQUEST_CHANGE, handleRequestChange,)
}

function* watchResetPassword() {
  yield takeEvery(UserActionTypes.RESET_PASSWORD, handleResetPassword,)
}

function* watchEditRequest() {
  yield takeEvery(UserActionTypes.EDIT, handleEdit,)
}

function* watchLogoutRequest() {
  yield takeEvery(UserActionTypes.LOGOUT, handleLogout,)
}

function* watchAddTokenRequest() {
  yield takeEvery(UserActionTypes.ADD_TOKEN, handleAddToken,)
}

function* entriesSaga() {
  yield all([
    fork(watchLoginRequest), 
    fork(watchLogoutRequest),
    fork(watchSignupRequest),
    fork(watchEditRequest),
    fork(watchRequestChange),
    fork(watchResetPassword),
    fork(watchAddTokenRequest),
  ])
}

export default entriesSaga