import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import profile from "../../../../assets/profile.jpeg";
import ItemInfo from "@/components/ItemInfo";
import { logout } from "@/services/authService";
import { useAuth } from "@/context/auth";

export default function MyHealthTab() {
  const { user, setUser } = useAuth();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: "white",
        }}
      >
        <Image
          source={profile}
          style={{
            borderRadius: 100,
            height: 100,
            width: 100,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            fontSize: 25,
            fontFamily: "ginto-medium",
            marginBottom: 2,
          }}
        >
          {user.firstName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          Member since 2021
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white" }}>
          <ItemInfo title="Luci" description="Your Primary Care Provider" />
          <ItemInfo title="Family" description="Your Primary Care Provider" />
          <ItemInfo
            title="Insurance & Billing"
            description="Insurance Company"
          />
        </View>

        <Text
          style={{
            padding: 20,
            paddingVertical: 10,
            opacity: 0.6,
            fontWeight: 500,
          }}
        >
          Health Record
        </Text>
        <View style={{ backgroundColor: "white" }}>
          <ItemInfo title="Lab Results" />
          <ItemInfo title="Current Medications" />
          <ItemInfo title="Vaccines" />
          <ItemInfo title="Vitals & Trends" />
          <ItemInfo title="Allergies" />
          <ItemInfo title="Health Screenings" />
          <ItemInfo title="Request Records" />
          <ItemInfo title="Past Appointments" />
          <ItemInfo
            title="Log Out"
            onPress={() => {
              setUser(undefined);
              logout();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
