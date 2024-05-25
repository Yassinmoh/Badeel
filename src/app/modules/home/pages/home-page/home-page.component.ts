import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActiveFilterComponent } from '../../../shared/components/active-filter/active-filter.component';
import { IntroComponent } from '../../components/intro/intro.component';
import { ProductGridCardComponent } from '../../components/product-grid-card/product-grid-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductRowCardComponent } from '../../components/product-row-card/product-row-card.component';
import { Observable } from 'rxjs';
import { ProductService } from '../../../core/Services/product.service';
import { SharedModule } from '../../../shared/shared.module';
import { Product } from '../../../core/model/Product';
import { PopupService } from '../../../core/Services/popup.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { ProductState } from '../../../../store/products/product.reducer';
import { getAllProducts } from '../../../../store/products/product.selectors';
import * as productsActions from '../../../../store/products/product.actions'
import { CategoryService } from '../../../core/Services/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent, ActiveFilterComponent, ProductGridCardComponent, ProductRowCardComponent, CommonModule, SharedModule, SpinnerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  route = inject(ActivatedRoute)
  store = inject(Store<ProductState>)

  public popupService = inject(PopupService)
  productServise = inject(ProductService)
  currentViewType: string = ''
  isMobileScreen: boolean = false
  // products$!: Observable<any[]>;
  products: Product[] = []
  products$!: Observable<Product[]>
  selectedProduct: any = null
  searchResults$!: Observable<Product[]>;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileScreen = window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      if (!param['view']) {
        this.currentViewType = 'grid'
      } else {
        this.currentViewType = param['view']
      }
    })
    this.products$ = this.store.select(getAllProducts)
    this.store.dispatch(productsActions.loadProducts())
    this.loadMore()
  }

  getFilterdData(filtereProducts: Product[]) {
    this.products = filtereProducts
  }

  updateSearchResults(filteredProducts: Product[]): void {
    this.products = filteredProducts;
  }


  getProductDetails(product: Product) {
    this.selectedProduct = product
  }

  closePopup() {
    this.selectedProduct = null
  }

  loadMore() {
    this.productServise.loadMoreProducts().subscribe(products => {
      // Check if there are no more products to load:
      if (!products.length) {
        console.log('No more products to load');
        return
      } else {
        this.products = [...this.products, ...products];
        this.store.dispatch(productsActions.loadProductsSuccessfuly({ products: this.products }));
      }
    });
  }
}
