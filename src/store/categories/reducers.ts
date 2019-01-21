import { Reducer } from 'redux';
import { CategoriesState, CategoriesActionTypes } from './types';

const initialState: CategoriesState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<CategoriesState> = (state = initialState, action) => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_REQUEST: {
        console.log('Fetching');
        console.dir(state);
      return { ...state, loading: true }
    }
    case CategoriesActionTypes.FETCH_SUCCESS: {
        console.log('Fectch success');
        console.dir(action);
      return { ...state, loading: false, data: action.payload }
    }
    case CategoriesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as categoriesReducer }