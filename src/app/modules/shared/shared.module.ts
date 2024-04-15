import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { SearchComponent } from './components/search/search.component';
import { FilterPopupComponent } from './components/popups/filter-popup/filter-popup.component';
import { ActiveFilterComponent } from './components/active-filter/active-filter.component';
import { ProductDetailsPopupComponent } from './components/popups/product-details-popup/product-details-popup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypewriterComponent,
    SearchComponent,
    FilterPopupComponent,
    ActiveFilterComponent,
    ProductDetailsPopupComponent
  ],
  exports:[
    TypewriterComponent,
    SearchComponent,
    FilterPopupComponent,
    ActiveFilterComponent,
    ProductDetailsPopupComponent
  ]
})
export class SharedModule { }
