import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeIn } from '../../../../core/animations';

@Component({
  selector: 'app-product-details-popup',
  standalone: true,
  imports: [],
  templateUrl: './product-details-popup.component.html',
  styleUrl: './product-details-popup.component.scss',
  animations:[fadeIn]
})
export class ProductDetailsPopupComponent {
  @Input() selectedProduct:any={}
  @Output() onClose = new EventEmitter<any>();

  close(){
    this.onClose.emit()
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

}
