import { createReducer, on } from "@ngrx/store";
import { Category } from "../../modules/core/model/Category";
import * as categoriesActions from '../categories/category.actions'

export interface CategoryState{
  categories:Category[];
  error:string;
}

const initState:CategoryState ={
  categories:[],
  error:'',
}
export const CategoryReducer=createReducer(initState,
  on(categoriesActions.loadCategoriesSuccessfuly,(state:CategoryState,action)=>{
    return{
      ...state,
      categories:action.categories
    }
  }),
  on(categoriesActions.loadCategoriesFailure,(state:CategoryState,action)=>{
    return{
      ...state,
      error:action.error
    }
  })
)
