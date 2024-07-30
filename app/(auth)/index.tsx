import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAuthStore } from "@/lib/store/authStore";
import { Link } from "expo-router";

const LoginScreen: React.FC = () => {
  const { loginWithGoogle, signOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Login with Google" onPress={loginWithGoogle} />
      <View style={{ marginTop: 20 }} />
      <Button title="Logout" onPress={() => signOut()} />
      <View style={{ marginTop: 20 }} />
      <Link href="/home">
        <Text>Home</Text>
      </Link>
    </View>
  );
};

export default LoginScreen;
