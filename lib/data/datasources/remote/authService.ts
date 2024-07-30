import { AuthenticationError } from "@/lib/common/failure";
import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";

export async function googleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          new AuthenticationError("AuthService - Login Cancelled");
          break;
        case statusCodes.IN_PROGRESS:
          new AuthenticationError("AuthService - Login in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          new AuthenticationError("AuthService - Play services not available");
          break;
        default:
          new AuthenticationError("AuthService - An unknown error occurred");
      }
    } else {
      new AuthenticationError(`AuthService - ${error}`);
    }
  }
}

export async function googleSignOut() {
  try {
    await GoogleSignin.signOut();
    console.log("logout sukses");
  } catch (error) {
    throw new AuthenticationError("An error occurred during sign out");
  }
}
