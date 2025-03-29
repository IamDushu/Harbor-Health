import { View } from "react-native";
import { useEffect, useState } from "react";
import { getUpcomingVisits } from "@/services/visitService";
import { UpcomingVisit } from "@/types/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import VisitCard from "./animated/VisitCard";
import theme from "@/constants/theme";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

dayjs.extend(utc);

export default function UpcomingVisits() {
  const [upcomingVisits, setUpcomingVisits] = useState<UpcomingVisit[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  const slideDown = useSharedValue(-100);
  const fadeIn = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideDown.value }],
    opacity: fadeIn.value,
  }));

  useEffect(() => {
    const fetchVisits = async () => {
      const response = await getUpcomingVisits();
      setUpcomingVisits(response);

      if (response.length) {
        slideDown.value = withTiming(0, { duration: 800 });
        fadeIn.value = withTiming(1, { duration: 800 });
      }
    };

    fetchVisits();
  }, []);

  if (!upcomingVisits.length) return null;

  return (
    <Animated.View
      style={[
        {
          padding: 20,
          backgroundColor: theme.light.tint,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 220,
        },
        animatedStyle,
      ]}
    >
      {upcomingVisits.map((visit, index) => {
        if (index > currentIndex + MAX || index < currentIndex) {
          return null;
        }

        return (
          <VisitCard
            newData={upcomingVisits}
            setNewData={setUpcomingVisits}
            maxVisibleItems={MAX}
            item={visit}
            index={index}
            dataLength={upcomingVisits.length}
            animatedValue={animatedValue}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            key={index}
          />
        );
      })}
    </Animated.View>
  );
}
