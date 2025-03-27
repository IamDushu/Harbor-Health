import {
  View,
  Text as T,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/general/Themed";
import Colors from "@/constants/theme";
import MapView, { Marker } from "react-native-maps";

import Pencil from "../../../../../assets/icons/pencil.svg";
import AddCalendar from "../../../../../assets/icons/addCalendar.svg";
import PhoneCall from "../../../../../assets/icons/call.svg";
import Direction from "../../../../../assets/icons/direction.svg";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getUpcomingVisitInfo } from "@/services/visitService";
import { VisitInfo } from "@/types/models";
import dayjs from "dayjs";
import * as Calendar from "expo-calendar";

export default function visitDetails() {
  const { visit_id } = useLocalSearchParams();
  const [visitInfo, setVisitInfo] = useState<VisitInfo>();

  useEffect(() => {
    const fetchVisitInfo = async () => {
      const _id = typeof visit_id === "string" ? visit_id : visit_id[0];
      const response = await getUpcomingVisitInfo(_id);
      setVisitInfo(response);
    };

    fetchVisitInfo();
  }, []);

  if (!visitInfo) {
    return <ActivityIndicator />;
  }

  console.log(visitInfo);

  const clinicLocation = {
    latitude: visitInfo?.latitude ? parseFloat(visitInfo.latitude) : 0,
    longitude: visitInfo?.longitude ? parseFloat(visitInfo.longitude) : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const formattedTime = dayjs.utc(visitInfo.visit_time).format("h:mm A");

  const formattedDay = dayjs.utc(visitInfo.visit_time).format("dddd, MMM D");

  const openMaps = () => {
    const { latitude, longitude } = clinicLocation;
    const url = Platform.select({
      ios: `maps://app?saddr=Current+Location&daddr=${latitude},${longitude}`, // Opens Apple Maps
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`, // Opens Google Maps
    });

    url && Linking.openURL(url);
  };

  const handlePhonePress = (phoneNumber: string | undefined) => {
    const phoneNumbers = "+18554818375";
    if (!phoneNumber) {
      return;
    }
    const url = `tel:${phoneNumbers}`;

    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Unable to open phone dialer")
    );
  };

  const addBookingToCalendar = async () => {
    try {
      if (!visitInfo?.visit_time) {
        Alert.alert("Error", "No visit time available.");
        return;
      }

      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Calendar access is required to add the event."
        );
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      const defaultCalendar =
        calendars.find((cal) => cal.allowsModifications) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert("No Calendar Found", "Please create a calendar first.");
        return;
      }

      const startDate = new Date(visitInfo.visit_time);
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

      const eventDetails = {
        title: "Booking Confirmation - Harbor Deck",
        startDate: startDate,
        endDate: endDate,
        timeZone: "UTC",
        location: visitInfo.location_address,
        notes: "This is a confirmation of your booking at Harbor Deck.",
      };

      const eventId = await Calendar.createEventAsync(
        defaultCalendar.id,
        eventDetails
      );
      Alert.alert("Success", "Event added to your calendar!");
    } catch (error) {
      console.error("Error adding to calendar:", error);
      Alert.alert("Error", "Could not add the event to your calendar.");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View style={{ height: 220, position: "relative" }}>
        <Image
          source={{ uri: visitInfo.location_image?.String }}
          style={{ height: "100%", width: "100%" }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: 0,
          }}
        />
        <View style={{ position: "absolute", bottom: 20, left: 20 }}>
          <T style={{ color: "white", fontSize: 20, opacity: 0.8 }}>
            {formattedTime} CST
          </T>
          <T style={{ color: "white", fontSize: 20, opacity: 0.8 }}>
            {formattedDay}
          </T>
        </View>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "#e6656313",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>Let's Confirm</Text>
          <Text textType="light">Save time at the office</Text>
        </View>
        <Text style={{ color: Colors.light.tint }}>Review</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{ width: 50, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pencil width={35} height={35} />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.light.tint,
              fontSize: 12,
              marginTop: 5,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Modify Visit
          </Text>
        </Pressable>
        <Pressable
          style={{ width: 50, alignItems: "center", justifyContent: "center" }}
          onPress={() => handlePhonePress(visitInfo.location_phone)}
        >
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneCall width={35} height={35} />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.light.tint,
              fontSize: 12,
              marginTop: 5,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Call Office
          </Text>
        </Pressable>
        <Pressable
          style={{ width: 50, alignItems: "center", justifyContent: "center" }}
          onPress={addBookingToCalendar}
        >
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddCalendar width={35} height={35} />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.light.tint,
              fontSize: 12,
              marginTop: 5,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Add to Calendar
          </Text>
        </Pressable>
        <Pressable
          style={{ width: 50, alignItems: "center", justifyContent: "center" }}
          onPress={openMaps}
        >
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Direction width={35} height={35} />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.light.tint,
              fontSize: 12,
              marginTop: 5,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Get Directions
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          paddingVertical: 10,
          alignItems: "center",
          gap: 20,
        }}
      >
        <View>
          <Image
            source={{ uri: visitInfo.provider_image?.String }}
            style={{
              borderRadius: 100,
              height: 60,
              width: 60,
            }}
          />
        </View>
        <View>
          <Text>
            {visitInfo.provider_name}. {visitInfo.provider_credentials}
          </Text>
          <Text
            textType="light"
            style={{ width: "50%" }}
            lineBreakStrategyIOS="hangul-word"
          >
            {visitInfo.location_address}
          </Text>
        </View>
      </View>
      <MapView style={styles.map} initialRegion={clinicLocation}>
        <Marker
          coordinate={clinicLocation}
          title={visitInfo.location_name}
          description={visitInfo.location_address}
          onPress={openMaps}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    height: 300,
  },
});
