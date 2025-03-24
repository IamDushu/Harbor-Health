import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getProvidersFromLocation = async (locationId: string) => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(
      `${API_BASE_URL}/providers?location_id=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting providers:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to get providers."
    );
  }
};

export const getProviderAvailability = async (
  providerId: string,
  date: string
) => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(
      `${API_BASE_URL}/providers/${providerId}/availability?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting provider availability:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to get provider availability."
    );
  }
};
