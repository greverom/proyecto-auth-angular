import { signalStore, withState, withMethods } from '@ngrx/signals';
import { WritableSignal } from '@angular/core';
import { User } from '../../shared/models/user.model';


export interface AuthState {
  user: User | null;
}

export const useAuthStore = signalStore(
  withState<AuthState>({
    user: null
  }),

  withMethods((ctx) => ({
    login(user: User) {
      (ctx.user as WritableSignal<User | null>).set(user);
    },

    logout() {
      (ctx.user as WritableSignal<User | null>).set(null); 
    },

    getUser() {
      return ctx.user();
    },

    isLoggedIn() {
      return !!ctx.user();
    }
  }))
);