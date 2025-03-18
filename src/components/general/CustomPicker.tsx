import theme from "@/constants/theme";
import { ComponentProps } from "react";
import { useController } from "react-hook-form";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type CustomPickerProps = {
  name: string;
  label?: string;
  description?: string;
} & Omit<ComponentProps<typeof RNPickerSelect>, "onValueChange">;

export default function CustomPicker({
  name,
  label,
  description,
  ...pickerProps
}: CustomPickerProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <View>
      {label && (
        <Text
          style={{
            fontWeight: "600",
            color: theme.light.tint,
            marginBottom: 3,
          }}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text style={{ fontSize: 12, color: "gray", marginBottom: 5 }}>
          {description}
        </Text>
      )}
      <RNPickerSelect
        {...pickerProps}
        value={value}
        onValueChange={onChange}
        onClose={onBlur}
        style={{
          viewContainer: {
            marginTop: 4,
            marginBottom: 2,
          },
          inputIOS: {
            borderColor: error?.message ? "crimson" : "gainsboro",
            borderWidth: 1,
            width: "100%",
            padding: 10,
            borderRadius: 5,
          },
          //was not opening earlier
          inputIOSContainer: { pointerEvents: "none" },
        }}
      />
      {/* <Text
        style={{
          color: "crimson",
          height: 17,
        }}
        numberOfLines={1}
      >
        {error?.message}
      </Text> */}
    </View>
  );
}
