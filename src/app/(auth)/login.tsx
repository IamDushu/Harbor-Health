import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HarborLogo from "../../../assets/icons/harbor_logo.svg";
import theme from "@/constants/theme";
import CustomButton from "@/components/general/CustomButton";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <HarborLogo height={60} width={180} style={{ margin: 10 }} /> */}
      <Text
        style={{
          fontFamily: "gt-bold",
          fontSize: 34,
          lineHeight: 35,
          color: "#121c44",
          letterSpacing: 1,
          textAlign: "center",
          marginTop: 80,
        }}
      >
        Welcome back!
      </Text>
      <View style={{ width: "90%", marginHorizontal: "auto", gap: 10 }}>
        <Text style={{ fontWeight: 500, color: "#121c44" }}>
          Verify your Email address
        </Text>
        <TextInput
          placeholder="email"
          style={{
            borderColor: "gray",
            height: "auto",
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            padding: 15,
          }}
          keyboardType="email-address"
        />
      </View>
      <View style={{ width: "90%", marginHorizontal: "auto" }}>
        <CustomButton title="Get OTP" width="full" broadRadius={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 30,
  },
});
