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
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'auditoria',
    loadComponent: () =>
      import('./pages/user-audit-table/user-audit-table-page/user-audit-table-page.component').then((m) => m.UserAuditTablePageComponent),
  },
];