
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ModalComponent],
  template: `
    <app-sidebar></app-sidebar>
    <main class="main-content bg-gray-50">
      <router-outlet></router-outlet>
    </main>
    <app-modal></app-modal>
  `,
})
export class MainLayoutComponent {}