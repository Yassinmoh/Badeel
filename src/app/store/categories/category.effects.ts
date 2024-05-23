import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CategoryState } from "./category.reducer";
import { Store } from "@ngrx/store";
import * as categoryActions from './category.actions'
import { CategoryService } from "../../modules/core/Services/category.service";

@Injectable({
  providedIn: 'root'
})

export class CategoryEffect {
  store = inject(Store<CategoryState>)
  categoryService = inject(CategoryService)
  actions$ = inject(Actions)
  categoryEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(categoryActions.loadCategories),
    mergeMap(()=>this.categoryService.getCategories().pipe(
      map(categories => categoryActions.loadCategoriesSuccessfuly({categories})),
      catchError((error) => of(categoryActions.loadCategoriesFailure({error})))
    ))
  )
);

}
