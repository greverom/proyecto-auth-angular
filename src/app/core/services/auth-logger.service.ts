import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggerService {
  async logUserAction(action: 'LOGIN' | 'LOGOUT', userId: string, userName: string): Promise<void> {
    try {
      await supabase.from('audit_log').insert([
        {
          action,
          table_name: 'auth',
          record_id: null,
          performed_by: userId,
          name: userName,
        },
      ]);
    } catch (err) {
      console.error(`Error registrando acción ${action}:`, err);
    }
  }
}