import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";
import { Product } from "../../modules/core/model/Product";


const productsFeaturedState = createFeatureSelector<ProductState>('Product')

//List Products:
export const getAllProducts = createSelector(productsFeaturedState, state => state.products)
export const getError = createSelector(productsFeaturedState, state => state.error)

//Search Products:
export const getSearchResults = createSelector(
  productsFeaturedState,
  getAllProducts,
  (state: any, products: Product[], searchTrem: string) => {
    if (!searchTrem) {
      return products
    }
    const lowercaseSearchTerm = searchTrem.toLocaleLowerCase();
    return products.filter(product => (product.productEnName?.includes(lowercaseSearchTerm) || product.productArName?.includes(lowercaseSearchTerm)))
  }
)

export const getSerchTerm =createSelector(productsFeaturedState,state => state.searchTerm)

//Filter PRoducts:
export const getCurrentActiveFilterItems = createSelector(productsFeaturedState,state => state.activeFilterItems)


