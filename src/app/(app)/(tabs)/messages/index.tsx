import { useAuth } from "@/context/auth";
import { router } from "expo-router";

import { ChannelList } from "stream-chat-expo";

export default function Messages() {
  const { user } = useAuth();

  const isPrivate = {
    type: "messaging",
    members: { $in: [user?.id.toString()] },
  };
  const isPublic = { type: "livestream" };

  return (
    <ChannelList
      filters={{ $or: [isPrivate, isPublic] }}
      onSelect={(channel) => router.push(`/messages/channel/${channel.id}`)}
    />
  );
}
