import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { ProductService } from '../../modules/core/Services/product.service';
import * as productActions from '../products/product.actions'
import { catchError, map, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService :ProductService
  ) {}

  loadProducts$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(productActions.loadProducts),
      mergeMap(()=>this.productsService.getProducts().pipe(
        map(products => productActions.loadProductsSuccessfuly({products})),
        catchError((error) => of(productActions.loadProductsFailure({error})))
      ))
    )
  })

}
