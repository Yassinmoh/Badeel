import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../modules/core/Services/product.service';
import * as productActions from '../products/product.actions'
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {

  actions$ = inject(Actions)
  store = inject(Store)
  productsService = inject(ProductService)

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        productActions.loadProducts,
        productActions.searchProducts,
        productActions.filterProducts
      ),
      mergeMap((action) => {
        // In case user dispatch load products Action:
        if (action.type === productActions.loadProducts.type) {
          return this.productsService.getProducts().pipe(
            map(filteredProducts => productActions.loadProductsSuccessfuly({ products: filteredProducts })),
            catchError((error) => of(productActions.loadProductsFailure({ error })))
          );
          // In case user dispatch Filter products Action:
        } else if (action.type === productActions.filterProducts.type) {
          const filterBy = action.filterBy;
          // Add flag to check if there Active Filters item :
          const hasActiveFilters = Object.values(filterBy).some((value:any) => value.length > 0);
          console.log("hasActiveFilters",hasActiveFilters);

          return this.productsService.getProducts().pipe(
            // if there Active Filters item Filter products if not return All Products:
            map((products) => hasActiveFilters ? this.productsService.filterProducts(products, filterBy) : products),
            map(filteredProducts => productActions.loadProductsSuccessfuly({ products: filteredProducts })),
            tap(data => console.log("Filter Data From Effect", data)),
            catchError((error) => of(productActions.loadProductsFailure({ error })))
          );
        } else {
          // In case user dispatch search Action:
          const searchTerm = action.searchTerm;
          return this.productsService.searchProductsFilter(searchTerm).pipe(
            map(products => productActions.loadProductsSuccessfuly({ products })),
            tap((result) => console.log("Search Result", result)),
          );
        }
      })
    )
  })




}
