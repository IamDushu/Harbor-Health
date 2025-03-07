import { Stack } from "expo-router/stack";
import { AuthProvider } from "../context/auth";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
