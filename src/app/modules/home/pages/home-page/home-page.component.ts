import { Component } from '@angular/core';
import { ActiveFilterComponent } from '../../../shared/components/active-filter/active-filter.component';
import { IntroComponent } from '../../components/intro/intro.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent,ActiveFilterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
