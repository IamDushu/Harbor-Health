import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import {
  PersonalInfo,
  PersonalInfoSchema,
  useMemberForm,
} from "@/context/MemberFormProvider";
import CustomTextInput from "@/components/general/CustomTextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import KeyboardAwareScrollView from "@/components/general/KeyboardAwareScrollView";
import CustomDateTimePicker from "@/components/general/CustomDateTimePicker";
import CustomPicker from "@/components/general/CustomPicker";
import genders from "../../../../assets/static/gender.json";

export default function personal_info() {
  const { personalInfo, setPersonalInfo } = useMemberForm();

  const form = useForm({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  });

  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    setPersonalInfo(data);
    router.push("/(user_info)/address_info");
  };

  return (
    <KeyboardAwareScrollView scrollViewStyle={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "gt-bold",
          fontSize: 27,
          color: "#121c44",
          lineHeight: 40,
          textAlign: "center",
        }}
      >
        Almost there..
      </Text>
      <Text style={{ color: "#121c44", textAlign: "center", fontSize: 12 }}>
        It takes just a few minutes to add your details.
      </Text>
      <View
        style={{
          padding: 10,
          paddingTop: 30,
          flex: 1,
        }}
      >
        <FormProvider {...form}>
          <View style={{ gap: 15 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <CustomTextInput
                name="firstName"
                label="Full legal name"
                placeholder="First Name"
                autoCorrect={false}
                containerStyle={{ flex: 1 }}
              />
              <CustomTextInput
                name="lastName"
                placeholder="Last Name"
                autoCorrect={false}
                label=" "
                containerStyle={{ flex: 1 }}
              />
            </View>
            <CustomTextInput
              name="phoneNumber"
              autoCorrect={false}
              label="Phone number"
            />
            <CustomDateTimePicker
              name="dateOfBirth"
              label="Birthday"
              description="Required to verify your identity before appointments. You must be at least 18 years old."
            />
            <CustomPicker
              label="Legal sex"
              name="gender"
              description="For billing purposes, which sex does your insurance have on record
            for you?"
              placeholder={{ label: "Select a gender" }}
              items={genders.map((gender) => ({
                label: gender.name,
                value: gender.code,
              }))}
            />
          </View>

          <View style={{ marginTop: "auto" }}>
            <CustomButton
              title="Next"
              width="full"
              onPress={form.handleSubmit(onNext)}
            />
          </View>
        </FormProvider>
      </View>
    </KeyboardAwareScrollView>
  );
}
