import { Image, Text, View } from "react-native";
import Luci from "../../../assets/LuciLeykum.webp";
import CustomButton from "@/components/general/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function BookingConfirm() {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}
    >
      <Image
        source={Luci}
        style={{
          borderRadius: "100%",
          height: 120,
          width: 120,
          marginHorizontal: "auto",
          marginVertical: 30,
        }}
      />
      <Text style={{ fontSize: 22 }}>Monday, March 10, 4:00 PM CST</Text>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 22, lineHeight: 40 }}>Luci Leykum, MD</Text>
        <Text style={{ fontSize: 18 }}>
          North Central Clinic{"\n"}
          911 W 38th St Suite 101{"\n"}
          Austin, TX
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
        <CustomButton title="Go Back" type="outline" width="full" />
        <CustomButton
          title="Confirm"
          width="full"
          onPress={() => router.replace("/home")}
        />
      </View>
    </SafeAreaView>
  );
}
