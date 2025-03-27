import { StyleSheet, View } from "react-native";
import Card from "./general/Card";
import { Text } from "./general/Themed";
import Flask from "../../assets/icons/flask.svg";

export default function Reminders() {
  return (
    <Card title="Your Reminders">
      <View style={styles.reminderTab}>
        <View style={{ width: "70%" }}>
          <Text>Your lab results are now available</Text>
          <Text textType="light" style={{ marginTop: 5 }}>
            Full metabolic panel, Lipid test
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#63daae4f",
            padding: 10,
            borderRadius: 50,
            marginLeft: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flask width={35} height={35} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  reminderTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
