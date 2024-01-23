import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ],
  exports: [FooterComponent, MainLayoutComponent, HeaderComponent]
})
export class CoreModule { }
