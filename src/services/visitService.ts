import { Visit } from "@/types/models";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type CreateVisitArgs = {
  user_id: string;
  provider_id: string;
  location_id: string;
  date: string;
  start_time: string;
  notes: string;
};

export const bookNewVisit = async (visitData: CreateVisitArgs) => {
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

export const getUpcomingVisits = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_BASE_URL}/visits`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting upcoming visits:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to get upcoming visits."
    );
  }
};
