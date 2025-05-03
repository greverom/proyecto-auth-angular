import { Injectable } from '@angular/core';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase-client';
import { AuditLogEntry } from '../../shared/models/audi-log-entry.model';

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
}