import { Route } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard')
      },
      {
        path: 'customers',
        loadComponent: () => import('./pages/customers/customers')
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products')
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders')
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports')
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings')
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  }
];
