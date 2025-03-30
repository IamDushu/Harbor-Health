import BookVisitHeader from "@/components/general/CustomHeader";
import theme from "@/constants/theme";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function VideoChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="videoChatInfo"
        options={{
          title: "Video Chat",
          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={28} color="white" />
              </Pressable>
            );
          },
          headerTintColor: "white",
          headerStyle: { backgroundColor: theme.light.tint },
        }}
      />
      <Stack.Screen
        name="videoChatSearch"
        options={{
          title: "Searching...",
          headerStyle: { backgroundColor: theme.light.tint },
          headerTintColor: "white",
          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={28} color="white" />
              </Pressable>
            );
          },
        }}
      />
    </Stack>
  );
}
