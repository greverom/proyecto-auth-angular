import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('sb-wxbbqgljawjbnjrioibz-auth-token');
      return !!token;
    }
    return false;
  }

  canActivate(): boolean | UrlTree {
    return this.isAuthenticated()
      ? true
      : this.router.parseUrl('/auth/login');
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}