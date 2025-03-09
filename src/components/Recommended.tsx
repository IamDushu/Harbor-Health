import { ScrollView } from "react-native";
import CardWithImage from "./CardWithImage";
import Card from "./general/Card";
import ItemInfo from "./ItemInfo";
import bannerImg from "../../assets/banner.webp";
import harbor from "../../assets/harbor.jpg";

export default function Recommended() {
  return (
    <Card title="Recommended">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 15,
          flexDirection: "row",
        }}
      >
        <CardWithImage
          image={bannerImg}
          title="Flu, COVID, strep or norovirus?"
          description="Here's what's spreading this cold and flu season in Austin"
        />
        <CardWithImage
          image={harbor}
          title="Harbor Health opens 2 express care clinics in Central, South Austin"
        />
      </ScrollView>
      <ItemInfo
        title="COVID-19 Daily Check-in"
        description="Get your daily status badge"
      />
      <ItemInfo
        title="Give $25 off"
        description="Invite friends to Harbor Health"
      />
    </Card>
  );
}
