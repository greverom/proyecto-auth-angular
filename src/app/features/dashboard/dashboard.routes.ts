import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil-page/perfil-page.component').then(m => m.PerfilPageComponent)
  }
];