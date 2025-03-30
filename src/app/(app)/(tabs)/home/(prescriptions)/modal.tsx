import { Text } from "@/components/general/Themed";
import ItemInfo from "@/components/ItemInfo";
import theme from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import Pharmacy from "../../../../../../assets/icons/pharmacy.svg";
import Pill from "../../../../../../assets/icons/pill.svg";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/general/CustomButton";
import { useRef, useState } from "react";
import LottieView from "lottie-react-native";

const prescriptionDetails = {
  "Celexa (citalopram)": "20mg tabs",
  Ibuprofen: "600mg tabs",
  Tretinoin: "1 tube cream",
};

export default function Modal() {
  const { selected } = useLocalSearchParams();
  const selectedPrescriptions: (keyof typeof prescriptionDetails)[] = selected
    ? JSON.parse(selected as string)
    : [];
  const [showSuccess, setShowSuccess] = useState(false);
  const tickRef = useRef<LottieView>(null);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      tickRef.current?.reset();
      tickRef.current?.play();
    }, 0);

    setTimeout(() => {
      router.replace("/home");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <LottieView
          ref={tickRef}
          source={require("../../../../../../assets/lottie/confirm.json")}
          autoPlay={false}
          loop={false}
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          paddingHorizontal: 20,
          marginTop: 20,
          color: theme.light.tint,
        }}
      >
        Preferred Pharmacy
      </Text>
      <ItemInfo
        title="My Pharmacy"
        description="(555) 893-8348"
        Icon={Pharmacy}
        rightElement={
          <Text
            style={{
              color: theme.light.tint,
              marginLeft: "auto",
              marginRight: 15,
            }}
          >
            Update
          </Text>
        }
      />
      <Text
        style={{
          fontSize: 22,
          paddingHorizontal: 20,
          marginTop: 20,
          color: theme.light.tint,
        }}
      >
        Prescriptions
      </Text>
      {selectedPrescriptions.map((name) => (
        <ItemInfo
          key={name}
          title={name}
          description={prescriptionDetails[name] || ""}
          Icon={Pill}
          comment
          rightElement={
            <Text
              style={{
                color: theme.light.tint,
                marginLeft: "auto",
                marginRight: 15,
              }}
            >
              Remove
            </Text>
          }
        />
      ))}

      <View style={{ padding: 20, marginTop: "auto", marginBottom: 25 }}>
        <CustomButton
          title="Submit Renewal"
          width="full"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
