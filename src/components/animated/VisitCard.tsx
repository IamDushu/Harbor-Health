import { View, Text, Image, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import CustomButton from "../general/CustomButton";
import theme from "@/constants/theme";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { UpcomingVisit } from "@/types/models";
import dayjs from "dayjs";

type VisitCardProps = {
  newData: UpcomingVisit[];
  setNewData: React.Dispatch<React.SetStateAction<UpcomingVisit[]>>;
  maxVisibleItems: number;
  item: UpcomingVisit;
  index: number;
  dataLength: number;
  animatedValue: SharedValue<number>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function VisitCard({
  newData,
  setNewData,
  maxVisibleItems,
  item,
  index,
  dataLength,
  animatedValue,
  currentIndex,
  setCurrentIndex,
}: VisitCardProps) {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // e.translationX is the distance of the swipe
      // e.translationX is positive if the swipe is to the right
      // isSwipeRight is true if the swipe is to the right
      const isSwipeRight = e.translationX > 0;

      // direction 1 is right, -1 is left
      direction.value = isSwipeRight ? 1 : -1;

      // If the current index is the same as the index of the card
      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1]
        );
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        // If the swipe distance is greater than 150 or the swipe velocity is greater than 1000
        // go to the next card
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setNewData)([...newData, newData[currentIndex]]);
            runOnJS(setCurrentIndex)(currentIndex + 1);
          });
          animatedValue.value = withTiming(currentIndex + 1);
          // If the swipe distance is less than 150 or the swipe velocity is less than 1000
          // go back to the original position
        } else {
          translateX.value = withTiming(0, { duration: 500 });
          animatedValue.value = withTiming(currentIndex, { duration: 500 });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-20, 0]
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1]
    );

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20]
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1]
    );

    return {
      transform: [
        { translateY: currentItem ? 0 : translateY },
        { scale: currentItem ? 1 : scale },
        { translateX: translateX.value },
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg",
        },
      ],
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
    };
  });

  const formattedDate = dayjs
    .utc(item.scheduled_at)
    .format("ddd, MMM D h:mm A");

  const handleClick = () => {
    router.push({
      pathname: "/home/visitDetails",
      params: { visit_id: item.visit_id },
    });
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            padding: 20,
            backgroundColor: "white",
            borderRadius: 30,
            position: "absolute",
            zIndex: dataLength - index,
            width: "100%",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 4,
          },
          animatedStyle,
        ]}
      >
        {/* Info  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 3 }}>
            <Text lineBreakStrategyIOS="hangul-word" adjustsFontSizeToFit>
              Upcoming in-office visit with {item.provider_firstname}{" "}
              {item.provider_lastname}
            </Text>
            <Text style={{ marginTop: 5 }}>{formattedDate}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              source={{ uri: item.provider_image_url?.String }}
              style={{
                borderRadius: 100,
                height: 60,
                width: 60,
                borderColor: theme.light.tint,
                borderWidth: 2,
                padding: 3,
              }}
            />
          </View>
        </View>
        {/* Buttons  */}
        <View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
          <CustomButton
            title="View Details"
            type="fill"
            width="fitNoMargin"
            onPress={handleClick}
          />
          <CustomButton title="Modify" type="outline" width="fitNoMargin" />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
