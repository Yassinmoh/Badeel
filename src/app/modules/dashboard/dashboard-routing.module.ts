import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashHomePageComponent } from './pages/dash-home-page/dash-home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardLayoutComponent } from '../core/dashboard-layout/dashboard-layout.component';
import { authGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashHomePageComponent,
        canActivate:[authGuard]
      },

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'register',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
