import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent),
  },
];
