import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemInfo from "@/components/ItemInfo";
import { logout } from "@/services/authService";
import { useAuth } from "@/context/auth";
import Family from "../../../../assets/icons/family.svg";
import Credit from "../../../../assets/icons/credit.svg";
import Lab from "../../../../assets/icons/flask.svg";
import Pill from "../../../../assets/icons/pill.svg";
import Syringe from "../../../../assets/icons/syringe.svg";
import Vitals from "../../../../assets/icons/vitals.svg";
import Allergy from "../../../../assets/icons/allergy.svg";
import Clipboard from "../../../../assets/icons/clipboard.svg";
import Calendar from "../../../../assets/icons/calendar.svg";
import Logout from "../../../../assets/icons/signout.svg";

export default function MyHealthTab() {
  const { user, setUser, setIsAuthenticated } = useAuth();

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
          source={{
            uri: user?.image_url?.String,
          }}
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
          {user?.firstName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          Harbor Member
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white" }}>
          {/* <ItemInfo
            title="Luci"
            description="Your Primary Care Provider"
            Icon={Gift}
          /> */}
          <ItemInfo
            title="Family"
            description="Manage family accounts"
            Icon={Family}
          />
          <ItemInfo
            title="Insurance & Billing"
            description="Insurance Company"
            Icon={Credit}
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
          <ItemInfo title="Lab Results" Icon={Lab} />
          <ItemInfo title="Current Medications" Icon={Pill} />
          <ItemInfo title="Vaccines" Icon={Syringe} />
          <ItemInfo title="Vitals & Trends" Icon={Vitals} />
          <ItemInfo title="Allergies" Icon={Allergy} />
          <ItemInfo title="Health Screenings" Icon={Clipboard} />
          {/* <ItemInfo title="Request Records" Icon={Gift} /> */}
          <ItemInfo title="Past Appointments" Icon={Calendar} />
          <ItemInfo
            title="Log Out"
            onPress={() => {
              setUser(undefined);
              logout();
              setIsAuthenticated(false);
            }}
            Icon={Logout}
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
