import { router } from "expo-router";

import { ChannelList } from "stream-chat-expo";

export default function Messages() {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/messages/channel/${channel.id}`)}
    />
  );
}
