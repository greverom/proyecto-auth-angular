// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { Store } from '@ngrx/store';
import { setUserData, setLoggedInStatus, setAdminStatus, unsetUserData } from '../store/user.action';
import { User } from '../../shared/models/user.model';
import { mapSupabaseUser } from '../../shared/utils/map-supabase-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error('No se pudo recuperar la sesión.');

    const userData = mapSupabaseUser(user);
    const isAdmin = userData.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: userData }));
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: true }));
    this.store.dispatch(setAdminStatus({ isAdmin }));

    return userData;
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'user',
          display_name: name,
        },
        emailRedirectTo: 'http://localhost:4200/dashboard',
      },
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error('No se pudo completar el registro.');

    await supabase.auth.updateUser({
      data: {
        name,
        display_name: name,
      },
    });

    const userData = mapSupabaseUser(user);
    const isAdmin = userData.role.toLowerCase() === 'administrador';

    this.store.dispatch(setUserData({ data: userData }));
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: true }));
    this.store.dispatch(setAdminStatus({ isAdmin }));

    return userData;
  }

  async restoreSession(): Promise<void> {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return;

    const userData = mapSupabaseUser(data.user);
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