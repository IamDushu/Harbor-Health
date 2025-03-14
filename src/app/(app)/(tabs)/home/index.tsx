import LocationsNearby from "@/components/LocationsNearby";
import OnDemandCare from "@/components/OnDemandCare";
import Recommended from "@/components/Recommended";
import Reminders from "@/components/Reminders";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import UpcomingVisit from "@/components/UpcomingVisit";
import Colors from "@/constants/Colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeTab() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={styles.container}>
        <View style={{ backgroundColor: "white" }}>
          <UpcomingVisit />
          <ScheduleAppointment />
        </View>
        <OnDemandCare />
        <Reminders />
        <Recommended />
        <LocationsNearby />
      </View>
      <View
        style={{ backgroundColor: "white", padding: 30, paddingVertical: 70 }}
      >
        <Text style={styles.moto}>Live {"\n"}it up!</Text>

        <Text
          style={{
            fontFamily: "ginto-medium",
            marginTop: 10,
            color: "gray",
            fontSize: 15,
            opacity: 0.9,
          }}
        >
          Crafted with 🩷 in Austin, Texas
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  moto: {
    fontSize: 80,
    fontFamily: "gt-bold",
    color: "#e66563af",
    letterSpacing: -2,
  },
});
