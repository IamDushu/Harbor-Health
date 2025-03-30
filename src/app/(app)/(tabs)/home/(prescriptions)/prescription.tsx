import { Link, router } from "expo-router";
import { StyleSheet, Text as T, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PrescriptionItem from "@/components/PrescriptionItem";
import CustomButton from "@/components/general/CustomButton";
import { useState } from "react";

const prescriptionsData = [
  { name: "Celexa (citalopram)", description: "20mg tabs" },
  { name: "Ibuprofen", description: "600mg tabs" },
  { name: "Tretinoin", description: "1 tube cream" },
];

export default function Prescriptions() {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>(
    []
  );

  const toggleSelection = (name: string) => {
    setSelectedPrescriptions((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <View style={styles.container}>
      <T style={{ padding: 20, paddingVertical: 10, fontSize: 14 }}>
        Select prescriptions for renewal
      </T>
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        {prescriptionsData.map((prescription) => (
          <PrescriptionItem
            key={prescription.name}
            name={prescription.name}
            description={prescription.description}
            selected={selectedPrescriptions.includes(prescription.name)}
            onToggle={() => toggleSelection(prescription.name)}
          />
        ))}

        <View style={{ padding: 20, marginTop: 20 }}>
          <CustomButton
            title="Renew Prescription"
            width="full"
            onPress={() => {
              if (!(selectedPrescriptions.length === 0)) {
                router.push({
                  pathname: "/home/(prescriptions)/modal",
                  params: { selected: JSON.stringify(selectedPrescriptions) },
                });
              }
            }}
            disabled={selectedPrescriptions.length === 0}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
