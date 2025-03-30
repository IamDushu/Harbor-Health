import CustomHeader from "@/components/general/CustomHeader";
import theme from "@/constants/theme";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PrescriptionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="prescription"
        options={{
          title: "",
          header: () => <CustomHeader title="Manage Prescriptions" />,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Renew Prescription",
          headerStyle: { backgroundColor: theme.light.tint },
          headerTintColor: "white",
          headerRight: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ marginRight: 15 }}
              hitSlop={10}
            >
              <AntDesign name="close" size={26} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
