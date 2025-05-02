import { Component, Input, OnInit } from '@angular/core';
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
    return ['ID', 'Nombre', 'Correo', 'Rol'];
  }

  get data(): any[] {
    return this.user ? [this.user] : [];
  }
}
