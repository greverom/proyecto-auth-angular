import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card.component';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../../core/store/user.selector';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  user$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUserData);
  }
}
