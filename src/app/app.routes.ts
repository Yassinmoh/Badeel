import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('../app/modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'test',
    loadChildren: () => import('../app/modules/test/test.module').then(m => m.TestModule),
  },
];
