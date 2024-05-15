import { isDevMode } from '@angular/core';
import {ActionReducerMap,MetaReducer} from '@ngrx/store';
import { appReducer } from './app.reducer';
import { productReducer } from './products/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  App: appReducer,
  Product: productReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
