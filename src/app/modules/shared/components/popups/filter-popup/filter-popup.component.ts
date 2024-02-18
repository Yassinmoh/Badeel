import { Component, inject } from '@angular/core';
import { PopupService } from '../../../../core/Services/popup.service';
import { fadeInRight } from '../../../../core/animations';

@Component({
  selector: 'app-filter-popup',
  standalone: true,
  imports: [],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss',
  animations:[fadeInRight]
})
export class FilterPopupComponent {
  popupService =inject(PopupService)

  closeFilterPopup(){
    this.popupService.closeFilterPopup()
  }
}
