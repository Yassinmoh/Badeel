import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ProductService } from '../../../core/Services/product.service';

@Component({
  selector: 'app-product-row-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-row-card.component.html',
  styleUrl: './product-row-card.component.scss'
})
export class ProductRowCardComponent implements OnInit {
  @Input() isMobileScreen: boolean = false;
  @Input() products: any = {};
  @Output() onSelectProduct = new EventEmitter<any>();
  products$!: Observable<any[]>;

  productServise = inject(ProductService)
  ngOnInit(): void {
    this.products$ = this.productServise.getProducts().pipe(map(product => product),tap(x => console.log("Products",x)))
  }

  getProductStatus(status:string):string{
    if(status == 'boycott'){
      return 'داعم'
    }else if(status == 'alternative'){
      return 'بديل'
    }else if(status == 'unsure'){
      return 'غير متأكد'
    }else{
      return ''
    }
  }

  showDetails(product:any){
    this.onSelectProduct.emit(product)
  }

}
