import { User } from '../models/user.model';

export function mapSupabaseUser(user: any): User {
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