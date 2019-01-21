import { action } from 'typesafe-actions'
import { EntriesActionTypes, Entry } from './types'

export const fetchRequest = () => action(EntriesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Entry[]) => action(EntriesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(EntriesActionTypes.FETCH_ERROR, message)
export const selectEntry = (entry_id: string) => action(EntriesActionTypes.SELECT_ENTRY, entry_id)