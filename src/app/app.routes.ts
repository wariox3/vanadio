import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./layouts/pages.routes'),
  },
  { path: '**', redirectTo: 'auth' },
];
