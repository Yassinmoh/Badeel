import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashNavbarComponent } from './components/dash-navbar/dash-navbar.component';
import { DividerComponent } from './components/divider/divider.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashNavbarComponent,
    DividerComponent
  ],
  exports:[DashNavbarComponent,DividerComponent]
})
export class DashboardModule { }
