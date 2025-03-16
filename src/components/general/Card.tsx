import Colors from "@/constants/theme";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type CardProps = {
  title: string;
  children: React.ReactNode;
  href?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, children, style, href }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingTop: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontFamily: "ginto-medium",
    color: Colors.light.text,
    paddingHorizontal: 20,
  },
});
