import { Pressable, StyleSheet, View } from "react-native";

import Card from "./general/Card";
import { Text } from "./general/Themed";
import { router } from "expo-router";

import Hospital from "../../assets/icons/office.svg";
import RemoteVisit from "../../assets/icons/remote.svg";

export default function ScheduleAppointment() {
  return (
    <Card title="Schedule an Appointment" style={{ paddingTop: 25 }}>
      <View style={[styles.optionsContainer]}>
        <Pressable
          onPress={() => router.push("/home/bookingDetails")}
          style={styles.option}
        >
          <View
            style={{
              backgroundColor: "#e659564b",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Hospital width={35} height={35} />
          </View>
          <Text>Office Visit</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/home/bookingDetails")}
          style={styles.option}
        >
          <View
            style={{
              backgroundColor: "#63daae4b",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <RemoteVisit width={35} height={35} />
          </View>
          <Text>Remote Visit</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  option: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    gap: 7,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.62,
    elevation: 4,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    gap: 12,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
