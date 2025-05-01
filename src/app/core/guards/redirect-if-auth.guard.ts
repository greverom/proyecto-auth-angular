import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { selectIsLoggedIn } from '../store/user.selector';
import { AuthService } from '../services/auth.service'; 
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RedirectIfAuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (!isPlatformBrowser(this.platformId)) {
      return from([true]);
    }

    return from(this.authService.restoreSession()).pipe(
      switchMap(() => this.store.select(selectIsLoggedIn).pipe(take(1))),
      map(isLoggedIn => {
        return isLoggedIn
          ? this.router.createUrlTree(['/dashboard'])
          : true;
      })
    );
  }
}