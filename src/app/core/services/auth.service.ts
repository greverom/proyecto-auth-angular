import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { setUserData, setLoggedInStatus, setAdminStatus, unsetUserData } from '../store/user.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

  private mapSupabaseUser(user: any): User {
    const metadata = user.user_metadata ?? {}; 
    return {
      id: user.id,
      email: user.email ?? '',
      name: metadata.name ?? '',
      role: metadata.role ?? 'user',
      phone: metadata.phone ?? '', 
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

  async register(email: string, password: string, name: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'user',
          display_name: name 
        },
        emailRedirectTo: 'http://localhost:4200/dashboard' 
      }
    });
  
    if (error) throw error;
  
    const user = data.user;
    if (!user) throw new Error('No se pudo completar el registro.');
  
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

  async updateUserProfile(formData: any): Promise<User> {
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
  
    const user = this.mapSupabaseUser(data.user);
    const isAdmin = user.role.toLowerCase() === 'administrador';
  
    this.store.dispatch(setUserData({ data: user }));
    this.store.dispatch(setAdminStatus({ isAdmin }));
  
    return user;
  }


  async logout(): Promise<void> {
    await supabase.auth.signOut();
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this.store.dispatch(unsetUserData());
    this.store.dispatch(setLoggedInStatus({ isLoggedIn: false }));
    this.store.dispatch(setAdminStatus({ isAdmin: false }));
  }
}