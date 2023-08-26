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


export const fetchRecommendProductsActionStartCreator =
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