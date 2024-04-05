import { Component, inject } from '@angular/core';
import { PopupService } from '../../../core/Services/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-filter',
  standalone: true,
  imports: [],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveFilterComponent {
  popupService = inject(PopupService)
  router = inject(Router)
  pressed:string = 'grid';
  constructor() { }
  openFilterPopup() {
    this.popupService.openFilterPopup()
  }

  toggleClick(event: MouseEvent, type: string): void {
    if (this.pressed !== type) {
      this.pressed = type;
      this.router.navigate([], { queryParams: { view: type } });
    }
  }
}
