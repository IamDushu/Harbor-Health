import { Pressable, ScrollView } from "react-native";
import CardWithImage from "./CardWithImage";
import Card from "./general/Card";
import ItemInfo from "./ItemInfo";
import bannerImg from "../../assets/banner.webp";
import harbor from "../../assets/harbor.jpg";
import * as WebBrowser from "expo-web-browser";
import Gift from "../../assets/icons/gift.svg";
import Virus from "../../assets/icons/virus.svg";

const openWebPage = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};

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
        <Pressable
          onPress={() =>
            openWebPage(
              "https://harborhealth.com/blog/health-tips/heart-health-2025"
            )
          }
        >
          <CardWithImage
            image={bannerImg}
            title="Flu, COVID, strep or norovirus?"
            description="Here's what's spreading this cold and flu season in Austin"
          />
        </Pressable>

        <CardWithImage
          image={harbor}
          title="Harbor Health opens 2 express care clinics in Central, South Austin"
        />
      </ScrollView>
      <ItemInfo
        title="COVID-19 Daily Check-in"
        description="Get your daily status badge"
        Icon={Virus}
      />
      <ItemInfo
        title="Give $25 off"
        description="Invite friends to Harbor Health"
        Icon={Gift}
      />
    </Card>
  );
}
