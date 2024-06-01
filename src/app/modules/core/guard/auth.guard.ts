import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  let isLogin = !!localStorage.getItem('token');   //'!!' to Convert return to Boolean
  if(isLogin) return true
  return router.createUrlTree(['dashboard/login'])
  }

