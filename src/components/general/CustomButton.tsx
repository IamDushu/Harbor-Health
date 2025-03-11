import Colors from "@/constants/Colors";
import { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import { Text } from "./Themed";

type CustomButtonProps = {
  title: string;
  type?: "fill" | "outline";
  width?: "full" | "fit" | "fitNoMargin";
  disabled?: boolean;
} & ComponentProps<typeof Pressable>;

export default function CustomButton({
  title,
  type = "fill",
  width = "fit",
  disabled = false,
  ...pressableProps
}: CustomButtonProps) {
  return (
    <Pressable
      {...pressableProps}
      style={[
        styles.button,
        type === "fill" ? styles.fillButton : styles.outlineButton,
        width === "fit" && {
          alignSelf: "flex-start",
          marginHorizontal: "auto",
        },
        width === "fitNoMargin" && {
          alignSelf: "flex-start",
        },
        disabled === true && styles.disabledButton,
      ]}
    >
      <Text style={type === "fill" ? styles.fillText : styles.outlineText}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  fillButton: {
    backgroundColor: Colors.light.tint,
  },
  outlineButton: {
    backgroundColor: "white",
  },
  disabledButton: {
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
  fillText: {
    color: "white",
  },
  outlineText: {
    color: Colors.light.tint,
  },
});
