import { DateTime } from 'luxon';

export function convertirAISOConZona(fecha: string, tipo: 'inicio' | 'fin'): string {
  const zona = 'America/Guayaquil';
  const date = DateTime.fromISO(fecha).setZone(zona);
  return tipo === 'inicio'
    ? date.startOf('day').toISO()
    : date.endOf('day').toISO();
}