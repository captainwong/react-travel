import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { languageReducer } from './language/languageReducer';
import { recommendProductsReducer } from './recommendProducts/recommendProductsReducer';
import { actionLog } from './middlewares/actionLog';
import { changeLanguage } from './middlewares/changeLanguage';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, changeLanguage, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;
