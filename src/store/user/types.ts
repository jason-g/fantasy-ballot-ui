export interface User {
  id?: number | null,
  token?: string | null,
  userId?: number | null,
  username?: string,
  password?: string,
  email?: string,
  roles?: string[],
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
  RESET_PASSWORD = '@@user/RESET_PASSWORD',
  REQUEST_CHANGE = '@@user/REQUEST_CHANGE',
  ERROR = '@@user/ERROR',
  ADD_TOKEN = '@@user/ADD_TOKEN',
}

export interface UserState {
  readonly id: number | null,
  readonly token: string | null,
  readonly userId: number | null,
  readonly email?: string | null,
  readonly authenticated: boolean,
  readonly username: string,
  readonly password?: string,
  readonly roles: string[],
  readonly message?: any,
}