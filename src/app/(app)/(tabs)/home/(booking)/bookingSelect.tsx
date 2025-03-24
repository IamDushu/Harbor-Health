import { Text } from "@/components/general/Themed";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Text as T,
  TouchableOpacity,
  View,
} from "react-native";
import ProviderAvailability from "@/components/ProviderAvailability";
import { useEffect, useState } from "react";
import { getProvidersFromLocation } from "@/services/providerService";
import { useBooking } from "@/store";
import { Provider } from "@/types/models";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function BookingSelect() {
  const booking = useBooking((state) => state.visitBooking);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    dayjs().add(1, "day").toDate()
  );

  useEffect(() => {
    const fetchProviders = async () => {
      if (booking?.location_id) {
        const response = await getProvidersFromLocation(booking.location_id);
        setProviders(response);
      }
    };

    fetchProviders();
  }, [booking]);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(dayjs(date).startOf("day").toDate());
    setDatePickerVisible(false);
  };

  // TODO: Make this today after backend filtering is implemented
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
  const endOfYear = dayjs().endOf("year").toDate();

  const increaseDate = () => {
    const newDate = dayjs(selectedDate).add(1, "day");

    if (newDate.isAfter(dayjs(endOfYear))) return;

    setSelectedDate(newDate.toDate());
  };

  const decreaseDate = () => {
    const newDate = dayjs(selectedDate).subtract(1, "day");

    if (newDate.isBefore(dayjs(tomorrow).startOf("day"))) return;

    setSelectedDate(newDate.toDate());
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            flexDirection: "row",
          }}
        >
          <Pressable onPress={decreaseDate}>
            <AntDesign name="left" size={24} color="black" />
          </Pressable>
          <Text>
            {dayjs(selectedDate).format("ddd MMM D") || "Pick a Date"}
          </Text>
          <Pressable onPress={increaseDate}>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        date={selectedDate}
        minimumDate={tomorrow}
        maximumDate={endOfYear}
        display="inline"
      />

      <FlatList
        data={providers}
        keyExtractor={(item, index) =>
          item.provider_id ? item.provider_id.toString() : index.toString()
        }
        renderItem={({ item: provider }) => (
          <ProviderAvailability
            provider={provider}
            selectedDate={selectedDate}
          />
        )}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
        scrollEnabled
      />
    </KeyboardAvoidingView>
  );
}
