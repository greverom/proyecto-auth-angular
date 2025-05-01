import {
  Injectable,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { selectIsLoggedIn } from '../store/user.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (!isPlatformBrowser(this.platformId)) {
      return from([false]);
    }

    return from(this.authService.restoreSession()).pipe(
      switchMap(() => this.store.select(selectIsLoggedIn).pipe(take(1))),
      map((isLoggedIn) =>
        isLoggedIn ? true : this.router.parseUrl('/auth/login')
      )
    );
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.canActivate();
  }
}