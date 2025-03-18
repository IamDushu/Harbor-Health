import theme from "@/constants/theme";
import { useMemberForm } from "@/context/MemberFormProvider";
import { useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";

type ProgressProps = {
  height: number;
};

const steps = [
  { key: "personal_info", title: "Personal" },
  { key: "address_info", title: "Address" },
  { key: "terms_info", title: "Terms" },
];

export default function Progress({ height }: ProgressProps) {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  const segments = useSegments();
  const currentScreen = segments[segments.length - 1];
  const stepIndex = steps.findIndex((s) => s.key === currentScreen) + 1;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * stepIndex!) / steps.length);
  }, [width, stepIndex]);

  return (
    <View
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: "rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          height,
          width: "100%",
          //   borderRadius: height,
          backgroundColor: theme.light.tint,
          position: "absolute",
          left: 0,
          top: 0,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      ></Animated.View>
    </View>
  );
}
