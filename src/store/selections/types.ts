export interface Selection {
  id?: number,
  category_id: number,
  entry_id: number,
  user_id?: number,
}

export enum SelectionsActionTypes {
  FETCH_REQUEST = '@@selections/FETCH_REQUEST',
  FETCH_SUCCESS = '@@selections/FETCH_SUCCESS',
  SELECT_ENTRY = '@@selections/SELECT_ENTRY',
  FETCH_ERROR = '@@selections/FETCH_ERROR',
}

export interface SelectionsState {
  readonly loading: boolean,
  readonly data: Selection[],
  readonly errors?: string,
}