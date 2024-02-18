import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { SearchComponent } from './components/search/search.component';
import { FilterPopupComponent } from './components/popups/filter-popup/filter-popup.component';
import { ActiveFilterComponent } from './components/active-filter/active-filter.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypewriterComponent,
    SearchComponent,
    FilterPopupComponent,
    ActiveFilterComponent
  ],
  exports:[
    TypewriterComponent,
    SearchComponent,
    FilterPopupComponent,
    ActiveFilterComponent
  ]
})
export class SharedModule { }
