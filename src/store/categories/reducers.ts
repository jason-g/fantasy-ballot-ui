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
      return { ...state, loading: true }
    }
    case CategoriesActionTypes.FETCH_SUCCESS: {
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