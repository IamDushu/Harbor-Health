import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import theme from "@/constants/theme";

export default function videoChatSearch() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200 }}>
        <LottieView
          autoPlay
          source={require("../../../../../../assets/lottie/search.json")}
          style={[StyleSheet.absoluteFill]}
        />
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            color: theme.light.secondaryText,
          }}
        >
          Looking for a provider
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          Your visit will begin shortly. We look {"\n"}forward to speaking with
          you soon.
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          Please be sure you are in a safe, quiet{"\n"}space and ready to chat!
        </Text>
      </View>
      {/* <CustomButton
        title="Go to Room"
        onPress={() => router.push("(room)/1")}
      /> */}
    </View>
  );
}
