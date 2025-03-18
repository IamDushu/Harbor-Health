import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import {
  TermsInfo,
  TermsInfoSchema,
  useMemberForm,
} from "@/context/MemberFormProvider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardAwareScrollView from "@/components/general/KeyboardAwareScrollView";
import CustomCheckbox from "@/components/general/CustomCheckbox";

export default function terms_info() {
  const { termsInfo, setTermsInfo, onSubmit } = useMemberForm();

  const form = useForm({
    resolver: zodResolver(TermsInfoSchema),
    defaultValues: termsInfo,
  });

  const onNext: SubmitHandler<TermsInfo> = (data) => {
    setTermsInfo(data);
    onSubmit(data);
  };

  return (
    <KeyboardAwareScrollView
      scrollViewStyle={{ padding: 20, backgroundColor: "white" }}
    >
      <Text
        style={{
          fontFamily: "gt-bold",
          fontSize: 27,
          color: "#121c44",
          lineHeight: 35,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Terms of Service,{"\n"}Privacy Policy, and{"\n"}HIPAA Notice
      </Text>
      <Text style={{ color: "#121c44", textAlign: "center", fontSize: 12 }}>
        In order to join Harbor Health, you must agree to{"\n"}the terms below.
      </Text>
      <View style={{ padding: 10, paddingVertical: 30 }}>
        <FormProvider {...form}>
          <Text style={{ marginBottom: 10 }}>
            I am at least 18 years of age and I have read and accept:
          </Text>

          <CustomCheckbox
            name="accepted_terms"
            label="Membership Terms of Service"
          />
          <CustomCheckbox
            name="accepted_terms"
            label="Medical Terms of Service"
          />
          <CustomCheckbox name="accepted_terms" label="Privacy Policy" />

          <Text style={{ marginBottom: 10, marginTop: 20 }}>
            I acknowledge receipt of the following:
          </Text>
          <CustomCheckbox
            name="accepted_terms"
            label="Notice of HIPAA Privacy"
          />
        </FormProvider>
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: "auto" }}>
        <CustomButton
          title="Back"
          onPress={() => router.back()}
          type="outline"
        />
        <CustomButton
          title="Submit"
          width="full"
          onPress={form.handleSubmit(onNext)}
          disabled={!form.watch("accepted_terms")}
          flex
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
