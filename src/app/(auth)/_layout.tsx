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
          headerTitle: "Login",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "white",
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
    </Stack>
  );
}
