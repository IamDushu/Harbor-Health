import BookVisitHeader from "@/components/BookVisitHeader";
import theme from "@/constants/theme";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

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
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ padding: 10 }}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
