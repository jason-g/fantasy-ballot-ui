
export interface Category extends ApiResponse {
  category_id: number,
  display_content: string,
  display_name: string,
};

export type ApiResponse = Record<string, any>

export enum CategoriesActionTypes {
  FETCH_REQUEST = '@@categories/FETCH_REQUEST',
  FETCH_SUCCESS = '@@categories/FETCH_SUCCESS',
  FETCH_ERROR = '@@categories/FETCH_ERROR',
  SELECTED = '@@categories/SELECTED'
}

export interface CategoriesState {
  readonly loading: boolean,
  readonly data: Category[],
  readonly errors?: string,
}