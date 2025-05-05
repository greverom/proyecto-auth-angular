import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { TableComponent } from '../../../../shared/components/table/table.component';
import { AuditLogEntry } from '../../../../shared/models/audi-log-entry.model';
import { AuditLogService } from '../../../../core/services/audit-log.service';
import { AuditLogFilter } from '../../../../shared/models/audit-log-filter.model';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-audit-table',
  standalone: true,
  imports: [CommonModule, TableComponent, FormComponent],
  templateUrl: './user-audit-table.component.html',
})
export class UserAuditTableComponent implements OnInit {
  logs: AuditLogEntry[] = [];
  private nameSearch$ = new Subject<string>();
  suggestions: { id: string; name: string }[] = [];
  actions: string[] = [];


  formFields = [
    { name: 'name', label: 'Nombre de Usuario', type: 'text' },
    { name: 'action', label: 'Tipo de Evento', type: 'text' },
    { name: 'fechaDesde', label: 'Desde', type: 'date' },
    { name: 'fechaHasta', label: 'Hasta', type: 'date' }
  ];

  columns: string[] = ['action', 'table_name', 'target_name', 'performed_at'];
  columnLabels = {
    action: 'Acción',
    table_name: 'Tabla',
    target_name: 'Nombre del Contacto',
    performed_at: 'Fecha y Hora'
  };

  constructor(
    private store: Store,
    private auditLogService: AuditLogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auditLogService.getAvailableActions().then((actions) => {
      this.actions = actions;
    });

    this.logs = [];

    this.nameSearch$.pipe(debounceTime(300)).subscribe(async (term) => {
      if (!term.trim()) {
        this.suggestions = [];
        return;
      }
    
      const results = await this.userService.searchUsersByName(term);
      //console.log('Usuarios encontrados:', results); 
      this.suggestions = results.map((user) => ({
        id: user.id,
        name: user.name, 
      }));
    });
  }

  onUserNameTyped(term: string) {
    this.nameSearch$.next(term);
  }

  async onFilterSubmit(filters: AuditLogFilter) {
   // console.log('Nombre enviado:', filters.name);
    const { data, error } = await this.auditLogService.getLogsByFilters(filters);
    if (error) {
      console.error('Error al filtrar logs:', error);
      return;
    }
    this.logs = data;
  }
}
