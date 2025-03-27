import { useEffect, useState } from "react";
import { Channel as ChannelType } from "stream-chat";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { client } = useChatContext();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChannel = async () => {
      const _id = typeof id === "string" ? id : id[0];
      const channels = await client.queryChannels({ id: { $eq: _id } });
      setChannel(channels[0]);
      navigation.setOptions({ title: channels[0]._data?.name || "Chat" });
    };

    fetchChannel();
  }, [id]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </>
  );
}
