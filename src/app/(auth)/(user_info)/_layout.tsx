import Progress from "@/components/animated/Progress";
import MemberFormProvider from "@/context/MemberFormProvider";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardInfoLayout() {
  return (
    <MemberFormProvider>
      <Progress height={10} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="personal_info" options={{ title: "Personal" }} />
        <Stack.Screen name="address_info" options={{ title: "Address" }} />
        <Stack.Screen name="terms_info" options={{ title: "Terms" }} />
      </Stack>
    </MemberFormProvider>
  );
}
