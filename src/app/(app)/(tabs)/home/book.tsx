import CustomButton from "@/components/general/CustomButton";
import { Text } from "@/components/general/Themed";
import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text as T,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function BookTab() {
  const [issue, setIssue] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <T style={{ padding: 20, paddingVertical: 10, fontSize: 14 }}>
          I would like to cover...
        </T>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TextInput
            placeholder="Ex. I have a fever"
            style={{
              padding: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 140,
              textAlignVertical: "top",
            }}
            value={issue}
            onChangeText={(txt) => setIssue(txt)}
            maxLength={200}
            multiline={true}
            numberOfLines={5}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 20,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View>
              <Text>SF Bay Area</Text>
              <Text textType="light">My Current Location</Text>
            </View>
            <Text style={{ color: Colors.light.tint }}>Update</Text>
          </View>
          <View style={{ padding: 20, paddingHorizontal: 10 }}>
            <CustomButton width="full" title="Next" disabled={true} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
