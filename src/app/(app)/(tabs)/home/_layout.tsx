import HomeHeader from "@/components/HomeHeader";
import Colors from "@/constants/theme";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

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
        }}
      />
    </Stack>
  );
}
