import { Component } from '@angular/core';
import { UserAuditTableComponent } from "../../../components/user-audit-table/user-audit-table.component";

@Component({
  selector: 'app-user-audit-table-page',
  imports: [UserAuditTableComponent],
  template: `
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Historial de Actividades</h1>
    <app-user-audit-table></app-user-audit-table>
  </div>
`,
})
export class UserAuditTablePageComponent {

}
