import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="p-6">
      <router-outlet />
    </main>
  `,
})
export class MainLayoutComponent {}