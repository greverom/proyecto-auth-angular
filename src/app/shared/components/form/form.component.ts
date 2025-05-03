import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({}); 
  }

  ngOnInit() {
    const group: Record<string, any> = {};
    this.formFields.forEach(field => {
      group[field.name] = field.required ? [null, Validators.required] : [null];
    });
    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}