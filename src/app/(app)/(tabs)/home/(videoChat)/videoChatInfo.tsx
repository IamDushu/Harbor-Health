import { Image, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import Provider from "../../../../../../assets/provider.png";
import theme from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function videoChatInfo() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          marginVertical: 20,
          gap: 20,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
          }}
        >
          <Image
            source={Provider}
            style={{ width: 80, height: 80, margin: "auto" }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text
            style={{ fontSize: 22, color: theme.light.secondaryText }}
            numberOfLines={2}
            lineBreakStrategyIOS="hangul-word"
          >
            Speak with a {"\n"}Harbor provider
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: theme.light.secondaryText,
              lineHeight: 20,
            }}
          >
            If you need quick, reliable care for a time-sensitive concern. Get
            expert support when you need it most— no waiting, no hassle.
          </Text>
          <Text
            style={{
              color: theme.light.secondaryText,
              fontSize: 12,
              marginTop: 10,
            }}
          >
            For emergencies,{" "}
            <Text style={{ fontWeight: "bold", fontSize: 11 }}>
              please call 911
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingHorizontal: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <MaterialCommunityIcons
              name="progress-clock"
              size={30}
              color="gray"
              style={{ margin: "auto" }}
            />
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontSize: 14, color: "gray" }}>
              Available 24/7 for time-sensitive or {"\n"}non-life threatening
              medical concerns
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <AntDesign
              name="car"
              size={30}
              color="gray"
              style={{ margin: "auto" }}
            />
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontSize: 14, color: "gray" }}>
              Reduce unnecessary office visits, trips to the ER, or urgent care
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ marginTop: "auto", marginBottom: 20, paddingHorizontal: 15 }}
      >
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: "gray",
            marginBottom: 10,
            lineHeight: 15,
          }}
          lineBreakStrategyIOS="hangul-word"
        >
          By selecting "Request Video Chat" below I agree that I understand the
          risks and benefits of this telehealth consultation, and I consent to
          receive medical care and advice through a telehealth platform using a
          real-time video connection between my location and Harbor provider's
          location.
        </Text>
        <CustomButton
          title="Request Video Chat"
          onPress={() => router.push("/home/videoChatSearch")}
          width="full"
        />
      </View>
    </View>
  );
}
