import { Routes } from '@angular/router';
import { authGuard } from '@app/common/guards/auth.guard';

export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./admin-layout/admin-layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/home/pages/dashboard/dashboard.routes'),
      },
    ],
  },
] as Routes;
