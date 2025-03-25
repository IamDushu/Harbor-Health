import theme from "@/constants/theme";
import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Messages",
          headerStyle: { backgroundColor: theme.light.tint },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen name="channel/[id]" options={{ title: "Chat" }} />
    </Stack>
  );
}
