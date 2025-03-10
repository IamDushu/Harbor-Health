import HomeHeader from "@/components/HomeHeader";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, usePathname } from "expo-router";

export default function TabLayout() {
  const pathname = usePathname();

  const hideTabBarScreens = ["/home/bookingConfirm"];
  // console.log(pathname);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        // tabBarInactiveTintColor: "white",
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTitleStyle: { color: "white" },
        tabBarStyle: hideTabBarScreens.includes(pathname)
          ? {
              display: "none",
            }
          : {},
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: "Core Plan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="health-and-safety" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myHealth"
        options={{
          title: "My Health",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="insert-chart-outlined"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
