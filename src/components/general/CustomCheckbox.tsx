import theme from "@/constants/theme";
import Checkbox from "expo-checkbox";
import { useController, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type CustomCheckboxProps = {
  name: string;
  label?: string;
};

export default function CustomCheckbox({ name, label }: CustomCheckboxProps) {
  const {
    field: { value, onChange },
  } = useController({ name });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <AntDesign name="right" size={15} color="black" />
        <Text
          style={{ fontWeight: "semibold", fontFamily: "ginto-medium" }}
          adjustsFontSizeToFit
        >
          {label}
        </Text>
      </View>

      <Checkbox
        value={value}
        onValueChange={onChange}
        style={{ padding: 10 }}
        color={theme.light.tint}
      />
    </View>
  );
}
