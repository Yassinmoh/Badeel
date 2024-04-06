import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-grid-card',
  standalone: true,
  imports: [],
  templateUrl: './product-grid-card.component.html',
  styleUrl: './product-grid-card.component.scss'
})
export class ProductGridCardComponent {
  @Input() isMobileScreen: boolean = false;
  @Input() product:any ={};
  @Output() onSelectProduct = new EventEmitter<any>();

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
