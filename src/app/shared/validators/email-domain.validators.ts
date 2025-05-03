import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailDomainValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const emailRegex = /^[\w.-]+@(gmail|outlook|hotmail|yahoo|icloud|protonmail|live|aol|zoho)\.(com|net|org|es|ec|co)$/i;

  return emailRegex.test(value) ? null : { invalidEmail: true };
}