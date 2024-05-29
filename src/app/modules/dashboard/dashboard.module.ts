import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashNavbarComponent } from './components/dash-navbar/dash-navbar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashNavbarComponent
  ],
  exports:[DashNavbarComponent]
})
export class DashboardModule { }
