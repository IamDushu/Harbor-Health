import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const tintColorLight = "#e66362";
const tintColorDark = "#141c42";

export const SIZES = {
  width,
  height,
};

export default {
  light: {
    // text: "#3a8369",
    text: tintColorLight,
    secondaryText: "#333333",

    background: "#fff",
    tint: tintColorLight,
    // tint: "#3a8369",

    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    textInputBackground: "#f0f0f0",
  },
  dark: {
    text: "#fff",
    background: "#121212",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    textInputBackground: "#191919",
  },
};
