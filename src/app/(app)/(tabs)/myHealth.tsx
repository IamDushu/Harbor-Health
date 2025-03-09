import { View, Text, StyleSheet } from "react-native";

export default function MyHealthTab() {
  return (
    <View style={styles.container}>
      <Text>My Health</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
