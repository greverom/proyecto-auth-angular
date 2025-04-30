import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';


export const setAdminStatus = createAction(
  '[User] Set Admin Status',
  props<{ isAdmin: boolean }>()
);

export const setLoggedInStatus = createAction(
  '[User] Set Logged In Status',
  props<{ isLoggedIn: boolean }>()
);

export const setUserData = createAction(
  '[User] Set Data In Status',
  props<{ data: User | null }>()
);

export const unsetUserData = createAction(
  '[User] Unset Data In Status',
);
