import { Component } from '@angular/core';
import { PopupService } from '../Services/popup.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(public popupService:PopupService){}
}
