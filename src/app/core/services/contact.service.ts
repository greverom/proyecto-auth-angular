import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { Contact } from '../../shared/models/contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private table = 'contacts';

  async getContactsByUser(userId: string): Promise<Contact[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createContact(contact: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
    const { data, error } = await supabase
      .from(this.table)
      .insert(contact)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await supabase
      .from(this.table)
      .update(contact)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteContact(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
