import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn, selectUserData, selectIsAdmin } from './core/store/user.selector';
import { User } from './shared/models/user.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyecto-auth-angular';

  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  userData$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.userData$ = this.store.select(selectUserData);

    // Debug en consola
    this.isLoggedIn$.subscribe(value => console.log('🔒 ¿Está logueado?', value));
    this.isAdmin$.subscribe(value => console.log('👑 ¿Es admin?', value));
    this.userData$.subscribe(user => console.log('🙋‍♂️ Usuario:', user));
  }
}