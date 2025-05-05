import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cedulaEcuadorValidator } from '../../validators/ecuador-id.validators';
import { Contact } from '../../models/contacts.model';
import { User } from '../../models/user.model';
import { debounceTime, Subject } from 'rxjs';
import { convertirAISOConZona } from '../../utils/date-utils';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input() formFields: { name: string; label: string; type: string; required?: boolean }[] = [];
  @Input() submitLabel = 'Guardar';
  @Input() cancelLabel = 'Cancelar';
  @Input() contactToEdit: Contact | null = null;
  @Input() userToToEdit: User | null = null;
  @Input() suggestions: { id: string; name: string }[] = [];
  @Input() availableActions: string[] = [];

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() nameSearch = new EventEmitter<string>();
  @Output() nameSelected = new EventEmitter<{ id: string; name: string }>();

  form: FormGroup;
  private nameInput$ = new Subject<string>();
  selectedUserId: string | null = null;
  private suppressSearch = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({}); 

    this.nameInput$
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.nameSearch.emit(value);
      });
  }

  ngOnInit() {
    const group: Record<string, any> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    this.formFields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.name === 'email') {
        validators.push(Validators.pattern(emailRegex));
      }
      if (field.name === 'age') {
        validators.push(Validators.min(1), Validators.max(99));
      }
      if (field.name === 'cedula') {
        validators.push(cedulaEcuadorValidator);
      }

      const initialValue =
        this.contactToEdit?.[field.name as keyof Contact] ??
        this.userToToEdit?.[field.name as keyof User] ??
        null;
      group[field.name] = [initialValue, validators];
    });

    this.form = this.fb.group(group);

    if (this.form.get('name')) {
      this.form.get('name')!.valueChanges.subscribe((value: string) => {
        if (this.suppressSearch) return;
        this.nameInput$.next(value);
      });
    }
  }

  onInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (fieldName === 'name' && inputElement?.value) {
      this.nameInput$.next(inputElement.value);
    }
  }

  onFieldBlur(event: FocusEvent) {
    setTimeout(() => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (!relatedTarget || !relatedTarget.closest('ul')) {
        this.suggestions = [];
      }
    }, 150);
  }

  selectSuggestion(user: { id: string; name: string }) {
    this.selectedUserId = user.id;
    this.suppressSearch = true;
    this.form.get('name')?.setValue(user.name);
    this.nameSelected.emit(user);
  
    setTimeout(() => {
      this.suppressSearch = false;
    }, 300);
  
    this.suggestions = [];
  }

  getErrorMessage(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio.';
    if (fieldName === 'cedula' && control.errors['cedulaInvalida']) return 'Cédula ecuatoriana no válida.';
    if (fieldName === 'email' && control.errors['pattern']) return 'Ingresa un correo electrónico válido.';
    if (fieldName === 'age' && control.errors['min']) return 'La edad mínima es 1.';
    if (fieldName === 'age' && control.errors['max']) return 'La edad máxima es 99.';

    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const rawValue = this.form.value;
    const processedValue = { ...rawValue };
  
    if (rawValue.fechaDesde) {
      processedValue.fechaDesde = convertirAISOConZona(rawValue.fechaDesde, 'inicio');
    }
  
    if (rawValue.fechaHasta) {
      processedValue.fechaHasta = convertirAISOConZona(rawValue.fechaHasta, 'fin');
    }
  
    //console.log('Valores enviados al padre:', processedValue);
    this.submitForm.emit(processedValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
