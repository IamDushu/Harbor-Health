import Colors from "@/constants/Colors";
import { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import { Text } from "./Themed";

type CustomButtonProps = {
  title: string;
  type?: "fill" | "outline";
  width?: "full" | "fit";
} & ComponentProps<typeof Pressable>;

export default function CustomButton({
  title,
  type = "fill",
  width = "fit",
  ...pressableProps
}: CustomButtonProps) {
  const { style } = pressableProps;
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
    paddingVertical: 15,
    paddingHorizontal: 25,
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
  fillText: {
    color: "white",
  },
  outlineText: {
    color: Colors.light.tint,
  },
});
