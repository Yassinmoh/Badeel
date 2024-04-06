import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActiveFilterComponent } from '../../../shared/components/active-filter/active-filter.component';
import { IntroComponent } from '../../components/intro/intro.component';
import { ProductGridCardComponent } from '../../components/product-grid-card/product-grid-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductRowCardComponent } from '../../components/product-row-card/product-row-card.component';
import { Observable, map, tap } from 'rxjs';
import { ProductService } from '../../../core/Services/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent, ActiveFilterComponent, ProductGridCardComponent, ProductRowCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  route = inject(ActivatedRoute)
  productServise = inject(ProductService)

  currentViewType: string = ''
  isMobileScreen: boolean = false
  products$!: Observable<any[]>;


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

    this.products$ = this.productServise.getProducts().pipe(map(product => product),tap(x => console.log("Products",x)
    ))
  }


  getProductDetails(e:Event){
    console.log("SELECT PRODUCT",e);

  }


}
