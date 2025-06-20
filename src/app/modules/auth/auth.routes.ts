import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/recover-password/recover-password.component'),
  },
] as Routes;
