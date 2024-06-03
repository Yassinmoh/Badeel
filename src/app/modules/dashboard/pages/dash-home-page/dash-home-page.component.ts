import { Component } from '@angular/core';
import { DashNavbarComponent } from '../../components/dash-navbar/dash-navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dash-home-page',
  standalone: true,
  imports: [DashNavbarComponent,SidebarComponent],
  templateUrl: './dash-home-page.component.html',
  styleUrl: './dash-home-page.component.scss'
})
export class DashHomePageComponent {

}
