import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { EntriesActionTypes } from './types'
import { fetchError, fetchSuccess, selectEntry } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/entries')

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

function* watchFetchRequest() {
  yield takeEvery(EntriesActionTypes.FETCH_REQUEST, handleFetch)
}

function* entriesSaga() {
  yield all([fork(watchFetchRequest)])
}

export default entriesSaga