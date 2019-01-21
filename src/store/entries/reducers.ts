import { Reducer } from 'redux'
import { EntriesState, EntriesActionTypes } from './types'

const initialState: EntriesState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<EntriesState> = (state = initialState, action) => {
  switch (action.type) {
    case EntriesActionTypes.FETCH_REQUEST:
    case EntriesActionTypes.SELECT_ENTRY: {
      return { ...state, loading: true }
    }
    case EntriesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case EntriesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case EntriesActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as entriesReducer }