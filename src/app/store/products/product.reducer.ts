import { createReducer, on } from "@ngrx/store";
import { Product } from "../../modules/core/model/Product";
import * as productActions from './product.actions'

export interface ProductState {
  products: Product[];
  currentProductId: number | null;
  error: string;
  activeFilterItems: any | null
}

const initState: ProductState = {
  products: [],
  currentProductId: null,
  error: '',
  activeFilterItems: {}
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
  }),
  on(productActions.searchProducts, (state: ProductState, action) => {
    return {
      ...state,

    }
  }),
  on(productActions.setCurrentActiveFilterItems, (state: ProductState, action) => {
    return {
      ...state,
      activeFilterItems: action.CurrentActiveFilterItems
    }
  }),
  on(productActions.removeActiveFilterItem,(state:ProductState,action)=>{
    console.log("action", state.activeFilterItems?.category)
    console.log("action.value",typeof action.value)

    return{
      ...state,
      activeFilterItems:{
        ...state.activeFilterItems,
        [action.filterName]: state.activeFilterItems?.[action.filterName]?.filter((item: string) => {
          // when filterName == 'category' typeof action.value == object
          // so we need to handle it and convert to string to be able to remove the active item
          if (typeof action.value === 'string') {
            return item !== action.value;
          } else {
            return item !== String(action.value);
          }
        })
      }
    }
  })
)
