import LocationsNearby from "@/components/LocationsNearby";
import OnDemandCare from "@/components/OnDemandCare";
import Recommended from "@/components/Recommended";
import Reminders from "@/components/Reminders";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import UpcomingVisit from "@/components/UpcomingVisit";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeTab() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <View style={{ backgroundColor: "white" }}>
        <UpcomingVisit />
        <ScheduleAppointment />
      </View>
      <OnDemandCare />
      <Reminders />
      <Recommended />
      <LocationsNearby />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
