import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { requestAuth } from "@/services/authService";
import { useAuth } from "@/context/auth";
import LottieView from "lottie-react-native";
import theme from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuthRequest = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    setLoading(true);
    const token = await requestAuth(email, "login");
    setLoading(false);
    if (token) {
      router.push({
        pathname: "/(auth)/OTPVerification",
        params: { token, email, mode: "login" },
      });
    } else {
      Alert.alert("Oops", `Something went wrong.${"\n"}Contact Support`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Text
        style={{
          fontFamily: "gt-bold",
          fontSize: 34,
          lineHeight: 35,
          color: "#121c44",
          letterSpacing: 1,
          // textAlign: "center",
          marginTop: 50,
        }}
      >
        Welcome back!
      </Text>
      <View style={{ gap: 10 }}>
        <Text style={{ fontWeight: 500, color: "#121c44" }}>
          Verify your Email address
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          style={{
            borderColor: "gray",
            height: "auto",
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            padding: 15,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
          autoCorrect={false}
        />
      </View>
      <View>
        {!loading ? (
          <CustomButton
            title="Get OTP"
            width="full"
            broadRadius={true}
            onPress={handleAuthRequest}
          />
        ) : (
          <LottieView
            source={require("../../../assets/lottie/loading.json")}
            autoPlay
            loop
            style={{
              width: 50,
              height: 50,
              backgroundColor: theme.light.tint,
              borderRadius: "100%",
              margin: "auto",
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    gap: 30,
    padding: 20,
  },
});
