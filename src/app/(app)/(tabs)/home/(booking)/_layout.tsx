import BookVisitHeader from "@/components/BookVisitHeader";
import theme from "@/constants/theme";
import { Stack } from "expo-router";

export default function OnboardInfoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="bookingDetails"
        options={{ title: "", header: () => <BookVisitHeader /> }}
      />
      <Stack.Screen
        name="bookingSelect"
        options={{
          title: "Book In-Office",
          headerStyle: { backgroundColor: theme.light.tint },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
