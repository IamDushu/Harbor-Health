import { Image, Pressable, StyleSheet, View } from "react-native";
import harborBuilding from "../../assets/icons/building.png";
import remoteVisit from "../../assets/icons/remoteVisit.png";

import Card from "./general/Card";
import { Text } from "./general/Themed";
import { router } from "expo-router";

export default function ScheduleAppointment() {
  return (
    <Card title="Schedule an Appointment" style={{ paddingTop: 25 }}>
      <View style={[styles.optionsContainer]}>
        <Pressable
          onPress={() => router.push("/home/book")}
          style={styles.option}
        >
          <View
            style={{
              backgroundColor: "#3a8369bf",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
          </View>
          <Text>Office Visit</Text>
        </Pressable>
        <View style={styles.option}>
          <View
            style={{
              backgroundColor: "#e66563bf",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Image source={remoteVisit} style={[styles.icon]} />
          </View>
          <Text>Remote Visit</Text>
        </View>
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
