import { Component } from '@angular/core';
import { UserAuditTableComponent } from "../../../components/user-audit-table/user-audit-table.component";

@Component({
  selector: 'app-user-audit-table-page',
  imports: [UserAuditTableComponent],
  template: `
  <div class="pt-10 p-3 md:p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Historial de Actividades</h1>
    <app-user-audit-table></app-user-audit-table>
  </div>
`,
})
export class UserAuditTablePageComponent {

}
