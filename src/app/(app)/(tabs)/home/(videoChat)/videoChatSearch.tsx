import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import theme from "@/constants/theme";
import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useAuth } from "@/context/auth";
import * as Crypto from "expo-crypto";

export default function videoChatSearch() {
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!client) return;
    const createCall = async () => {
      const UUID = Crypto.randomUUID();

      try {
        const newCall = client.call("default", UUID);
        await newCall.getOrCreate({
          ring: true,
          data: {
            members: [
              { user_id: user.id },
              { user_id: "550e8500-e29b-41d4-a716-446655440041" },
            ],
          },
        });

        // Listen for provider joining
        newCall.on("call.session_participant_joined", (event) => {
          console.log("Provider joined:", event);
          const joinedUserId = event.participant.user.id;
          if (joinedUserId !== user.id) {
            console.log("Provider joined:", joinedUserId);
            router.push({
              pathname: `/(room)/${UUID}`,
            });
          }
        });

        setCall(newCall);
      } catch (error) {
        console.error("Error creating call:", error);
      }
    };

    createCall();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200, marginTop: 20 }}>
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
    </View>
  );
}
