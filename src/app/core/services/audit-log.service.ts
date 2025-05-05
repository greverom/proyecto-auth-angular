import { Injectable } from '@angular/core';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase-client';
import { AuditLogEntry } from '../../shared/models/audi-log-entry.model';
import { AuditLogFilter } from '../../shared/models/audit-log-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  async getLogsByUser(userId: string): Promise<{ data: AuditLogEntry[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('audit_log')
      .select('*')
      .eq('performed_by', userId)
      .order('performed_at', { ascending: false });

    return { data: data ?? [], error };
  }

  async getAvailableActions(): Promise<string[]> {
    const { data, error } = await supabase
      .from('audit_log')
      .select('action')
      .neq('action', null)
      .order('action', { ascending: true });
  
    if (error) {
      console.error('Error al obtener acciones:', error);
      return [];
    }
  
    const uniqueActions = [...new Set(data.map((item: any) => item.action))];
    return uniqueActions;
  }

  async getLogsByFilters(filters: AuditLogFilter): Promise<{ data: AuditLogEntry[]; error: PostgrestError | null }> {
    const { data, error } = await supabase.rpc('search_audit_logs', {
      p_name: filters.name || null,
      p_action: filters.action || null,
      p_from: filters.fechaDesde || null,
      p_to: filters.fechaHasta || null,
    });
  
    return { data: data ?? [], error };
  }
}