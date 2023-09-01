import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productDetailSlice } from './productDetail/slice';
import { languageReducer } from './language/languageReducer';
import { recommendProductsReducer } from './recommendProducts/recommendProductsReducer';
import { actionLog } from './middlewares/actionLog';
import { searchProductsSlice } from './searchProducts/slice';
import { userSlice } from './user/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    // 'user',
    // 'language',
    // 'productDetail',
    // 'recommendProducts',
    // 'searchProducts',
  ]
}

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: [
    'token', 
  ]
}

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  searchProducts: searchProductsSlice.reducer,
  user: persistReducer(userPersistConfig, userSlice.reducer),
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
