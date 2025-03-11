import Colors from "@/constants/Colors";
import { Stack } from "expo-router/stack";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="bookingConfirm"
        options={{
          headerTitle: "Book Visit",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
