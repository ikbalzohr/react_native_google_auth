import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/lib/store/authStore";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginScreen: React.FC = () => {
  const { loginWithGoogle, signOut } = useAuthStore();

  return (
    <StyledView className="items-center justify-center flex-1 }" style={{ backgroundColor: "black" }}>
      <StyledText className="text-3xl" style={{ color: "white" }}>
        Login Screen
      </StyledText>
      <TouchableOpacity className="p-3 mt-10 bg-white rounded-xl " onPress={() => loginWithGoogle()}>
        <Text>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3 mt-10 bg-white rounded-xl " onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </StyledView>
  );
};

export default LoginScreen;
