import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactContainerComponent } from '../../components/contacts/contact-container.component';


@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactContainerComponent],
  template: ` 
  <div class="pt-10 p-3 md:p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Mis Contactos</h1>
    <app-contact-container />
  </div>
`,
})
export class ContactPageComponent {}