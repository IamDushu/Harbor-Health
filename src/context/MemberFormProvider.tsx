import { createNewMember } from "@/services/memberService";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Alert } from "react-native";
import { z } from "zod";
import * as SecureStore from "expo-secure-store";
import { useAuth, User } from "./auth";
import { getUser } from "@/services/userService";
import { unMask } from "react-native-mask-text";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const PersonalInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty({ message: "First name is required!" }),

  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nonempty({ message: "Last name is required!" }),

  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => {
        const unmaskedPhoneNumber = unMask(value);
        return unmaskedPhoneNumber.length >= 10;
      },
      { message: "Phone number must be at least 10 digits" }
    )
    .refine(
      (value) => {
        const unmaskedPhoneNumber = unMask(value);
        return /^\d+$/.test(unmaskedPhoneNumber);
      },
      { message: "Phone number must contain only digits" }
    ),

  dateOfBirth: z
    .date({ required_error: "Date of birth is required" })
    .refine((date) => date <= eighteenYearsAgo, {
      message: "You must be at least 18 years old",
    }),

  gender: z.string(),
});

export const AddressInfoSchema = z.object({
  address_line_one: z
    .string({ message: "Address is required!" })
    .trim()
    .min(5, { message: "Please provide your address!" })
    .nonempty({ message: "Address is required!" }),
  address_line_two: z
    .string({ message: "Address is required!" })
    .min(5, { message: "Please provide your address!" })
    .nonempty({ message: "Address is required!" }),
  insurance: z.string({ message: "Insurance is required!" }).nonempty(),
});

export const TermsInfoSchema = z.object({
  accepted_terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type AddressInfo = z.infer<typeof AddressInfoSchema>;
export type TermsInfo = z.infer<typeof TermsInfoSchema>;

type MemberFormContext = {
  personalInfo: PersonalInfo | undefined;
  addressInfo: AddressInfo | undefined;
  termsInfo: TermsInfo | undefined;
  setPersonalInfo: (val: PersonalInfo | undefined) => void;
  setAddressInfo: (val: AddressInfo | undefined) => void;
  setTermsInfo: (val: TermsInfo | undefined) => void;
  onSubmit: (val: TermsInfo) => void;
};

const memberFormContext = createContext<MemberFormContext>({
  personalInfo: undefined,
  addressInfo: undefined,
  termsInfo: undefined,
  setPersonalInfo: () => {},
  setAddressInfo: () => {},
  setTermsInfo: () => {},
  onSubmit: () => {},
});

export default function MemberFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [addressInfo, setAddressInfo] = useState<AddressInfo | undefined>();
  const [termsInfo, setTermsInfo] = useState<TermsInfo | undefined>();

  const { setUser, setIsAuthenticated } = useAuth();

  //passing termsData here as termsInfo is not updated when we call this function.
  const onSubmit = async (termsData?: TermsInfo) => {
    if (!personalInfo || !addressInfo || !termsData) {
      Alert.alert("Error", "Please complete all required fields.");
      return;
    }

    // send form data to the server

    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      if (!accessToken) {
        Alert.alert("Error", "No access token found. Please log in.");
        return;
      }

      const unmaskedPhoneNumber = "+1" + unMask(personalInfo.phoneNumber);

      const newMemberData = {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        phone_number: unmaskedPhoneNumber,
        date_of_birth: personalInfo.dateOfBirth.toISOString(),
        gender: personalInfo.gender as "male" | "female",
        address_line_one: addressInfo.address_line_one,
        address_line_two: addressInfo.address_line_two,
        insurance: addressInfo.insurance,
        accepted_terms: termsData.accepted_terms,
      };

      const response = await createNewMember(newMemberData);

      setPersonalInfo(undefined);
      setAddressInfo(undefined);
      setTermsInfo(undefined);

      const userResponse = await getUser();
      setUser((prevState: User) => ({
        ...prevState,
        id: userResponse.user_id,
        email: userResponse.email,
        firstName: userResponse.first_name,
        lastName: userResponse.last_name,
        image_url: userResponse.image_url,
      }));
      // setUser({
      //   id: userResponse.user_id,
      //   email: userResponse.email,
      //   firstName: userResponse.first_name,
      //   lastName: userResponse.last_name,
      //   image_url: userResponse.image_url,
      // });
      setIsAuthenticated(true);
      router.dismissAll();
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create member.");
    }
  };

  return (
    <memberFormContext.Provider
      value={{
        personalInfo,
        addressInfo,
        termsInfo,
        setPersonalInfo,
        setAddressInfo,
        setTermsInfo,
        onSubmit,
      }}
    >
      {children}
    </memberFormContext.Provider>
  );
}

export const useMemberForm = () => useContext(memberFormContext);
