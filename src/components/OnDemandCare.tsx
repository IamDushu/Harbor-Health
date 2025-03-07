import Colors from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import ItemInfo from "./ItemInfo";

export default function OnDemandCare() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Get On-Demand Care</Text>
      <ItemInfo />
      <ItemInfo />
      <ItemInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "ginto-medium",
    color: Colors.light.text,
    padding: 20,
    paddingBottom: 0,
  },
  container: {
    width: "100%",
    backgroundColor: "white",
  },
});
