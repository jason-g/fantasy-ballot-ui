import { action } from 'typesafe-actions'
import { NavigationActionTypes, Navigation } from './types'


export const navigate = (page: string) => {
    debugger;
    action(NavigationActionTypes.NAVIGATE, page);
}