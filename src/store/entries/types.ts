export interface Entry {
  entry_id: number,
  display_name: string,
  featured_image: string,
  featured_video: string,
  display_content: string,
  category_id: number,
};

export enum EntriesActionTypes {
  FETCH_REQUEST = '@@entries/FETCH_REQUEST',
  FETCH_SUCCESS = '@@entries/FETCH_SUCCESS',
  SELECT_ENTRY = '@@entries/SELECT_ENTRY',
  FETCH_ERROR = '@@entries/FETCH_ERROR',
  SELECTED = '@@entries/SELECTED'
}

export interface EntriesState {
  readonly loading: boolean,
  readonly data: Entry[],
  readonly errors?: string,
}