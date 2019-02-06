import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ResultsActionTypes, Results, ByUserType, ByCategoryType } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi, selectWinner } from '../../utils/api'
import { Category } from '../categories/types';
import { Selection } from '../selections/types';

//const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/'
const API_ENDPOINT = ''

// fetch categories and selections and cobine/normalize
function* handleFetch() {
  try {
    const  [categories, selections ] = yield all([
        call(callApi, 'get', API_ENDPOINT, '/categories'), 
        call(callApi, 'get', API_ENDPOINT, '/selections')
    ]);
    const results = yield normalieIt(categories,selections);
    yield put(fetchSuccess(categories))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}
function normalieIt(categories: Category[], selections: Selection[]) {
    let mergeByCategory = categories.map((category: Category) => 
        {
            let winners = selections.filter((selection) => {
                if (selection.category_id == category.category_id &&
                    selection.entry_id == category.winner) {
                        return true
                    }
            });
            category.winners = winners;
        }
    );
    
    let mergeByUser: ByUserType[] = [];

    return ([mergeByCategory, mergeByUser]);
}



function* watchFetchRequest() {
  yield takeEvery(ResultsActionTypes.FETCH_RESULTS, handleFetch)
}

function* resultsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default resultsSaga