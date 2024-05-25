import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashHomePageComponent } from './pages/dash-home-page/dash-home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    component:DashHomePageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
