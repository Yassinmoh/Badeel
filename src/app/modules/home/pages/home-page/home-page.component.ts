import { Component } from '@angular/core';
import { ActiveFilterComponent } from '../../../shared/components/active-filter/active-filter.component';
import { IntroComponent } from '../../components/intro/intro.component';
import { ProductGridCardComponent } from '../../components/product-grid-card/product-grid-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent,ActiveFilterComponent,ProductGridCardComponent,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
