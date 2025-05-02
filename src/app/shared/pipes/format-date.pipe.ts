// format-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined, format: string = 'dd/MM/yyyy HH:mm'): string {
    if (!value) return '—';

    const date = DateTime.fromISO(String(value));
    if (!date.isValid) return String(value); 

    return date.setZone('America/Guayaquil').toFormat(format);
  }
}