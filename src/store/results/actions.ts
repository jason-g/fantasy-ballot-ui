import { action } from 'typesafe-actions'
import { ResultsActionTypes, Results } from './types'

export const fetchResults = () => action(ResultsActionTypes.FETCH_RESULTS)
export const fetchSuccess = (data: Results[]) => action(ResultsActionTypes.FETCH_SUCCESS, data)
export const selectWinner = (data: Results) => action(ResultsActionTypes.SELECT_WINNER, data)
export const fetchError = (message: string) => action(ResultsActionTypes.FETCH_ERROR, message)