import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../../../../core/store/user.selector';
import { User } from '../../../../shared/models/user.model';
import { ProfileTableComponent } from '../../components/profile-table/profile-table.component';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [CommonModule, ProfileTableComponent],
  templateUrl: './perfil-page.component.html'
})
export class PerfilPageComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserData);
  }
}