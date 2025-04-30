import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectIsLoggedIn } from '../store/user.selector';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RedirectIfAuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        const hasToken = isPlatformBrowser(this.platformId)
          ? !!localStorage.getItem('sb-wxbbqgljawjbnjrioibz-auth-token')
          : false;

        if (isLoggedIn || hasToken) {
          return this.router.createUrlTree(['/dashboard']);
        }
        return true;
      })
    );
  }
}