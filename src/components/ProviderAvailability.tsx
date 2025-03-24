import { router } from "expo-router";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import CustomButton from "./general/CustomButton";
import { Text } from "./general/Themed";
import { AvailableSlot, Provider } from "@/types/models";
import { useEffect, useState } from "react";
import { getProviderAvailability } from "@/services/providerService";
import dayjs from "dayjs";
import { useBooking } from "@/store";

export default function ProviderAvailability({
  provider,
  selectedDate,
}: {
  provider: Provider;
  selectedDate: Date | undefined;
}) {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[] | null>(
    []
  );

  const setVisit = useBooking((store) => store.setVisitDetails);

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

    const getAvailability = async () => {
      if (provider?.provider_id) {
        const response = await getProviderAvailability(
          provider.provider_id,
          formattedDate
        );
        setAvailableSlots(response.available_slots);
      }
    };

    getAvailability();
  }, [selectedDate]);

  const onNext = (start_time: string) => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    setVisit({
      date: formattedDate,
      start_time: start_time,
      provider_id: provider.provider_id,
      provider_firstName: provider.first_name,
      provider_lastName: provider.last_name,
      provider_img: provider.image_url?.String,
      provider_credentials: provider.credentials,
    });
    router.push("(app)/bookingConfirm");
  };

  return (
    <View
      style={{
        marginLeft: 20,
        paddingVertical: 20,
        gap: 20,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: provider.image_url?.String }}
          style={{ borderRadius: "50%", width: 60, height: 60 }}
        />
        <View>
          <Text>
            {provider.first_name} {provider.last_name}, {provider.credentials}
          </Text>
          <Text textType="light" style={{ marginTop: 2 }}>
            {provider.specialization}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 3, paddingLeft: 20 }}
        style={{
          marginLeft: -20,
        }}
      >
        {availableSlots && availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <CustomButton
              title={String(slot.start_time)}
              type="fill"
              style={{ paddingVertical: 0 }}
              onPress={() => onNext(slot.start_time)}
              key={`${slot.start_time}-${index}`}
            />
          ))
        ) : (
          <Text textType="light">No available slots</Text>
        )}
      </ScrollView>
    </View>
  );
}
