import theme from "@/constants/theme";
import { useState } from "react";
import { useController } from "react-hook-form";
import { View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type CustomDateTimePickerProps = {
  name: string;
  label?: string;
  description?: string;
};

export default function CustomDateTimePicker({
  name,
  label,
  description,
}: CustomDateTimePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      {label && (
        <Text
          style={{
            fontWeight: "600",
            marginBottom: 3,
            color: theme.light.tint,
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
      <Text
        onPress={showDatePicker}
        style={{
          borderWidth: 1,
          borderColor: error?.message ? "crimson" : "gainsboro",
          padding: 10,
          borderRadius: 5,

          marginTop: 2,
          marginBottom: 2,
          color: "#121c44",
        }}
      >
        {value?.toLocaleDateString() || "Select a date"}
      </Text>
      {/* <Text
        style={{
          color: "crimson",
          height: 17,
        }}
        numberOfLines={1}
      >
        {error?.message}
      </Text> */}
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={value}
      />
    </View>
  );
}
