import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeIn } from '../../../../core/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-popup',
  standalone: true,
  imports: [CommonModule],
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
  getProductStatus(status:string){
    if(status == 'boycott'){
      return { icon: 'B', name: 'داعم', textColor: '#e94444' }
    }else if(status == 'alternative'){
      return { icon: 'A', name: 'بديل', textColor: '#9bc880' }
    }else if(status == 'unsure'){
      return { icon: 'C', name: 'قيد المراجعة', textColor: '#c6d315' }
    }else{
      return {}
    }
  }

}
