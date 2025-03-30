import Colors from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs, usePathname } from "expo-router";

export default function TabLayout() {
  // const pathname = usePathname();
  // const hideTabBarScreens = ["/home/bookingConfirm"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        // tabBarInactiveTintColor: "white",
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTitleStyle: { color: "white" },
        // tabBarStyle: hideTabBarScreens.includes(pathname)
        //   ? {
        //       display: "none",
        //     }
        //   : {},
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: "Core Plan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="anchor" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="myHealth"
        options={{
          title: "My Health",
          headerShown: false,
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
