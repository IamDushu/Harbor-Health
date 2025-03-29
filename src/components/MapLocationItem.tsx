import { View, Text, Linking, Alert, Pressable } from "react-native";
import { Image } from "expo-image";
import { Location } from "@/types/models";
import theme from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { Dispatch, SetStateAction } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type MapLocationItemProps = {
  location: Location;
  setSelectedLocation: (location: Location) => void;
};

export default function MapLocationItem({
  location,
  setSelectedLocation,
}: MapLocationItemProps) {
  const handlePhonePress = (phoneNumber: string | undefined) => {
    const phoneNumbers = "+18554818375";
    if (!phoneNumber) {
      return;
    }
    const url = `tel:${phoneNumbers}`;

    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Unable to open phone dialer")
    );
  };

  return (
    <Pressable
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 20,
        overflow: "hidden",
      }}
      onPress={() => setSelectedLocation(location)}
    >
      <Image
        source={location?.image_url?.String}
        style={{ width: 150, aspectRatio: 1 }}
        placeholder={{ blurhash }}
        contentFit="cover"
      />
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: "bold", color: theme.light.secondaryText }}>
          {location.name}
        </Text>
        <Text
          style={{
            color: theme.light.secondaryText,
            fontSize: 12,
            marginVertical: 5,
          }}
        >
          {location.address}
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: "auto",
          }}
          onPress={() => handlePhonePress(location.phone)}
        >
          <Feather name="phone" size={15} color="black" />
          <Text style={{ color: theme.light.secondaryText }}>
            {location.phone}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
