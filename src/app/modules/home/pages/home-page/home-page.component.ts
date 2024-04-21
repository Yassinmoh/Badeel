import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActiveFilterComponent } from '../../../shared/components/active-filter/active-filter.component';
import { IntroComponent } from '../../components/intro/intro.component';
import { ProductGridCardComponent } from '../../components/product-grid-card/product-grid-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductRowCardComponent } from '../../components/product-row-card/product-row-card.component';
import { Observable, map, tap } from 'rxjs';
import { ProductService } from '../../../core/Services/product.service';
import { SharedModule } from '../../../shared/shared.module';
import { Product } from '../../../core/model/Product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent, ActiveFilterComponent, ProductGridCardComponent, ProductRowCardComponent, CommonModule, SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  route = inject(ActivatedRoute)
  productServise = inject(ProductService)
  currentViewType: string = ''
  isMobileScreen: boolean = false
  // products$!: Observable<any[]>;
  products: Product[] = []
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

    this.productServise.getProducts().pipe(
      map(product => product),
      tap((data) => { this.products = data}
      )).subscribe()
  }

  getFilterdData(filtereProducts:Product[]){
    this.products=filtereProducts
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


}
