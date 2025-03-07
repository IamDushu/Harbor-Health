import { View, Text, Image, StyleSheet } from "react-native";
import harborBuilding from "../../assets/icons/building.png";
import remoteVisit from "../../assets/icons/remoteVisit.png";
import Colors from "@/constants/Colors";

export default function ScheduleAppointment() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule an Appointment</Text>
      <View style={[styles.optionsContainer]}>
        <View style={styles.option}>
          <View
            style={{
              backgroundColor: "#3a8369bf",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
          </View>
          <Text style={styles.optionText}>Office Visit</Text>
        </View>
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
          <Text style={styles.optionText}>Remote Visit</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    fontFamily: "ginto-medium",
    color: Colors.light.text,
  },
  optionText: {
    fontFamily: "ginto-medium",
    fontSize: 15,
    color: Colors.light.secondaryText,
  },
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
    paddingVertical: 25,
    gap: 12,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
