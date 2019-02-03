import { action } from 'typesafe-actions'
import { CategoriesActionTypes, Category } from './types'

export const fetchRequest = () => action(CategoriesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Category[]) => action(CategoriesActionTypes.FETCH_SUCCESS, data)
export const selectWinner = (data: Category) => action(CategoriesActionTypes.SELECT_WINNER, data)
export const fetchError = (message: string) => action(CategoriesActionTypes.FETCH_ERROR, message)