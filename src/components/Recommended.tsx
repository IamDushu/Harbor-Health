import { Pressable, ScrollView } from "react-native";
import CardWithImage from "./CardWithImage";
import Card from "./general/Card";
import ItemInfo from "./ItemInfo";
import bannerImg from "../../assets/banner.webp";
import bannerBlogImg from "../../assets/HarborBlog.webp";
import harbor from "../../assets/georgetown.webp";
import * as WebBrowser from "expo-web-browser";
import Gift from "../../assets/icons/gift.svg";
import Virus from "../../assets/icons/virus.svg";
import { AntDesign } from "@expo/vector-icons";

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
          paddingRight: 10,
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
            image={bannerBlogImg}
            title="Seven Things to Show Your Heart Some Love"
            description="Here are seven things to incorporate into your lifestyle that may help prevent heart disease."
          />
        </Pressable>

        <Pressable
          onPress={() =>
            openWebPage(
              "https://harborhealth.com/blog/announcements/measles-update"
            )
          }
        >
          <CardWithImage
            image={bannerImg}
            title="Texas Measles Outbreak: What You Need to Know"
            description="Texas is experiencing its largest measles outbreak in 30 years. Learn more about it.."
          />
        </Pressable>

        <Pressable
          onPress={() =>
            openWebPage(
              "https://harborhealth.com/blog/health-tips/heart-health-2025"
            )
          }
        >
          <CardWithImage
            image={harbor}
            title="Georgetown Clinic Opens"
            description="Opening our brand-new multi-specialty care clinic in Georgetown!"
          />
        </Pressable>
      </ScrollView>
      <ItemInfo
        title="Measles Vaccine Check-in"
        description="Get your MMR vaccine today"
        Icon={Virus}
        rightElement={
          <AntDesign
            name="right"
            size={24}
            color="black"
            style={{ color: "lightgray", marginLeft: "auto", marginRight: 15 }}
          />
        }
      />
      <ItemInfo
        title="Give $25 off"
        description="Invite friends to Harbor Health"
        Icon={Gift}
        rightElement={
          <AntDesign
            name="right"
            size={24}
            color="black"
            style={{ color: "lightgray", marginLeft: "auto", marginRight: 15 }}
          />
        }
      />
    </Card>
  );
}
