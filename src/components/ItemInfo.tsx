import { AntDesign } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import harborBuilding from "../../assets/icons/building.png";
import { Text } from "./general/Themed";

import RemoteVisit from "../../assets/icons/remote.svg";

type ItemInfoProps = {
  bottomBorder?: boolean;
  title: string;
  description?: string;
};

export default function ItemInfo({
  bottomBorder = true,
  title,
  description,
}: ItemInfoProps) {
  return (
    <>
      <View style={[styles.container, { marginVertical: 20 }]}>
        <View style={[styles.container, { gap: 10 }]}>
          <View
            style={{
              backgroundColor: "#63daae4f",
              padding: 10,
              borderRadius: 50,
              marginLeft: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RemoteVisit width={35} height={35} />
          </View>
          <View>
            <Text>{title}</Text>
            {description && (
              <Text textType="light" style={{ marginTop: 2 }}>
                {description}
              </Text>
            )}
          </View>
        </View>

        <AntDesign
          name="right"
          size={24}
          color="black"
          style={{ color: "lightgray", marginLeft: "auto", marginRight: 15 }}
        />
      </View>
      {bottomBorder && (
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: "82%",
            marginLeft: "auto",
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
  },
});
