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
    >
      <ScheduleAppointment />
      <OnDemandCare />
      <Reminders />
      <Recommended />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
