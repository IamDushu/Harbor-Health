import ScheduleAppointment from "@/components/ScheduleAppointment";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <ScheduleAppointment />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
