// src/app/store/user.state.ts
import { User } from "../../shared/models/user.model";

export interface UserState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  data: User | null;
}
