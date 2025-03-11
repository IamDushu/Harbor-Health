import HomeHeader from "@/components/HomeHeader";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router/stack";

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
        name="(booking)/bookingDetails"
        options={{
          headerTitle: "Book Visit",
        }}
      />
      <Stack.Screen
        name="(booking)/bookingSelect"
        options={{ headerTitle: "Book In-Office Visit" }}
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
