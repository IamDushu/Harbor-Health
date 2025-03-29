import LocationsNearby from "@/components/LocationsNearby";
import OnDemandCare from "@/components/OnDemandCare";
import Recommended from "@/components/Recommended";
import Reminders from "@/components/Reminders";
import ScheduleAppointment from "@/components/ScheduleAppointment";
import UpcomingVisits from "@/components/UpcomingVisit";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function HomeTab() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={animatedStyle}
    >
      <View style={styles.container}>
        <View style={{ backgroundColor: "white" }}>
          <UpcomingVisits />
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
          Crafted with 🩷 for Austin
        </Text>
      </View>
    </Animated.ScrollView>
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
