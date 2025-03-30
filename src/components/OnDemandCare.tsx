import { router } from "expo-router";
import ItemInfo from "./ItemInfo";
import Card from "./general/Card";
import Pill from "../../assets/icons/pill.svg";
import VideoCam from "../../assets/icons/video.svg";
import { AntDesign } from "@expo/vector-icons";

export default function OnDemandCare() {
  return (
    <Card title="Get On-Demand Care">
      <ItemInfo
        title="Manage Prescriptions"
        description="Requests and renewals"
        Icon={Pill}
        onPress={() => router.push("/home/(prescriptions)")}
        rightElement={
          <AntDesign
            name="right"
            size={24}
            color="black"
            style={{ color: "lightgray", marginLeft: "auto", marginRight: 15 }}
          />
        }
      />
      {/* <ItemInfo
        title="Treat Me Now"
        description="In-app help with common issues"
      /> */}

      <ItemInfo
        title="Urgent Video Chat"
        description="Ideal for time-sensitive needs"
        Icon={VideoCam}
        onPress={() => router.push("/home/videoChatInfo")}
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
