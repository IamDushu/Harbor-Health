import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Location } from "@/types/models";
import { getLocations } from "@/services/locationService";
import Truck from "../../../assets/truck.png";
import MapLocationItem from "@/components/MapLocationItem";
import theme from "@/constants/theme";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../../assets/lottie/marker.json";

export default function LocationsMap() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const snapPoints = useMemo(() => [78, "50%"], []);

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);

    mapRef.current?.animateToRegion(
      {
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      350
    );

    bottomSheetRef.current?.collapse();
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocations();
        setLocations(response);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  if (loadingLocations) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={loadingAnimation}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 30.26734,
          longitude: -97.73704,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        mapType="standard"
        onPress={(event) => {
          if (event.nativeEvent.action !== "marker-press") {
            setSelectedLocation(undefined);
          }
        }}
      >
        {locations.map((location) => {
          return (
            <Marker
              key={location.location_id}
              coordinate={{
                latitude: Number(location.latitude),
                longitude: Number(location.longitude),
              }}
              title={location.name}
              onPress={() => {
                setSelectedLocation(location);

                mapRef.current?.animateToRegion(
                  {
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  },
                  350
                );
              }}
            />
          );
        })}
        <Marker
          key="truck"
          coordinate={{
            latitude: 30.21995,
            longitude: -97.75721,
          }}
          title="Mobile Clinic"
        >
          <View style={styles.truck}>
            <Image source={Truck} style={styles.truck} />
          </View>
        </Marker>
      </MapView>
      {/* Location display  */}
      {selectedLocation && (
        <View
          style={{ position: "absolute", bottom: 100, right: 10, left: 10 }}
        >
          <MapLocationItem
            key={selectedLocation.location_id}
            location={selectedLocation}
            setSelectedLocation={handleSelectLocation}
          />
        </View>
      )}
      <Pressable
        style={{
          position: "absolute",
          top: 70,
          left: 10,
          backgroundColor: theme.light.tint,
          borderRadius: 20,
          padding: 6,
          paddingHorizontal: 10,
          marginLeft: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => router.back()}
        pointerEvents="box-only"
      >
        <AntDesign name="arrowleft" size={24} color="white" />
        <Text style={{ color: "white", fontWeight: "bold" }}>Back</Text>
      </Pressable>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        containerStyle={{ marginTop: 200 }}
        ref={bottomSheetRef}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: 500,
            marginVertical: 10,
            textAlign: "center",
            color: theme.light.tint,
          }}
        >
          Over {locations.length} Locations
        </Text>
        <BottomSheetFlatList
          data={locations}
          renderItem={({ item }) => (
            <MapLocationItem
              location={item}
              setSelectedLocation={handleSelectLocation}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            padding: 10,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  truck: {
    width: 70,
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
