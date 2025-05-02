import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { setUserData, setLoggedInStatus, setAdminStatus, unsetUserData } from '../store/user.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

  private mapSupabaseUser(user: any): User {
    return {
      id: user.id,
      email: user.email ?? '',
      name: user.user_metadata?.['name'] ?? '',
      role: user.user_metadata?.['role'] ?? 'user',
      phone: user.phone ?? '',
      created_at: user.created_at ?? '',
      updated_at: user.updated_at ?? '',
      last_sign_in_at: user.last_sign_in_at ?? '',
      confirmed_at: user.confirmed_at ?? '',
    };
  }

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const user = data.user;
    if (!user) throw new Error('No se pudo recuperar la sesión.');
    // const token = session.access_token;
    // document.cookie = `auth_token=${token}; path=/; secure; samesite=Strict`;

    const userData = this.mapSupabaseUser(user);
    const isAdmin = userData.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: userData }));
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: true }));
    this.store.dispatch(setAdminStatus({ isAdmin }));

    return userData;
  }

  async restoreSession(): Promise<void> {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return;

    const userData = this.mapSupabaseUser(data.user);
    const isAdmin = userData.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: userData }));
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: true }));
    this.store.dispatch(setAdminStatus({ isAdmin }));
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this.store.dispatch(unsetUserData());
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: false }));
    this.store.dispatch(setAdminStatus({ isAdmin: false }));
  }
}