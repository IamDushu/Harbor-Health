import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";

export default function videoChatSearch() {
  return (
    <View>
      <Text>videoChatSearch</Text>

      <CustomButton
        title="Go to Room"
        onPress={() => router.push("(room)/1")}
      />
    </View>
  );
}
