export interface User {
  id?: number | null,
  token?: string | null,
  userId?: number | null,
  username?: string,
  password?: string,
}

export enum UserActionTypes {
  LOGIN = '@@user/LOGIN',
  LOGOUT = '@@user/LOGOUT',
  EDIT = '@@user/EDIT',
  SIGNUP = '@@user/SIGNUP',
  LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
  ERROR = '@@user/ERROR',
}

export interface UserState {
  readonly id: number | null,
  readonly token: string | null,
  readonly userId: number | null,
}