import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function BookVisitHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        {
          width: "100%",
          paddingHorizontal: 20,
          paddingBottom: 20,
        },
      ]}
    >
      <View style={[styles.container, { gap: 15 }]}>
        <Pressable onPress={() => router.back()} style={{ paddingVertical: 8 }}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
        <Text style={[styles.headerFont]}>Book Visit</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
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
    fontSize: 30,
    color: "white",
  },
});
