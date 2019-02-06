import { action } from 'typesafe-actions'
import { GlobalsActionTypes, Global } from './types'

export const fetchGlobals = () => action(GlobalsActionTypes.FETCH_GLOBALS)
export const fetchSuccess = (data: Selection[]) => action(GlobalsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(GlobalsActionTypes.FETCH_ERROR, message)
export const setGlobals = (global: Global) => action(GlobalsActionTypes.SET_GLOBALS, global)