import { createReducer, on } from "@ngrx/store";
import { Product } from "../../modules/core/model/Product";
import * as productActions from './product.actions'

export interface ProductState {
  products: Product[];
  currentProductId: number | null;
  error: string
}

const initState: ProductState = {
  products: [],
  currentProductId: null,
  error: ''
}

export const productReducer = createReducer(
  initState,
  on(productActions.loadProductsSuccessfuly, (state: ProductState, action) => {
    return {
      ...state,
      products: action.products
    }
  }),

  on(productActions.loadProductsFailure, (state: ProductState, action) => {
    return {
      ...state,
      error: action.error
    }
  })
)
