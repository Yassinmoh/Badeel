import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";


const getCategoriesFeatureState= createFeatureSelector<CategoryState>('Category')

export const getCategories = createSelector(getCategoriesFeatureState,state => state.categories)
export const getError = createSelector(getCategoriesFeatureState,state => state.error)
