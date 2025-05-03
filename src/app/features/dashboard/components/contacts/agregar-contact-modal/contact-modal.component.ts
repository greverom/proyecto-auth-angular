import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../../../shared/components/form/form.component';
import { Contact } from '../../../../../shared/models/contacts.model';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormComponent],
  template: `
    <div class="fixed inset-0 bg-black/20 backdrop-blur-xs overflow-y-auto flex items-center justify-center z-50" *ngIf="visible">
      <div class="bg-white rounded-md shadow-sm w-full max-w-[400px] mx-4 sm:mx-0 relative max-h-[90vh] overflow-y-auto animate-slide-up">
        <button class="absolute top-2 right-3 text-gray-500 hover:text-gray-700" (click)="close.emit()">✕</button>

        <h2 class="text-lg font-semibold text-center text-gray-700 py-5">Nuevo Contacto</h2>

        <app-form
          [formFields]="formFields"
          [submitLabel]="contactToEdit ? 'Actualizar' : 'Crear'"
          [contactToEdit]="contactToEdit"
          cancelLabel="Cancelar"
          (submitForm)="onSubmit($event)"
          (cancel)="close.emit()"
        ></app-form>
      </div>
    </div>
  `,
})
export class ContactModalComponent {
  @Input() visible = false;
  @Input() contactToEdit: Contact | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  formFields = [
    { name: 'cedula', type: 'text', label: 'Cédula', required: true }, 
    { name: 'name', type: 'text', label: 'Nombre', required: true },
    { name: 'last_name', type: 'text', label: 'Apellido', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'phone', type: 'text', label: 'Teléfono', required: true },
    { name: 'age', type: 'number', label: 'Edad', required: true },
  ];

  onSubmit(formData: Contact) {
    if (this.contactToEdit?.id) {
      this.submit.emit({ data: formData, id: this.contactToEdit.id });
    } else {
      this.submit.emit({ data: formData });
    }
  }
}