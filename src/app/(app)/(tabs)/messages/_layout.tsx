import theme from "@/constants/theme";
import { Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Messages",
          headerStyle: { backgroundColor: theme.light.tint },
          headerTintColor: "white",
          headerRight: () => (
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color="white"
            />
          ),
        }}
      />
      <Stack.Screen name="channel/[id]" options={{ title: "Chat" }} />
    </Stack>
  );
}
