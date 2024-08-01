import { AuthenticationError } from "@/lib/common/failure";
import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";

export async function googleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error instanceof Error && isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          throw new AuthenticationError("AuthService - Login Cancelled");
        case statusCodes.IN_PROGRESS:
          throw new AuthenticationError("AuthService - Login in progress");
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new AuthenticationError("AuthService - Play services not available");
        default:
          throw new AuthenticationError("AuthService - An unknown error occurred");
      }
    } else {
      throw new AuthenticationError(`AuthService - ${error}`);
    }
  }
}

export async function googleSignOut() {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    throw new AuthenticationError("An error occurred during sign out");
  }
}
