import { action } from 'typesafe-actions'
import { NavigationActionTypes, Navigation } from './types'

export const navigate = (page: string) => {
    action(NavigationActionTypes.NAVIGATE, page);
}