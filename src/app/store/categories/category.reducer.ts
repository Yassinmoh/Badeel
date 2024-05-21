import { createReducer, on } from "@ngrx/store";
import { Category } from "../../modules/core/model/Category";
import * as categoriesActions from '../categories/category.actions'

export interface CategoryState{
  categories:Category[]
}

const initState:CategoryState ={
  categories:[]
}
export const CategoryReducer=createReducer(initState,
  on(categoriesActions.loadCategories,(state:CategoryState)=>{
    return{
      ...state,
    }
  })
)
