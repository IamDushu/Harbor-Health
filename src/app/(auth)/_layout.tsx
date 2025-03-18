import Colors from "@/constants/theme";
import { Stack } from "expo-router/stack";

export default function AuthEntry() {
  return (
    <Stack>
      <Stack.Screen
        name="onboard"
        options={{ headerTitle: "Back", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#121c44",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "white",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OTPVerification"
        options={{
          headerTitle: "Verify OTP",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "white",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(user_info)"
        options={{
          headerTitle: "Harbor Health",
          headerStyle: { backgroundColor: "#121c44" },
          headerTintColor: "white",
          // headerShown: false,
        }}
      />
    </Stack>
  );
}
