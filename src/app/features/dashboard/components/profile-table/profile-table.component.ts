import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../shared/models/user.model';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-profile-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './profile-table.component.html'
})
export class ProfileTableComponent {
  @Input() user: User | null = null;


  get columns(): string[] {
    return [
      'Nombre',
      'Correo',
      'Rol',
      'Teléfono',
      'Último ingreso',
      'Creado el',
      'Actualizado el'
    ];
  }

  get data(): any[] {
    if (!this.user) return [];

    return [{
      Nombre: this.user.name,
      Correo: this.user.email,
      Rol: this.user.role,
      Teléfono: this.user.phone || '—',
      'Último ingreso': this.user.last_sign_in_at || '—',
      'Creado el': this.user.created_at || '—',
      'Actualizado el': this.user.updated_at || '—'
    }];
  }
}