import HomeHeader from "@/components/HomeHeader";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router/stack";

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
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
        name="(booking)/bookingConfirm"
        options={{
          headerTitle: "Book Visit",
        }}
      />
    </Stack>
  );
}
