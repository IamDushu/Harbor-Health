import { Visit } from "@/types/models";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const bookNewVisit = async (visitData: Visit) => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(`${API_BASE_URL}/visits`, visitData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error Booking new Visit",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Failed to book visit.");
  }
};
