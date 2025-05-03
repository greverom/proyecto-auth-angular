import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cedulaEcuadorValidator(control: AbstractControl): ValidationErrors | null {
  const cedula = control.value;

  if (!/^\d{10}$/.test(cedula)) return { cedulaInvalida: true };

  const province = parseInt(cedula.substring(0, 2), 10);
  if (province < 1 || province > 24) return { cedulaInvalida: true };

  const thirdDigit = parseInt(cedula[2], 10);
  if (thirdDigit >= 6) return { cedulaInvalida: true };

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let total = 0;

  for (let i = 0; i < 9; i++) {
    let digit = parseInt(cedula[i], 10) * coefficients[i];
    if (digit >= 10) digit -= 9;
    total += digit;
  }

  const checkDigit = (10 - (total % 10)) % 10;

  return checkDigit === parseInt(cedula[9], 10) ? null : { cedulaInvalida: true };
}