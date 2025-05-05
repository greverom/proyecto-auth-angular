// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { Store } from '@ngrx/store';
import { setUserData, setAdminStatus } from '../store/user.action';
import { User } from '../../shared/models/user.model';
import { mapSupabaseUser } from '../../shared/utils/map-supabase-user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private store: Store) {}

  async updateUserProfile(formData: Partial<User>): Promise<User> {
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
        display_name: formData.name
      }
    });

    if (updateError) throw updateError;

    const { data, error: fetchError } = await supabase.auth.getUser();
    if (fetchError || !data.user) throw fetchError;

    const updatedUser = mapSupabaseUser(data.user);
    const isAdmin = updatedUser.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: updatedUser }));
    this.store.dispatch(setAdminStatus({ isAdmin }));

    return updatedUser;
  }

  async searchUsersByName(name: string): Promise<{ id: string; name: string }[]> {
    const { data, error } = await supabase.rpc('search_users_by_name', {
      search_text: name,
    });

    if (error) {
      console.error('Error buscando usuarios por nombre:', error);
      return [];
    }

    return data ?? [];
  }
}