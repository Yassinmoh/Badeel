import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../modules/core/Services/product.service';
import * as productActions from '../products/product.actions'
import { catchError, map, mergeMap, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {

  actions$ = inject(Actions)
  productsService = inject(ProductService)

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.loadProducts, productActions.searchProducts),
      mergeMap((action) => {
        // In case user dispatch load products Action:
        if (action.type === productActions.loadProducts.type) {
          return this.productsService.getProducts().pipe(
            map(products => productActions.loadProductsSuccessfuly({ products })),
            catchError((error) => of(productActions.loadProductsFailure({ error })))
          );
        } else {
          // In case user dispatch search Action:
          const searchTerm = action.searchTrem;
          console.log("searchTerm",searchTerm);

          return this.productsService.searchProductsFilter(searchTerm).pipe(
            map(products => productActions.loadProductsSuccessfuly({ products })),
            tap((result) => console.log("Search Result", result)),
          );
        }
      })
    )
  })



}
