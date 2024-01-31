import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from './components/typewriter/typewriter.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypewriterComponent
  ],
  exports:[
    TypewriterComponent
  ]
})
export class SharedModule { }
