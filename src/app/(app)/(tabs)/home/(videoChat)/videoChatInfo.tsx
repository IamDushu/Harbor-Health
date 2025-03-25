import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";

export default function videoChatInfo() {
  return (
    <View>
      <Text>videoChatInfo</Text>
      <CustomButton
        title="Request Video Chat"
        onPress={() => router.push("/home/videoChatSearch")}
      />
    </View>
  );
}
