import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";
import { Dispatch } from "redux";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL";

interface FetchRecommendProductsStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductsFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductsActionTypes =
  FetchRecommendProductsStartAction
  | FetchRecommendProductsSuccessAction
  | FetchRecommendProductsFailAction;


export const fetchRecommendProductsStartActionCreator =
  (): FetchRecommendProductsStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    };
  }

export const fetchRecommendProductsSuccessActionCreator =
  (data: any): FetchRecommendProductsSuccessAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
      payload: data,
    };
  }

export const fetchRecommendProductsFailActionCreator =
  (error: any): FetchRecommendProductsFailAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_FAIL,
      payload: error,
    };
  }

export const fetchRecommendProductsActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductsActionTypes> =>
    async (dispatch: Dispatch, getState: any) => {
      dispatch(fetchRecommendProductsStartActionCreator());
      try {
        const { data } = await axios.get(
          //'http://192.168.50.162:3001/api/productCollections'
          'http://123.56.149.216:8080/api/productCollections'
        );
        console.log(data);
        dispatch(fetchRecommendProductsSuccessActionCreator(data));
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          dispatch(fetchRecommendProductsFailActionCreator(e.message));
        }
      }
    }