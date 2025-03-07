import OnDemandCare from "@/components/OnDemandCare";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <ScheduleAppointment />
      <OnDemandCare />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
});
