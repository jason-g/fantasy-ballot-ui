import { action } from 'typesafe-actions'
import { UserActionTypes, User } from './types'

export const login = (
    username: string,
    password: string
    ) => action(UserActionTypes.LOGIN)
export const signup = (
    username: string,
    password: string,
    email: string
    ) => action(UserActionTypes.SIGNUP)
export const logout = (id: number) => action(UserActionTypes.LOGOUT, id)
export const logoutSuccess = () => action(UserActionTypes.LOGOUT_SUCCESS)
export const error = (message: string) => action(UserActionTypes.ERROR, message)
export const loginSuccess = (message: string) => action(UserActionTypes.LOGIN_SUCCESS, message)
export const editSuccess = () => action(UserActionTypes.EDIT_SUCCESS)
export const loginError = (error: any) => action(UserActionTypes.LOGIN_ERROR, error)
export const getSuccess = (user: any) => action(UserActionTypes.GET_SUCCESS, user)
export const editUser = (id: number) => action(UserActionTypes.EDIT, id)
export const addToken = (user: any, redirect?: string) => action(UserActionTypes.ADD_TOKEN, user, redirect)
//ToDo - shape up these anys