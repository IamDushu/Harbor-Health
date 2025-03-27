import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  Call,
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams } from "expo-router";

const VideoCallUI = () => {
  const { id: callId } = useLocalSearchParams<{ id: string }>();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const hasJoinedRef = useRef(false);
  const didEndCallRef = useRef(false);

  const goToHomeScreen = async () => {
    try {
      didEndCallRef.current = true;
      await call?.endCall();
    } catch (e) {
      console.warn("Error ending call:", e);
    }

    router.replace("/(tabs)/home");
  };

  useEffect(() => {
    if (!client || !callId || hasJoinedRef.current) return;

    console.log("Running");
    const joinExistingCall = async () => {
      try {
        const existingCall = client.call("default", callId);
        await existingCall.join();
        setCall(existingCall);
        console.log(
          "Participants in room:",
          Array.from(existingCall.state.participants.keys())
        );
        hasJoinedRef.current = true;
      } catch (error) {
        console.error("Failed to join existing call:", error);
      }
    };

    joinExistingCall();
  }, [client, callId]);

  useEffect(() => {
    if (!call) return;

    const handleCallEnded = () => {
      if (didEndCallRef.current) return;
      router.replace("/(tabs)/home");
    };

    call.on("call.ended", handleCallEnded);

    return () => {
      call.off("call.ended", handleCallEnded);
    };
  }, [call]);

  if (!call) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <CallContent onHangupCallHandler={goToHomeScreen} />
    </StreamCall>
  );
};

export default VideoCallUI;
