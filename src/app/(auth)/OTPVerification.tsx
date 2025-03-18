import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import theme from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/general/CustomButton";
import { useState } from "react";
import { verifyOTP } from "@/services/authService";
import { useAuth } from "@/context/auth";

export default function OTPVerificationScreen() {
  const { email, token } = useLocalSearchParams<{
    email: string;
    token: string;
  }>();
  const [otp, setOtp] = useState("");
  const { setUser } = useAuth();

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    const sessionData = await verifyOTP(token, otp);
    if (sessionData) {
      if (sessionData.mode === "signup") {
        router.dismissAll();
        router.replace("/personal_info");
        // router.navigate("/personal_info");
      }

      if (sessionData.mode === "login") {
        setUser(sessionData.email);
      }
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

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
          {email}
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
        onTextChange={(text) => setOtp(text)}
      />
      <CustomButton
        title="Done"
        broadRadius
        width="full"
        onPress={handleVerify}
      />
    </SafeAreaView>
  );
}
