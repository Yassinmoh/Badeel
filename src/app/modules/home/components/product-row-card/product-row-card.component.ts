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
  // products$!: Observable<any[]>;
  productServise = inject(ProductService)

  productStatusMap: { [key: string]: any } = {
    'boycott': { icon: 'B', name: 'داعم', textColor: '#e94444' },
    'alternative': { icon: 'A', name: 'بديل', textColor: '#9bc880' },
    'unsure': { icon: 'C', name: 'قيد المراجعة', textColor: '#c6d315' },
  };

  ngOnInit(): void {
    // this.products$ = this.productServise.getProducts().pipe(map(product => product), tap(data => console.log("Products", data)))
  }

  getProductStatus(status: string): any {
    return this.productStatusMap[status] || '';
  }

  showDetails(product: any) {
    this.onSelectProduct.emit(product)
  }

}
