import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CategoriesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi } from '../../utils/api'

//const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/'
const API_ENDPOINT = ''

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/categories')

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
  yield takeEvery(CategoriesActionTypes.FETCH_REQUEST, handleFetch)
}

function* categoriesSaga() {
  yield all([fork(watchFetchRequest)])
}

export default categoriesSaga