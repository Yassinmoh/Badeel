import { createAction, props } from "@ngrx/store";
import { Product } from "../../modules/core/model/Product";


//Load Products:
export const loadProducts = createAction('[Products API] Load Product');
export const loadProductsSuccessfuly = createAction('[Products API] Load Product Successfuly',props<{products:Product[]}>());
export const loadProductsFailure = createAction('[Products API] Load Product Failure',props<{error:string}>());

//Search:
export const searchProducts = createAction('[Product List] Search products',props<{searchTerm:string}>())
export const setSearchTerm= createAction('[Product Search] Set Search Trem',props<{searchTerm:string}>())
//Filter:
export const filterProducts = createAction('[Filter] Filter Products',props<{filterBy:any}>())
export const setCurrentActiveFilterItems = createAction('[Filter] Set Current Active Filter Items',props<{CurrentActiveFilterItems:any}>())
export const removeActiveFilterItem = createAction('[Filter] Remove Active Filter Item',props<{filterName: string; value: string }>() )
