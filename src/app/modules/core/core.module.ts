import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashNavbarComponent } from '../dashboard/components/dash-navbar/dash-navbar.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SharedModule,
    RouterOutlet,
    DashNavbarComponent
  ],
  exports: [FooterComponent, MainLayoutComponent, HeaderComponent,DashboardLayoutComponent]
})
export class CoreModule { }
