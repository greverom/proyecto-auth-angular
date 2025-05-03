import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { selectUserData } from '../../../../core/store/user.selector';
import { AuditLogEntry } from '../../../../shared/models/audi-log-entry.model';
import { AuditLogService } from '../../../../core/services/audit-log.service';


@Component({
  selector: 'app-user-audit-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './user-audit-table.component.html',
})
export class UserAuditTableComponent implements OnInit {
  logs: AuditLogEntry[] = [];
  columns: string[] = ['action', 'table_name', 'record_id', 'performed_at'];
  columnLabels = {
    action: 'Acción',
    table_name: 'Tabla',
    record_id: 'ID del Registro',
    performed_at: 'Fecha y Hora'
  };

  constructor(
    private store: Store,
    private auditLogService: AuditLogService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.store.select(selectUserData));
    if (!user?.id) return;

    const { data, error } = await this.auditLogService.getLogsByUser(user.id);
    if (error) {
      console.error('Error al obtener logs:', error);
      return;
    }

    this.logs = data;
  }
}