import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";


const productsFeaturedState = createFeatureSelector<ProductState>('Product')

export const getAllProducts = createSelector(productsFeaturedState,state => state.products)
// export const getSelectedProduct = createSelector(productsFeaturedState,state => state.currentProductId)
export const getError = createSelector(productsFeaturedState,state => state.error)
