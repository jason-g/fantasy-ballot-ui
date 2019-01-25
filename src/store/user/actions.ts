import { action } from 'typesafe-actions'
import { UserActionTypes, User } from './types'

export const login = (username: string, password: string) => action(UserActionTypes.LOGIN)
export const signup = () => action(UserActionTypes.SIGNUP)
export const logout = (id: number) => action(UserActionTypes.LOGOUT, id)
export const error = (message: string) => action(UserActionTypes.ERROR, message)
export const loginSuccess = (message: string) => action(UserActionTypes.LOGIN_SUCCESS, message)
export const editUser = (id: number) => action(UserActionTypes.EDIT, id)