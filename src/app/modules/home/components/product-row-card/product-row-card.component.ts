import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-row-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-row-card.component.html',
  styleUrl: './product-row-card.component.scss'
})
export class ProductRowCardComponent implements OnInit {
  @Input() isMobileScreen: boolean = false;
  @Input() products: any = {};
  ngOnInit(): void {

  }

}
