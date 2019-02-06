import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GlobalsActionTypes } from './types'
import { fetchError, fetchSuccess, setGlobals } from './actions'
import { callApi, saveGlobals } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleFetch() {
  console.log('handle fetch of globals');
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/globals')

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

/* JDG: This should probably be done better
*/
function* handlePost(global: any) {
  try {
    const res = yield call(saveGlobals, global)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      const reget = yield call(callApi, 'get', API_ENDPOINT, '/globals')
      yield put(fetchSuccess(reget))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(GlobalsActionTypes.FETCH_GLOBALS, handleFetch)
}

function* watchPostRequest() {
  yield takeEvery(GlobalsActionTypes.SET_GLOBALS, handlePost)
}

function* selectionsSaga() {
  yield all([fork(watchFetchRequest), fork(watchPostRequest)])
}

export default selectionsSaga