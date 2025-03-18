import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getUser = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting user:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Failed to get user.");
  }
};
