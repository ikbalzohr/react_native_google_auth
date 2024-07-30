import { View, Button, Alert } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const SignInButton = () => {
  const { loginWithGoogle, user } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ["profile", "email"],
    });
  }, [user]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      Alert.alert("Success", "You are logged in with Google!");
      console.log(user);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred during login");
    }
  };
  return (
    <View>
      <Button title="Login with Google" onPress={handleLogin} />
    </View>
  );
};

export default SignInButton;
