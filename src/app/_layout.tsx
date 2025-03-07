import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../context/auth";
import { Slot } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "gt-bold": require("../../assets/fonts/GT-Super-Display-Bold-Trial.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
