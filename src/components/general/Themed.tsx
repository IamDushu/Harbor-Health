import Colors from "@/constants/Colors";
import { Text as DefaultText, StyleSheet } from "react-native";

type TextProps = {
  textType?: "bold" | "light" | "medium";
} & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, textType = "bold", ...otherProps } = props;

  if (textType === "bold") {
    return <DefaultText style={[styles.boldText, style]} {...otherProps} />;
  }

  if (textType === "light") {
    return <DefaultText style={[styles.lightText, style]} {...otherProps} />;
  }

  if (textType === "medium") {
    return <DefaultText style={[styles.mediumText, style]} {...otherProps} />;
  }
}

const styles = StyleSheet.create({
  boldText: {
    fontFamily: "ginto-medium",
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  lightText: { fontSize: 14, color: "gray", fontWeight: "semibold" },
  mediumText: {},
});
