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
import { userReducer } from './user/reducers'
import { UserState } from './user/types';
import userSaga from './user/sagas';
import { navigationReducer } from './navigation/reducers';
import { NavigationState } from './navigation/types';
import navigationSaga from './navigation/sagas';
import { globalsReducer } from './globals/reducers';
import { GlobalsState } from './globals/types';
import globalsSaga from './globals/sagas';
import { resultsReducer } from './results/reducers';
import { ResultsState } from './results/types';
import resultsSaga from './results/sagas';

// The top-level state object
export interface ApplicationState {
  categories: CategoriesState,
  entries: EntriesState,
  selections: SelectionsState,
  user: UserState,
  navigation: NavigationState,
  globals: GlobalsState,
  results: ResultsState,
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  categories: categoriesReducer,
  entries: entriesReducer,
  selections: selectionsReducer,
  user: userReducer,
  navigation: navigationReducer,
  globals: globalsReducer,
  results: resultsReducer,
})

export function* rootSaga() {
  yield all([fork(categoriesSaga), fork(entriesSaga), fork(selectionsSaga), fork(userSaga), fork(navigationSaga), fork(globalsSaga), fork(resultsSaga)])
}