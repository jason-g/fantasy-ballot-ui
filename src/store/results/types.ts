import { type } from "os";
import { Category } from "../categories/types";
import { User } from "../user/types";
import { string } from "prop-types";

export type ByUserType = {
    username: string,
    userid: number,
    winning: Category[],
}

export type WinnerType = {
    username: string,
    user_id: number,
    entry_id?: number,
    category_id?: number,
}

export type ByCategoryType = {
    category_id?: number,
    display_name?: string,
    dislay_content? : string,
    winners?: WinnerType[],
}

export interface Results extends ApiResponse {
  byCategory: ByCategoryType[],
  byUser: ByUserType[],
};

export type ApiResponse = Record<string, any>

export enum ResultsActionTypes {
  FETCH_RESULTS = '@@results/FETCH_RESULTS',
  FETCH_SUCCESS = '@@results/FETCH_SUCCESS',
  FETCH_ERROR = '@@results/FETCH_ERROR',
  SELECT_WINNER = '@@results/SELECT_WINNER'
}

export interface ResultsState {
  readonly loading: boolean,
  readonly data: Results[],
  readonly errors?: string,
}