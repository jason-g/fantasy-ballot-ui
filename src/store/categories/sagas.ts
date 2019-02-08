import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CategoriesActionTypes, Category } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi, selectWinner } from '../../utils/api'

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

function* handleSelectWinner(action: any) {
  const category = action.category;
  const dbid = category.id;
  let category_id = category.category_id;
  let winner_id = category.winner;
  if (!category_id || !dbid || !winner_id) {
    // missing setdata
    console.log('invalid winner selection');
    return; 
  }
  try {
    const res = yield call(selectWinner, category)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      const reget = yield call(callApi, 'get', API_ENDPOINT, '/categories')
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
  yield takeEvery(CategoriesActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchSelectWinner() {
  yield takeEvery(CategoriesActionTypes.SELECT_WINNER, handleSelectWinner)
}

function* categoriesSaga() {
  yield all([fork(watchFetchRequest), fork(watchSelectWinner)])
}

export default categoriesSaga