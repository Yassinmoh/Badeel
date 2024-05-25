import { createReducer, on } from "@ngrx/store";
import { Product } from "../../modules/core/model/Product";
import * as productActions from './product.actions'

export interface ProductState {
  products: Product[];
  currentProductId: number | null;
  error: string;
  activeFilterItems: any | null;
  searchTerm:string
}

const initState: ProductState = {
  products: [],
  currentProductId: null,
  error: '',
  activeFilterItems: {},
  searchTerm:''
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

  on(productActions.searchProducts, (state: ProductState) => {
    return {
      ...state,
    }
  }),

  on(productActions.setSearchTerm,(state:ProductState,action)=>{
    return{
      ...state,
      searchTerm:action.searchTerm
    }
  }),

  on(productActions.setCurrentActiveFilterItems, (state: ProductState, action) => {
    return {
      ...state,
      activeFilterItems: action.CurrentActiveFilterItems
    }
  }),

  on(productActions.removeActiveFilterItem, (state: ProductState, action) => {
    return {
      ...state,
      activeFilterItems: {
        ...state.activeFilterItems,
        [action.filterName]: state.activeFilterItems?.[action.filterName]?.filter((item: string) => {
          return item !== action.value;
        })
      }
    }
  }),

  on(productActions.resetActiveFilterItems,(state:ProductState)=>{
    return{
      ...state,
      activeFilterItems:{}
    }
  })

)
