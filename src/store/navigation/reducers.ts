import { Reducer } from 'redux';
import { NavigationState, NavigationActionTypes } from './types';

const initialState: NavigationState = {
    page: '/login',
}

const reducer: Reducer<NavigationState> = (state = initialState, action) => {
    switch (action.type) {
        case NavigationActionTypes.NAVIGATE: {
            return { page: action.page }
        }
        default: {
            return state
        }
    }
}

export { reducer as navigationReducer }