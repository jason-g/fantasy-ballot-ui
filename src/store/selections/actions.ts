import { action } from 'typesafe-actions'
import { SelectionsActionTypes, Selection } from './types'

export const fetchRequest = () => action(SelectionsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Selection[]) => action(SelectionsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(SelectionsActionTypes.FETCH_ERROR, message)
export const selectSelection = (entry_id: number, category_id: number) => action(SelectionsActionTypes.SELECT_ENTRY, entry_id, category_id)