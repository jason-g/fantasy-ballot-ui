import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { NavigationActionTypes } from './types'
import { navigate } from './actions';
import history from '../../components/history'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

function* handleNavigate(page: string) {
  console.log('reouting back or some shit');
  return {};
}

function* watchNavigateRequest() {
  yield takeEvery(NavigationActionTypes.NAVIGATE, handleNavigate,)
}

function* navigateSaga() {
  yield all([fork(watchNavigateRequest)])
}

export default navigateSaga