import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { setUserData, setLoggedInStatus, setAdminStatus, unsetUserData } from '../store/user.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

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

    const isAdmin = userData.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: userData }));
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: true }));
    this.store.dispatch(setAdminStatus({ isAdmin }));

    return userData;
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
    this.store.dispatch(unsetUserData());
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: false }));
    this.store.dispatch(setAdminStatus({ isAdmin: false }));
  }
}