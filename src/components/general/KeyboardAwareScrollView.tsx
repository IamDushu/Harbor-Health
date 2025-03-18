import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface KeyboardAwareScrollViewProps extends PropsWithChildren {
  scrollViewStyle?: ViewStyle;
}

export default function KeyboardAwareScrollView({
  children,
  scrollViewStyle,
}: KeyboardAwareScrollViewProps) {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={110}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            padding: 10,
          }}
          style={scrollViewStyle}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
