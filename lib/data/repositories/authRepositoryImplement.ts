import { AuthRepository } from "@/lib/domain/repositories/authRepository";
import { UserEntity } from "@/lib/domain/entities/userEntity";
import * as authService from "@/lib/data/datasources/remote/authService";
import * as Failure from "@/lib/common/failure";
import { UserEntityType } from "@/lib/types/authTypes";

import { left, right } from "fp-ts/lib/Either";
import { Alert } from "react-native";

export class AuthRepositoryImplement implements AuthRepository {
  async loginWithGoogle(): Promise<UserEntityType> {
    try {
      const userInfo = await authService.googleSignIn();
      if (!userInfo) {
        Alert.alert("Error", "Login with Google Cancelled");
        return left(new Failure.AuthenticationError("AuthImplement - Login with Google Cancelled. User information is not available."));
      }

      const user: UserEntity = {
        id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        familyName: userInfo.user.familyName,
        givenName: userInfo.user.givenName,
        photo: userInfo.user.photo,
      };
      //
      // Handle token or session in here
      //
      Alert.alert("Success", "You are logged in with Google!");
      return right(user);
      //
    } catch (error: Error | any) {
      if (error.message.includes("network")) {
        return left(new Failure.NetworkError("AuthImplement - A network error occurred during Google login."));
      } else if (error.message.includes("validation")) {
        return left(new Failure.ValidationError("AuthImplement - A validation error occurred during Google login."));
      } else {
        return left(new Failure.ServerError("AuthImplement - An unknown error occurred during Google login."));
      }
    }
  }

  async signOut(): Promise<void> {
    // remove token or session in here
    await authService.googleSignOut();
  }
}
