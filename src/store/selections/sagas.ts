import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { SelectionsActionTypes } from './types'
import { fetchError, fetchSuccess, selectSelection } from './actions'
import { callApi, makeSelection } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/selections')

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
function* handlePost(selection: any) {
  let category_id = selection.category_id;
  let entry_id = selection.entry_id;
  let id = selection.id || undefined;
  try {
    const res = yield call(makeSelection, category_id, entry_id, id)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      const reget = yield call(callApi, 'get', API_ENDPOINT, '/selections')
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
  yield takeEvery(SelectionsActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchPostRequest() {
  yield takeEvery(SelectionsActionTypes.SELECT_ENTRY, handlePost)
}

function* selectionsSaga() {
  yield all([fork(watchFetchRequest), fork(watchPostRequest)])
}

export default selectionsSaga