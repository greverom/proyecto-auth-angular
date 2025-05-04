import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../../../../core/store/user.selector';
import { User } from '../../../../shared/models/user.model';
import { ProfileTableComponent } from '../../components/profile-table/profile-table.component';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { NotificationService } from '../../../../core/services/modal/notice.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [CommonModule, ProfileTableComponent, FormComponent],
  templateUrl: './perfil-page.component.html'
})
export class PerfilPageComponent implements OnInit {
  user$!: Observable<User | null>;
  editMode = false;

  formFields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'role', label: 'Rol', type: 'text', required: true },
    { name: 'phone', label: 'Teléfono', type: 'text' }
  ];

  constructor(
    private store: Store,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserData);
  }

  async handleProfileUpdate(formData: any) {
    try {
      await this.authService.updateUserProfile(formData);
      this.notification.success('Perfil actualizado con éxito.');
      this.editMode = false;
    } catch (err) {
      this.notification.error('Error al actualizar el perfil.');
      console.error(err);
    }
  }
}