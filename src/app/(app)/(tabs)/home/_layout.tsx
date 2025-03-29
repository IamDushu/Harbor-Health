import HomeHeader from "@/components/HomeHeader";
import Colors from "@/constants/theme";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen
        name="(booking)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(videoChat)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="visitDetails"
        options={{
          headerTitle: "Visit Details",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "white",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
