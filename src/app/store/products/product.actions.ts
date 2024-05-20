import { createAction, props } from "@ngrx/store";
import { Product } from "../../modules/core/model/Product";



export const loadProducts = createAction('[Products API] Load Product');
export const loadProductsSuccessfuly = createAction('[Products API] Load Product Successfuly',props<{products:Product[]}>());
export const loadProductsFailure = createAction('[Products API] Load Product Failure',props<{error:string}>());

export const searchProducts = createAction('[Product List] Search products',props<{searchTrem:string}>())
