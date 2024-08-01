import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
// import { useAuthStore } from "@/lib/store/authStore";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginScreen: React.FC = () => {
  // const { loginWithGoogle, signOut } = useAuthStore();

  return (
    <StyledView className="bg-blue-500" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Login with Google" onPress={() => {}} />
      <View style={{ marginTop: 20 }} />
      <Button title="Logout" onPress={() => {}} />
      <View style={{ marginTop: 20 }} />
      <Link href="/home">
        <StyledText className="text-blue-600">Home</StyledText>
      </Link>
    </StyledView>
  );
};

export default LoginScreen;
