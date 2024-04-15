import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details-popup',
  standalone: true,
  imports: [],
  templateUrl: './product-details-popup.component.html',
  styleUrl: './product-details-popup.component.scss'
})
export class ProductDetailsPopupComponent {


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
