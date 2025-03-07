import Colors from "@/constants/Colors";
import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import harborBuilding from "../../assets/icons/building.png";

export default function ItemInfo() {
  return (
    <>
      <View style={[styles.container, { marginVertical: 20 }]}>
        <View style={[styles.container, { gap: 10 }]}>
          <View
            style={{
              backgroundColor: "#3a8369bf",
              padding: 10,
              borderRadius: 50,
              marginLeft: 20,
            }}
          >
            <Image source={harborBuilding} style={[styles.icon]} />
          </View>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "semibold", marginBottom: 5 }}
            >
              Manage Prescriptions
            </Text>
            <Text
              style={{ fontSize: 14, color: "gray", fontWeight: "semibold" }}
            >
              Requests and renewals
            </Text>
          </View>
        </View>

        <AntDesign
          name="right"
          size={24}
          color="black"
          style={{ color: "lightgray", marginLeft: "auto", marginRight: 15 }}
        />
      </View>
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: "82%",
          marginLeft: "auto",
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
  },
});
