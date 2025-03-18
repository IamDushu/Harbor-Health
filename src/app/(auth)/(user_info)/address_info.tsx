import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import {
  AddressInfo,
  AddressInfoSchema,
  useMemberForm,
} from "@/context/MemberFormProvider";
import CustomTextInput from "@/components/general/CustomTextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import KeyboardAwareScrollView from "@/components/general/KeyboardAwareScrollView";
import CustomDateTimePicker from "@/components/general/CustomDateTimePicker";
import CustomPicker from "@/components/general/CustomPicker";
import insurance from "../../../../assets/static/insurance.json";

export default function address_info() {
  const { addressInfo, setAddressInfo } = useMemberForm();

  const form = useForm({
    resolver: zodResolver(AddressInfoSchema),
    defaultValues: addressInfo,
  });

  const onNext: SubmitHandler<AddressInfo> = (data) => {
    setAddressInfo(data);
    router.push("/(user_info)/terms_info");
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
          lineHeight: 40,
          textAlign: "center",
        }}
      >
        What's your address?
      </Text>
      <Text style={{ color: "#121c44", textAlign: "center", fontSize: 12 }}>
        We offer 24/7 on-demand virtual care anywhere,{"\n"} plus in-office care
        in many locations at Austin.
      </Text>
      <View style={{ padding: 10, paddingVertical: 30 }}>
        <FormProvider {...form}>
          <View style={{ gap: 15 }}>
            <View>
              <CustomTextInput
                name="address_line_one"
                label="Home address"
                placeholder="123 Harbor St."
                autoCorrect={false}
              />
              <CustomTextInput
                name="address_line_two"
                placeholder="Apt, Floor, Unit"
                autoCorrect={false}
              />
            </View>

            <CustomPicker
              label="Primary Insurance"
              name="insurance"
              placeholder={{ label: "Select an insurance" }}
              items={insurance.map((insurance) => ({
                label: insurance.name,
                value: insurance.code,
              }))}
            />
            <Text style={{ fontSize: 12, color: "gray", marginBottom: 5 }}>
              If none of these Insurance providers are applicable, choose
              "Other".
            </Text>
          </View>
        </FormProvider>
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: "auto" }}>
        <CustomButton
          title="Back"
          onPress={() => router.back()}
          type="outline"
        />
        <CustomButton
          title="Next"
          width="full"
          onPress={form.handleSubmit(onNext)}
          flex
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
