import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'

import categoriesSaga from './categories/sagas'
import { categoriesReducer } from './categories/reducers'
import { CategoriesState } from './categories/types'
import entriesSaga from './entries/sagas'
import { EntriesState } from './entries/types'
import { entriesReducer } from './entries/reducers'
import { selectionsReducer } from './selections/reducers'
import { SelectionsState } from './selections/types';
import selectionsSaga from './selections/sagas';

// The top-level state object
export interface ApplicationState {
  categories: CategoriesState
  entries: EntriesState
  selections: SelectionsState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = combineReducers<ApplicationState>({
  categories: categoriesReducer,
  entries: entriesReducer,
  selections: selectionsReducer,
})

export function* rootSaga() {
  yield all([fork(categoriesSaga), fork(entriesSaga), fork(selectionsSaga)])
}