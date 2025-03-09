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
      <Stack.Screen name="book" options={{ headerTitle: "Book Visit" }} />
    </Stack>
  );
}
