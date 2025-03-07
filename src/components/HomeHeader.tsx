import { View, Text, Image, StyleSheet } from "react-native";
import profileImg from "../../assets/profile.jpeg";
import { FontAwesome6 } from "@expo/vector-icons";

export default function HomeHeader() {
  return (
    <View
      style={[
        styles.container,
        {
          width: "100%",
          justifyContent: "space-between",
        },
      ]}
    >
      <View style={[styles.container, { gap: 15 }]}>
        <Image source={profileImg} style={[styles.profileImg]} />
        <Text style={[styles.headerFont]}>Chaitu</Text>
      </View>
      <View>
        <FontAwesome6 size={25} name="gear" color={"white"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: "50%",
    borderColor: "white",
    borderWidth: 2,
  },
  headerFont: {
    fontFamily: "gt-bold",
    fontSize: 30,
    color: "white",
  },
});
