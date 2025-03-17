import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import theme from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import CustomButton from "@/components/general/CustomButton";

export default function OTPVerificationScreen() {
  return (
    <SafeAreaView
      style={{ padding: 20, gap: 40, flex: 1, backgroundColor: "white" }}
    >
      <View style={{ gap: 20 }}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            fontWeight: 500,
            color: "#121c44",
            fontSize: 15,
            lineHeight: 20,
          }}
        >
          Enter the OTP sent to {"\n"}
          hey.dushyanth@gmail.com
        </Text>
      </View>

      <OtpInput
        numberOfDigits={5}
        focusColor={theme.light.tint}
        theme={{
          pinCodeContainerStyle: {
            backgroundColor: "white",
            width: 58,
            height: 58,
            borderRadius: 12,
          },
          pinCodeTextStyle: {
            color: "#121c44",
          },
          // filledPinCodeContainerStyle: {
          //   borderColor: "red",
          // },
        }}
        onTextChange={(text) => console.log(text)}
      />
      <CustomButton title="Done" broadRadius width="full" disabled />
    </SafeAreaView>
  );
}
