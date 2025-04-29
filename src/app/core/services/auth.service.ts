import { Injectable, inject } from '@angular/core';
import { supabase } from '../supabase-client';
import { useAuthStore } from '../store/auth.store';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authStore = inject(useAuthStore);

  async login(email: string, password: string): Promise<void> {
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

    this.authStore.login(userData);
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
    this.authStore.logout();
  }


  getUser(): User | null {
    return this.authStore.getUser();
  }


  isLoggedIn(): boolean {
    return this.authStore.isLoggedIn();
  }
}