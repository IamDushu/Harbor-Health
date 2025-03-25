import Colors from "@/constants/theme";
import { Stack } from "expo-router/stack";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const client = StreamChat.getInstance(STREAM_API_KEY!);

export default function AppEntry() {
  const { user } = useAuth();

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user.id.toString(),
          name: user.firstName,
          image: user?.image_url?.String,
        },
        user.streamToken
      );

      const channel = client.channel("livestream", "public", {
        name: "Harbor Deck",
        image:
          "https://media.licdn.com/dms/image/v2/C560BAQFptmTG30YowQ/company-logo_200_200/company-logo_200_200/0/1661952558881?e=2147483647&v=beta&t=-emxzyud9VPhhEDB0UEW_C15pXRnF5Tl04j2CG5Bl-g",
      });
      await channel.create();
    };

    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, [user]);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
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
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}
