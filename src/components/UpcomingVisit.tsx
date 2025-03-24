import { View } from "react-native";
import { useEffect, useState } from "react";
import { getUpcomingVisits } from "@/services/visitService";
import { UpcomingVisit } from "@/types/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSharedValue } from "react-native-reanimated";
import VisitCard from "./animated/VisitCard";
import theme from "@/constants/theme";

dayjs.extend(utc);

export default function UpcomingVisits() {
  const [upcomingVisits, setUpcomingVisits] = useState<UpcomingVisit[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  useEffect(() => {
    const fetchVisits = async () => {
      const response = await getUpcomingVisits();
      setUpcomingVisits(response);
    };

    fetchVisits();
  }, []);

  if (!upcomingVisits.length) return;

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: theme.light.tint,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 220,
      }}
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
    </View>
  );
}
