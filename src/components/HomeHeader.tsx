import { View, Text, Image, StyleSheet } from "react-native";
import profileImg from "../../assets/profile.jpeg";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/theme";

export default function HomeHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        {
          width: "100%",
          paddingHorizontal: 20,
          paddingBottom: 10,
          justifyContent: "space-between",
        },
      ]}
    >
      <View style={[styles.container, { gap: 15 }]}>
        <Image source={profileImg} style={[styles.profileImg]} />
        <Text style={[styles.headerFont]}>Chaithanya</Text>
      </View>
      <View>
        <FontAwesome6 size={20} name="gear" color={"white"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.tint,
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  headerFont: {
    fontFamily: "gt-bold",
    fontSize: 23,
    color: "white",
  },
});
