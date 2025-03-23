import CustomButton from "@/components/general/CustomButton";
import { Text } from "@/components/general/Themed";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text as T,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Luci from "../../../../../../assets/LuciLeykum.webp";
import Clay from "../../../../../../assets/ClayJohnston.webp";
import Amy from "../../../../../../assets/AmyAcker.webp";
import { router } from "expo-router";

export default function BookingSelect() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        {/* <View
          style={{
            padding: 20,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Text style={{ paddingRight: 20 }}>Filters</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: -20,
            }}
            contentContainerStyle={{ gap: 10 }}
          >
            <CustomButton
              title="Locations"
              type="outline"
              style={{ paddingVertical: 0 }}
            />
            <CustomButton
              title="Dates"
              type="outline"
              style={{ paddingVertical: 0 }}
            />
            <CustomButton
              title="Providers"
              type="outline"
              style={{ paddingVertical: 0 }}
            />
          </ScrollView>
        </View> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text textType="bold">Tue Feb 22</Text>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 20,
              gap: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Image
                source={Luci}
                style={{ borderRadius: "50%", width: 60, height: 60 }}
              />
              <View>
                <Text>Luci Leykum, MD</Text>
                <Text textType="light" style={{ marginTop: 2 }}>
                  Internal Medicine Physician
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 3, paddingLeft: 20 }}
              style={{
                marginLeft: -20,
              }}
            >
              <CustomButton
                title="3:30pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="4:00pm"
                type="fill"
                style={{ paddingVertical: 0 }}
                onPress={() => router.push("/bookingConfirm")}
              />
              <CustomButton
                title="4:30pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="4:45pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
            </ScrollView>
          </View>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 20,
              gap: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Image
                source={Clay}
                style={{ borderRadius: "50%", width: 60, height: 60 }}
              />
              <View>
                <Text>Clay Johnston, PhD, MD, MPH</Text>
                <Text textType="light" style={{ marginTop: 2 }}>
                  Family Physician
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 3, paddingLeft: 20 }}
              style={{
                marginLeft: -20,
              }}
            >
              <CustomButton
                title="1:00pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="2:30pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="3:15pm"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
            </ScrollView>
          </View>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 20,
              gap: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Image
                source={Amy}
                style={{ borderRadius: "50%", width: 60, height: 60 }}
              />
              <View>
                <Text>Amy Acker, MSN, FNP-C</Text>
                <Text textType="light" style={{ marginTop: 2 }}>
                  Family Nurse Practitioner
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 3, paddingLeft: 20 }}
              style={{
                marginLeft: -20,
              }}
            >
              <CustomButton
                title="9:00am"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="10:00am"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="11:00am"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
              <CustomButton
                title="1:30am"
                type="fill"
                style={{ paddingVertical: 0 }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
