import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypewriterComponent,
    SearchComponent
  ],
  exports:[
    TypewriterComponent,
    SearchComponent
  ]
})
export class SharedModule { }
