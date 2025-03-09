import LocationsNearby from "@/components/LocationsNearby";
import OnDemandCare from "@/components/OnDemandCare";
import Recommended from "@/components/Recommended";
import Reminders from "@/components/Reminders";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ScheduleAppointment />
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
