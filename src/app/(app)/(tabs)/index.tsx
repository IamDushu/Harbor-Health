import OnDemandCare from "@/components/OnDemandCare";
import Reminders from "@/components/Reminders";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScheduleAppointment />
      <OnDemandCare />
      <Reminders />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
});
