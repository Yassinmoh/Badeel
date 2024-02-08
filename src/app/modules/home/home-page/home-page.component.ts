import { Component } from '@angular/core';
import { IntroComponent } from '../components/intro/intro.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
