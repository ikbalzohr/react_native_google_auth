import { UserEntityType } from "@/lib/types/authTypes";

export interface AuthRepository {
  loginWithGoogle(): Promise<UserEntityType>;
  signOut(): Promise<void>;
}
