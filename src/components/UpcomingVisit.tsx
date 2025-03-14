import { View, Image } from "react-native";
import Luci from "../../assets/LuciLeykum.webp";
import { Text } from "./general/Themed";
import Colors from "@/constants/Colors";
import CustomButton from "./general/CustomButton";
import { router } from "expo-router";

export default function UpcomingVisit() {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.light.tint,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 30,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.07,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 3 }}>
            <Text>Upcoming in-office visit with Luci Leykum. MD</Text>
            <Text textType="medium" style={{ marginTop: 5 }}>
              Mon, Mar 10 4:00 PM
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              source={Luci}
              style={{
                borderRadius: 100,
                height: 60,
                width: 60,
                borderColor: Colors.light.tint,
                borderWidth: 2,
                padding: 3,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
          <CustomButton
            title="View Details"
            type="fill"
            width="fitNoMargin"
            onPress={() => router.push("/home/visitDetails")}
          />
          <CustomButton title="Modify" type="outline" width="fitNoMargin" />
        </View>
      </View>
    </View>
  );
}
