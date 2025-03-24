import { Alert, Image, Text, View } from "react-native";
import CustomButton from "@/components/general/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useBooking } from "@/store";
import dayjs from "dayjs";
import { bookNewVisit, CreateVisitArgs } from "@/services/visitService";
import { useAuth } from "@/context/auth";

export default function BookingConfirm() {
  const visit = useBooking((store) => store.visitBooking);
  const { user } = useAuth();
  const resetVisit = useBooking((store) => store.resetVisit);

  const onConfirm = async () => {
    try {
      const newVisit: CreateVisitArgs = {
        user_id: user?.id ?? "",
        provider_id: visit?.provider_id ?? "",
        location_id: visit?.location_id ?? "",
        date: visit?.date ?? "",
        start_time: visit?.start_time ?? "",
        notes: visit?.notes ?? "",
      };

      await bookNewVisit(newVisit);

      resetVisit();

      await router.replace("/home");
    } catch (error) {
      console.error("Booking failed:", error);
      Alert.alert(
        "Booking Error",
        "An error occurred while trying to book your visit. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };

  const formattedDate = dayjs(visit?.date).format("dddd, MMMM D");

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}
    >
      <Image
        source={{ uri: visit?.provider_img }}
        style={{
          borderRadius: "100%",
          height: 120,
          width: 120,
          marginHorizontal: "auto",
          marginVertical: 30,
        }}
      />
      <Text style={{ fontSize: 22 }} adjustsFontSizeToFit>
        {formattedDate}, {visit?.start_time} CST
      </Text>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 19, lineHeight: 40 }} adjustsFontSizeToFit>
          {visit?.provider_firstName} {visit?.provider_lastName},{" "}
          {visit?.provider_credentials}
        </Text>
        <Text
          style={{ fontSize: 18, width: "50%" }}
          lineBreakStrategyIOS="hangul-word"
        >
          {visit?.location_addr}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginVertical: 10,
          color: "gray",
        }}
      >
        Please arrive 5 minutes before your visit to allow for check in.
      </Text>
      <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
        Should you need to cancel, please do so at least 24 hours in advance.
      </Text>
      <View style={{ gap: 15, marginTop: "auto" }}>
        <CustomButton
          title="Go Back"
          type="outline"
          width="full"
          onPress={() => router.back()}
        />
        <CustomButton title="Confirm" width="full" onPress={onConfirm} />
      </View>
    </SafeAreaView>
  );
}
