import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Call,
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { Spinner } from "stream-chat-expo";

export default function VideoRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      const call = client!.call("default", id);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [call]);

  const goToHomeScreen = async () => {
    call?.endCall();
    router.replace("/home");
  };

  if (!call) return null;

  return (
    <View style={{ flex: 1 }}>
      {!call && <Spinner />}

      <StreamCall call={call}>
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </StreamCall>
    </View>
  );
}
