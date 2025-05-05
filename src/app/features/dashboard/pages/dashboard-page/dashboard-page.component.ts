import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../../core/store/user.selector';
import { UserCardComponent } from '../../components/user-card/user-card.component';


@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, UserCardComponent],
  template: `
      <div class="pt-10 p-3 md:p-6">
        <h1 class="text-2xl font-bold text-center mb-6">Dashboard</h1>

        <ng-container *ngIf="user$ | async as user">
          <app-user-card [user]="user" />
        </ng-container>
      </div>
  `,
})
export class DashboardPageComponent {
  user$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUserData);
  }
}
