import HomeHeader from "@/components/HomeHeader";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerStyle: { backgroundColor: "#e66563" },
        headerTitleStyle: { color: "white" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerStyle: { height: 140, backgroundColor: "#e66563" },
          headerTitle: () => <HomeHeader />,
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: "Care",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
