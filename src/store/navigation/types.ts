export interface Navigation {
  page: string,
}

export enum NavigationActionTypes {
  NAVIGATE = '@@navigation/NAVIGATE',
}

export interface NavigationState {
  page: string,
}