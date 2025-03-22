import theme from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const client = StreamChat.getInstance(STREAM_API_KEY!);

export default function ChatLayout() {
  const { user } = useAuth();

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user.id.toString(),
          name: user.firstName,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        user.streamToken
      );

      const channel = client.channel("livestream", "public", {
        name: "Support Team",
      });
      await channel.create();
    };

    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Messages",
              headerStyle: { backgroundColor: theme.light.tint },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen name="channel/[id]" options={{ title: "Chat" }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}
