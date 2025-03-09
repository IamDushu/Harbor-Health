import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Text } from "./general/Themed";

type CardWithImageProps = {
  image: ImageSourcePropType;
  title: string;
  description?: string;
  lastLine?: string;
};

export default function CardWithImage({
  image,
  title,
  description,
  lastLine,
}: CardWithImageProps) {
  return (
    <View style={styles.card}>
      <View style={{ height: "65%" }}>
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            objectFit: "fill",
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>{title}</Text>
        <Text
          textType="light"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ marginTop: 5 }}
        >
          {description}
        </Text>
        <Text textType="light" style={{ marginTop: 5 }}>
          {lastLine}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "white",
    width: 320,
    height: 320,
    marginLeft: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.62,
    elevation: 4,
  },

  textContainer: {
    height: "35%",
    padding: 20,
  },
});
