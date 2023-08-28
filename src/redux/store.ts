import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productDetailSlice } from './productDetail/slice';
import { languageReducer } from './language/languageReducer';
import { recommendProductsReducer } from './recommendProducts/recommendProductsReducer';
import { actionLog } from './middlewares/actionLog';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
