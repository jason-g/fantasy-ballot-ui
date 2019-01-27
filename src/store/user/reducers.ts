import { Reducer } from 'redux'
import { UserState, UserActionTypes } from './types'

const user: string | null = localStorage.getItem('user');
const username = (user)? localStorage.getItem('username') : null;

const initialState: UserState = {
    id: (user)? JSON.parse(user).id :  null,
    token: (user)? JSON.parse(user).token :  null,
    userId: (user)? JSON.parse(user).userId :  null,
    authenticated: false,
    username: '',
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
                userId: null,
                username: '',
                authenticated: false,
            }
        }
        case UserActionTypes.SIGNUP: {
            return { ...state, loading: true }
        }
        case UserActionTypes.LOGIN_SUCCESS: {
            localStorage.setItem('user', JSON.stringify(action.payload));
            console.log('Login Success:');
            console.dir(action);
            return {
                ...state,
                loading: false,
                authenticated: true,
                token: action.payload.token,
                id: action.payload.id,
                userId: action.payload.userId,
                username: action.payload.username,
            }
        }
        case UserActionTypes.LOGIN_ERROR: {
            console.log('000');
            console.dir(action.payload);
            return { ...state, loading: false, message: action.payload }
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