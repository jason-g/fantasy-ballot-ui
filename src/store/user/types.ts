export interface User {
  id?: number | null,
  token?: string | null,
  userId?: number | null,
  username?: string,
  password?: string,
  authenticated: boolean,
}

export enum UserActionTypes {
  LOGIN = '@@user/LOGIN',
  LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
  LOGOUT = '@@user/LOGOUT',
  EDIT = '@@user/EDIT',
  SIGNUP = '@@user/SIGNUP',
  SIGNUP_SUCCESS = '@@user/SIGNUP_SUCCESS',
  LOGIN_ERROR = '@@user/LOGIN_ERROR',
  ERROR = '@@user/ERROR',
  ADD_TOKEN = '@@user/ADD_TOKEN',
}

export interface UserState {
  readonly id: number | null,
  readonly token: string | null,
  readonly userId: number | null,
  readonly authenticated: boolean,
  readonly username: string,
  readonly message?: any,
}