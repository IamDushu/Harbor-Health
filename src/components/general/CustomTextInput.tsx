import theme from "@/constants/theme";
import { ComponentProps } from "react";
import { useController } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

type CustomTextInput = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
  mask?: string;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  label,
  containerStyle,
  name,
  mask,
  ...textInputProps
}: CustomTextInput) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name });

  return (
    <View style={[containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {mask ? (
        <MaskedTextInput
          {...textInputProps}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          mask={mask}
          style={[
            styles.input,
            textInputProps.style,
            error?.message ? styles.errorInput : {},
          ]}
          autoCorrect={false}
        />
      ) : (
        <TextInput
          {...textInputProps}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={[
            styles.input,
            textInputProps.style,
            error?.message ? styles.errorInput : {},
          ]}
          autoCorrect={false}
        />
      )}
      {/* 
      <Text style={styles.error} numberOfLines={1}>
        {error?.message}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    paddingVertical: 10,
    borderRadius: 5,
    color: "#121c44",

    marginTop: 4,
    marginBottom: 2,
  },
  label: {
    fontWeight: "600",
    color: theme.light.tint,
    marginBottom: 5,
  },
  error: {
    color: "crimson",
    height: 17,
  },
  errorInput: {
    borderColor: "crimson",
  },
});
