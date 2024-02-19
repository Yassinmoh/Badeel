import { Component, inject } from '@angular/core';
import { PopupService } from '../../../core/Services/popup.service';

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveFilterComponent {
  popupService = inject(PopupService)
  pressed = '';
  constructor() { }
  openFilterPopup() {
    this.popupService.openFilterPopup()
  }

  toggleClick(event: MouseEvent, type: string): void {
    if (this.pressed !== type) {
      this.pressed = type;
    }
  }
}
