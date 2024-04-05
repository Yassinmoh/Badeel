import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid-card',
  standalone: true,
  imports: [],
  templateUrl: './product-grid-card.component.html',
  styleUrl: './product-grid-card.component.scss'
})
export class ProductGridCardComponent {
  @Input() isMobileScreen: boolean = false;
}
