import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../core/main-layout/main-layout.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';

const routes: Routes = [
  {
    path:'',
    component:MainLayoutComponent,
    children:[
      {
        path:'submit',
        component:SubmitPageComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
