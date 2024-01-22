import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent
  ],
  exports: [FooterComponent, MainLayoutComponent, HeaderComponent]
})
export class CoreModule { }
