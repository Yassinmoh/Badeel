import { Component } from '@angular/core';
import { DashNavbarComponent } from '../../components/dash-navbar/dash-navbar.component';

@Component({
  selector: 'app-dash-home-page',
  standalone: true,
  imports: [DashNavbarComponent],
  templateUrl: './dash-home-page.component.html',
  styleUrl: './dash-home-page.component.scss'
})
export class DashHomePageComponent {

}
