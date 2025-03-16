import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import onboard1 from "../../../assets/clinic-lobby.jpg";
import onboard2 from "../../../assets/bp-measure.png";
import onboard3 from "../../../assets/locations_map.png";
import onboard4 from "../../../assets/how-it-works.png";
import HarborLogo from "../../../assets/icons/harbor_logo.svg";
import theme, { SIZES } from "@/constants/theme";
import CustomButton from "@/components/general/CustomButton";
import { router } from "expo-router";

export default function OnboardScreen() {
  const scrollX = new Animated.Value(0);

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            <View style={{ paddingHorizontal: 25 }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{ width: "100%", height: 220, borderRadius: 20 }}
              />
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: "gt-bold",
                    fontSize: 28,
                    lineHeight: 35,
                    color: "#121c44",
                    letterSpacing: 1,
                  }}
                >
                  {item.title}
                </Text>
                {item.description}
                {item.link}
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.dot, { width: 12, height: 12, opacity }]}
            ></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HarborLogo height={60} width={180} style={{ margin: 10 }} />
      {renderContent()}
      {renderDots()}
      <View
        style={{
          width: SIZES.width,
          flexDirection: "row",
          gap: 15,
          padding: 20,
        }}
      >
        <CustomButton
          title="Log In"
          width="full"
          flex={true}
          broadRadius={true}
          onPress={() => router.push("/(auth)/login")}
        />
        <CustomButton
          title="Sign up"
          type="outline"
          width="full"
          broadRadius={true}
          flex={true}
          onPress={() => router.push("/(auth)/signup")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  description: { fontSize: 16, color: "gray", lineHeight: 22 },
  dotContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    borderRadius: 100,
    backgroundColor: theme.light.tint,
  },
  link: {
    color: theme.light.tint,
    fontWeight: "600",
  },
});

const onBoardings = [
  {
    title: "What you get with a membership:",
    description: (
      <View style={{ marginVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>
            Easy booking of same and next-day appointments at offices near you
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>
            24/7 on-demand care at no extra cost
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>
            Prescription refills & renewals
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>Messaging with our care team</Text>
        </View>
      </View>
    ),
    img: onboard1,
    link: <Text style={styles.link}>Learn more about membership benefits</Text>,
  },
  {
    title: "We work with most insurances",
    description: (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.description}>
          In-office and remote visits are billed to you or your insurance;
          copays and deductibles may apply.
        </Text>
      </View>
    ),
    img: onboard2,
    link: <Text style={styles.link}>See accepted insurance plans</Text>,
  },
  {
    title: "Members can book appointments in app",
    description: (
      <View style={{ marginVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>Primary Care</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>Pediatrics</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>Chronic condition management</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>•</Text>
          <Text style={styles.description}>Mental health support</Text>
        </View>
      </View>
    ),
    img: onboard4,
    link: (
      <Text style={styles.link}>See additional Harbor Health Services</Text>
    ),
  },
  {
    title: "Members can book appointments in app at 200+ offices in the U.S.",
    description: (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.description}>
          We offer in-person care in the cities above as well as 24/7 on-demand
          virtual care nationwide. See a provider on your schedule.
        </Text>
      </View>
    ),
    img: onboard3,
    link: <Text style={styles.link}>See all Harbor Health locations</Text>,
  },
];
