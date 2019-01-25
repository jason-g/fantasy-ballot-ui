import { Reducer } from 'redux'
import { UserState, UserActionTypes } from './types'

const initialState: UserState = {
    id: null,
    token: null,
    userId: null,
}

const reducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.LOGIN: {
            return { ...state, loading: true }
        }
        case UserActionTypes.EDIT: {
            return { ...state, loading: true }
        }
        case UserActionTypes.LOGOUT: {
            return {
                id: null,
                token: null,
                userId: null
            }
        }
        case UserActionTypes.SIGNUP: {
            return { ...state, loading: true }
        }
        case UserActionTypes.LOGIN_SUCCESS: {
            localStorage.setItem('user', action.payload);
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                id: action.payload.id,
                userId: action.payload.userId
            }
        }
        case UserActionTypes.ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as userReducer }