import { Reducer } from 'redux'
import { GlobalsState, GlobalsActionTypes } from './types'

const initialState: GlobalsState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<GlobalsState> = (state = initialState, action) => {
  switch (action.type) {
    case GlobalsActionTypes.FETCH_GLOBALS: {
      return { ...state, loading: true }
    }
    case GlobalsActionTypes.SET_GLOBALS: {
      return { ...state, loading: true }
    }
    case GlobalsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case GlobalsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as globalsReducer }