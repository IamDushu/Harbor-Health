import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { z } from "zod";

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
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

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
  onSubmit: () => void;
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

  const onSubmit = () => {
    if (!personalInfo || !addressInfo || !termsInfo) {
      console.log("The form is incomplete");
      return;
    }

    // send form data to the server

    //clear fields
    setPersonalInfo(undefined);
    setAddressInfo(undefined);
    setTermsInfo(undefined);

    //set user and redirect next
    router.dismissAll();
    router.replace("/home");
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
