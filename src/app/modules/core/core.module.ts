import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SharedModule,
    RouterOutlet
  ],
  exports: [FooterComponent, MainLayoutComponent, HeaderComponent]
})
export class CoreModule { }
