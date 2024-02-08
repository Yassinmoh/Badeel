import { Component } from '@angular/core';
import { TypewriterComponent } from '../../../shared/components/typewriter/typewriter.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TypewriterComponent,SearchComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

}
