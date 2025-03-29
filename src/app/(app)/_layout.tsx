import Colors from "@/constants/theme";
import { Stack } from "expo-router/stack";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { OverlayProvider, Chat } from "stream-chat-expo";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { StreamChat } from "stream-chat";
import { logout } from "@/services/authService";
import Call from "@/components/CallScreen";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const chatClient = StreamChat.getInstance(STREAM_API_KEY!);

export default function AppEntry() {
  const { user, setIsAuthenticated, setUser } = useAuth();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!user) return;

    const connectUser = async () => {
      try {
        await chatClient.connectUser(
          {
            id: user.id.toString(),
            name: user.firstName,
            image: user?.image_url?.String,
          },
          user.streamToken
        );

        const videoUser: User = { id: user.id.toString() };

        const videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey: STREAM_API_KEY!,
          user: videoUser,
          token: user?.streamToken,
        });

        setVideoClient(videoClient);

        const channel = chatClient.channel("livestream", "public", {
          name: "Harbor Deck",
          image:
            "https://media.licdn.com/dms/image/v2/C560BAQFptmTG30YowQ/company-logo_200_200/company-logo_200_200/0/1661952558881?e=2147483647&v=beta&t=-emxzyud9VPhhEDB0UEW_C15pXRnF5Tl04j2CG5Bl-g",
        });
        await channel.create();
      } catch (error: any) {
        console.log("Error creating stream client: ", error);

        if (
          error?.message?.includes("userToken does not have a user_id") ||
          error?.message?.includes("not matching with user.id")
        ) {
          console.warn("Logging out due to Stream token mismatch");

          // Perform logout cleanup
          setUser?.(undefined);
          logout?.();
          setIsAuthenticated?.(false);
        }
      }
    };

    connectUser();

    return () => {
      chatClient?.disconnectUser();
      videoClient?.disconnectUser();
    };
  }, [user]);

  if (!user || !videoClient) {
    //Can use loading screen?
    return null;
  }

  return (
    <StreamVideo client={videoClient}>
      <OverlayProvider>
        <Chat client={chatClient}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: 99,
              pointerEvents: showOverlay ? "auto" : "none",
            }}
          >
            <Call setOverlayVisible={setShowOverlay} />
          </View>
          <Stack>
            <Stack.Screen name="(room)/[id]" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{ title: "Back", headerShown: false }}
            />
            <Stack.Screen
              name="bookingConfirm"
              options={{
                headerTitle: "Book Visit",
                headerStyle: { backgroundColor: Colors.light.tint },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="locationsMap"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </Chat>
      </OverlayProvider>
    </StreamVideo>
  );
}
