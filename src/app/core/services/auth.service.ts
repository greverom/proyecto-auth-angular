import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    const { user } = data;
    if (!user) throw new Error('No se pudo recuperar información del usuario.');

    const userData: User = {
      id: user.id,
      email: user.email ?? '',
      name: user.user_metadata?.['name'] ?? '',
      role: user.user_metadata?.['role'] ?? 'user',
    };

    return userData; 
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }
}