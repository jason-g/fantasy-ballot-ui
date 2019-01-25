import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { UserActionTypes } from './types'
import { login, logout, editUser, signup, loginSuccess, error} from './actions'
import { callLogin } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleLogin(user: any) {
  try {
    const res = yield call(callLogin, user.username, user.password )
    if (res.error) {
      yield put(error(res.error))
    } else {
      yield put(loginSuccess(res))
    }
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

function* entriesSaga() {
  yield all([fork(watchLoginRequest)])
}

export default entriesSaga