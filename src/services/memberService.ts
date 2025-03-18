import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type CreateNewMemberArgs = {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: "male" | "female";
  address_line_one: string;
  address_line_two: string;
  insurance: string;
  accepted_terms: boolean;
};

export const createNewMember = async (memberData: CreateNewMemberArgs) => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(`${API_BASE_URL}/members`, memberData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating new member:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to create member."
    );
  }
};
