import { createAction, props } from "@ngrx/store";
import { Category } from "../../modules/core/model/Category";


//Load Products:
export const loadCategories = createAction('[Categories API] Load Categories');
export const loadCategoriesSuccessfuly = createAction('[Categories API] Load Categories Successfuly',props<{categories:Category[]}>());
export const loadCategoriesFailure = createAction('[Categories API] Load Categories Failure',props<{error:string}>());
