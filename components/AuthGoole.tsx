import { GoogleSignin, GoogleSigninButton, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function AuthGoole() {
  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ["profile", "email"],
    });
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      //   setState({ userInfo, error: undefined });
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            console.log("cancelled");
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log("in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            console.log("not available");
            break;
          default:
            console.log(error);
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
      console.log("sukses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signIn();
        }}
        //   disabled={isInProgress}
      />

      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "red", fontSize: 20 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
