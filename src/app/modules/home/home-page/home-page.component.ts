import { Component } from '@angular/core';
import { TypewriterComponent } from '../../shared/components/typewriter/typewriter.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TypewriterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
