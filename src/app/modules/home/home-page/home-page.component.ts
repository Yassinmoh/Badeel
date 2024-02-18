import { Component } from '@angular/core';
import { IntroComponent } from '../components/intro/intro.component';
import { ActiveFilterComponent } from '../../shared/components/active-filter/active-filter.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent,ActiveFilterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
