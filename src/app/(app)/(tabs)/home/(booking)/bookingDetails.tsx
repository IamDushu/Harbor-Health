import CustomButton from "@/components/general/CustomButton";
import { Text } from "@/components/general/Themed";
import Colors from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text as T,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getLocations } from "@/services/locationService";
import { useBooking } from "@/store";
import { Location } from "@/types/models";

export default function BookTab() {
  const [note, setNote] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [location, setLocation] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const setBooking = useBooking((state) => state.setVisitDetails);

  const pickerRef = useRef<RNPickerSelect | null>(null);

  const onNext = () => {
    if (isDisabled) {
      return;
    }
    setBooking({
      notes: note,
      location_id: location,
      location_addr: locations.find((loc) => loc.location_id === location)
        ?.address,
    });
    router.push("/home/bookingSelect");
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getLocations();
      setLocations(response);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    setIsDisabled(!note.trim() || !location);
  }, [note, location]);

  if (!locations) {
    return <ActivityIndicator />;
  }

  const selectedLocationName =
    locations.find((loc) => loc.location_id === location)?.name ||
    "Pick a Location";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <T style={{ padding: 20, paddingVertical: 10, fontSize: 14 }}>
          I would like to cover...
        </T>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TextInput
            placeholder="Ex. I have a fever"
            style={{
              padding: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 140,
              textAlignVertical: "top",
            }}
            value={note}
            onChangeText={(txt) => setNote(txt)}
            maxLength={200}
            multiline={true}
            numberOfLines={5}
          />
          <TouchableOpacity
            onPress={() => pickerRef.current?.togglePicker(true)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text>{selectedLocationName}</Text>
              <Text style={{ color: Colors.light.tint }}>
                {location ? "Update" : "Select"}
              </Text>
            </View>
          </TouchableOpacity>

          <RNPickerSelect
            ref={pickerRef}
            placeholder={{ label: "Select a Location" }}
            items={locations.map((location) => ({
              label: location.name,
              value: location.location_id,
            }))}
            value={location}
            onValueChange={setLocation}
            style={{
              inputAndroid: { display: "none" },
              inputIOS: {
                display: "none",
              },
              //was not opening earlier
              inputIOSContainer: { pointerEvents: "none" },
            }}
          />

          <View style={{ padding: 20, paddingHorizontal: 10 }}>
            <CustomButton
              width="full"
              title="Next"
              disabled={isDisabled}
              onPress={onNext}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
