import {
  View,
  Text as T,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import northCentral from "../../../../../assets/northCentral.jpg";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/general/Themed";
import Colors from "@/constants/Colors";
import harborBuilding from "../../../../../assets/icons/building.png";
import Luci from "../../../../../assets/LuciLeykum.webp";
import MapView, { Marker } from "react-native-maps";

export default function visitDetails() {
  const clinicLocation = {
    latitude: 30.30482,
    longitude: -97.74298,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const openMaps = () => {
    const { latitude, longitude } = clinicLocation;
    const url = Platform.select({
      ios: `maps://app?saddr=Current+Location&daddr=${latitude},${longitude}`, // Opens Apple Maps
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`, // Opens Google Maps
    });

    url && Linking.openURL(url);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View style={{ height: 220, position: "relative" }}>
        <Image
          source={northCentral}
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
            4:00 PM CST
          </T>
          <T style={{ color: "white", fontSize: 20, opacity: 0.8 }}>
            Monday, March 10
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
        <Pressable style={{ width: 50 }}>
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              height: 50,
              width: 50,
              borderRadius: "100%",
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
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
        <Pressable style={{ width: 50 }}>
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              height: 50,
              width: 50,
              borderRadius: "100%",
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
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
        <Pressable style={{ width: 50 }}>
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              height: 50,
              width: 50,
              borderRadius: "100%",
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
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
        <Pressable style={{ width: 50 }}>
          <View
            style={{
              backgroundColor: "#e6656333",
              padding: 10,
              height: 50,
              width: 50,
              borderRadius: "100%",
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
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
            source={Luci}
            style={{
              borderRadius: 100,
              height: 60,
              width: 60,
            }}
          />
        </View>
        <View>
          <Text>Luci Leykum. MD</Text>
          <Text textType="light" style={{ marginTop: 2 }}>
            North Central Clinic{"\n"}
            911 W 38th St Suite 101{"\n"}
            Austin, TX
          </Text>
        </View>
      </View>
      <MapView style={styles.map} initialRegion={clinicLocation}>
        <Marker
          coordinate={clinicLocation}
          title="North Central Clinic"
          description="911 W 38th St Suite 101, Austin, TX"
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
