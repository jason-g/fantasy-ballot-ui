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
        call(callApi, 'get', API_ENDPOINT, '/selections/results')
    ]);
    const results = yield normalieIt(categories, selections.getResults);
    yield put(fetchSuccess(results))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}
function normalieIt(categories: Category[], selections: Selection[]) {
    let mergeByCategory: any = {};
    let winnersMap: any = {};
    let tmpMergeByUser: any = {};
    let mergeByUser: any = {};
    let labelsCat: any[] = [];
    let dataCat: any[] = [];
    let labelsUser: any[] = [];
    let dataUser: any[] = [];
    categories.map((category: Category) => 
        {
            let winners = selections.filter((selection) => {
                if (selection.category_id == category.category_id &&
                    selection.entry_id == category.winner) {
                        return true
                    }
            });
            category.winners = winners;
            winnersMap[category.category_id] = category.winner;
            labelsCat.push(category.display_name);
            dataCat.push(winners.length);
        }
    );
    mergeByCategory = {
        labels: labelsCat,
        data: dataCat,
    }
    // seed the users
    selections.forEach(function (selection) {
        let uname = selection.username;
        if (uname) {
            if (!tmpMergeByUser[uname]) {
                tmpMergeByUser[uname] = 0;
            }
            const cat_id = selection.category_id;
            const ent_id = selection.entry_id;
            if (winnersMap[cat_id] == ent_id) {
                tmpMergeByUser[uname]++;
            }
        }
    });
    Object.keys(tmpMergeByUser).map(function(userKey) {
        if (userKey && (userKey != undefined)) {
            labelsUser.push(userKey);
            dataUser.push(tmpMergeByUser[userKey]);
        }
    });
    mergeByUser = {
        labels: labelsUser,
        data: dataUser,
    }
    return ({"byCategory": mergeByCategory, "byUser": mergeByUser});
}



function* watchFetchRequest() {
  yield takeEvery(ResultsActionTypes.FETCH_RESULTS, handleFetch)
}

function* resultsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default resultsSaga