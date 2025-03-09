import ScheduleAppointment from "@/components/ScheduleAppointment";
import { ScrollView, StyleSheet } from "react-native";

export default function BookTab() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ScheduleAppointment />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
