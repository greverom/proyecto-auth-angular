
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectIfAuthGuard } from './core/guards/redirect-if-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectIfAuthGuard],
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
    redirectTo: '', 
  }
];