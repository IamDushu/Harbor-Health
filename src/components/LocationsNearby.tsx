import { ScrollView, View } from "react-native";
import CardWithImage from "./CardWithImage";
import Card from "./general/Card";
import location1 from "../../assets/OnionCreek.jpg";
import location2 from "../../assets/WilliamsDrive.jpg";
import CustomButton from "./general/CustomButton";

export default function LocationsNearby() {
  return (
    <Card title="Locations Nearby">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 15,
          flexDirection: "row",
        }}
      >
        <CardWithImage
          image={location1}
          title="Onion Creek Clinic & Express Care"
          description="0.1 mi away"
          lastLine="Open until 6pm"
        />
        <CardWithImage
          image={location2}
          title="Williams Drive Clinic"
          description="0.1 mi away"
          lastLine="Open until 6pm"
        />
      </ScrollView>
      <View style={{ marginVertical: 10 }}>
        <CustomButton
          type="outline"
          title="See All Locations"
          style={{ marginVertical: 20 }}
        />
      </View>
    </Card>
  );
}
