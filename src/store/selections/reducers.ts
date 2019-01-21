import { Reducer } from 'redux'
import { SelectionsState, SelectionsActionTypes } from './types'
import { addSelection } from '../../utils/api'
import { resolve } from 'url';

const initialState: SelectionsState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<SelectionsState> = (state = initialState, action) => {
  switch (action.type) {
    case SelectionsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case SelectionsActionTypes.SELECT_ENTRY: {
      return { ...state, loading: true }
    }
    case SelectionsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case SelectionsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as selectionsReducer }