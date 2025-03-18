import { useAuth } from "@/context/auth";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const saveToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

export const getToken = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const removeToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const requestAuth = async (
  email: string,
  mode: "login" | "signup"
): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL!}/registration/email`, {
      email,
      mode,
    });
    return response.data.token;
  } catch (error: any) {
    console.error(
      "Error requesting auth:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const verifyOTP = async (
  token: string,
  digits: string
): Promise<any | null> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/registration/email/verify`,
      {
        token,
        digits,
      }
    );

    await saveToken("access_token", response.data.access_token);
    await saveToken("refresh_token", response.data.refresh_token);
    await saveToken("session_id", response.data.session_id);
    await saveToken("email", response.data.email);

    return response.data;
  } catch (error: any) {
    console.error(
      "OTP Verification Failed:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = await getToken("access_token");
  return accessToken !== null;
};

export const logout = async () => {
  await removeToken("access_token");
  await removeToken("refresh_token");
  await removeToken("session_id");
  await removeToken("email");
};
