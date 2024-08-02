import { create } from "zustand";
import { LoginWithGoogleUseCase } from "@/lib/domain/usecases/loginWithGoogleUseCase";
import { SignOutUseCase } from "@/lib/domain/usecases/signOutUseCase";
import { AuthRepositoryImplement } from "@/lib/data/repositories/authRepositoryImplement";
import { AuthStateType } from "@/lib/types/authTypes";
import { router } from "expo-router";

const authRepository = new AuthRepositoryImplement();

export const useAuthStore = create<AuthStateType>((set) => ({
  user: null,
  loginWithGoogle: async () => {
    const loginWithGoogleUseCase = new LoginWithGoogleUseCase(authRepository);
    const result = await loginWithGoogleUseCase.execute();

    if (result._tag === "Left") {
      const error = result.left;
      console.error(error);
    } else {
      const user = result.right;
      set({ user });
      console.log("authStore", user);
      router.push("/home");
    }
  },
  signOut: async () => {
    const signOutUseCase = new SignOutUseCase(authRepository);
    await signOutUseCase.execute();
    set({ user: null });
    console.log("Logout success");
  },
}));
