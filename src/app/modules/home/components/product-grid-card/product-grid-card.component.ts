import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-grid-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-grid-card.component.html',
  styleUrl: './product-grid-card.component.scss'
})
export class ProductGridCardComponent {
  @Input() isMobileScreen: boolean = false;
  @Input() product:any ={};
  @Output() onSelectProduct = new EventEmitter<any>();

  productStatusMap: { [key: string]: any } = {
    'boycott': { icon: 'B', name: 'داعم', textColor: '#e94444' },
    'alternative': { icon: 'A', name: 'بديل', textColor: '#9bc880' },
    'unsure': { icon: 'C', name: 'قيد المراجعة', textColor: '#c6d315' },
  };

  getProductStatus(status: string): any {
    return this.productStatusMap[status] || '';
  }

  showDetails(product:any){
    this.onSelectProduct.emit(product)
  }
}
