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
import { getUser } from "@/services/userService";

export default function OTPVerificationScreen() {
  const { email, token, mode } = useLocalSearchParams<{
    email: string;
    token: string;
    mode: "login" | "signup";
  }>();
  const [otp, setOtp] = useState("");
  const { setUser, setIsAuthenticated } = useAuth();

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    const sessionData = await verifyOTP(token, otp);
    if (sessionData) {
      if (sessionData.mode === "signup") {
        setUser({
          streamToken: sessionData.stream_token,
        });
        router.dismissAll();
        router.replace("/personal_info");
        // router.navigate("/personal_info");
      }

      if (sessionData.mode === "login") {
        try {
          const response = await getUser();
          if (response.is_onboarded) {
            setUser({
              id: response.user_id,
              email: response.email,
              firstName: response.first_name,
              lastName: response.last_name,
              image_url: response.image_url,
              streamToken: sessionData.stream_token,
            });
            setIsAuthenticated(true);
          } else {
            setUser({
              streamToken: sessionData.stream_token,
            });
            router.dismissAll();
            router.replace("/personal_info");
          }
        } catch {}
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
      <View style={{ flexDirection: "row", gap: 10 }}>
        <AntDesign name="infocirlceo" size={12} color={theme.light.tint} />
        {mode === "login" ? (
          <Text style={{ fontSize: 12 }}>
            A code has been sent to {email} if you have an account. Don’t have
            one? Sign up now to receive your OTP.
          </Text>
        ) : (
          <Text style={{ fontSize: 12 }}>
            A code has been sent to {email}. Already have an account? Login to
            receive your OTP.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
