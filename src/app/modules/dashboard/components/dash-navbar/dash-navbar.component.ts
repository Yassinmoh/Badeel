import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-dash-navbar',
  standalone: true,
  imports: [AvatarModule,AvatarGroupModule],
  templateUrl: './dash-navbar.component.html',
  styleUrl: './dash-navbar.component.scss'
})
export class DashNavbarComponent {

}
