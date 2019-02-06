export interface Global {
  id: number,
  value: boolean,
  setting: string,
}

export enum GlobalsActionTypes {
  FETCH_GLOBALS = '@@globals/FETCH_GLOBALS',
  FETCH_SUCCESS = '@@globals/FETCH_SUCCESS',
  SET_GLOBALS = '@@globals/SET_GLOBALS',
  FETCH_ERROR = '@@globals/FETCH_ERROR',
}

export interface GlobalsState {
  readonly loading: boolean,
  readonly data: Global[],
  readonly errors?: string,
}