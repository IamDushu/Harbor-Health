import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Text } from "./general/Themed";

type CardWithImageProps = {
  image: ImageSourcePropType;
  title: string;
  description?: string;
};

export default function CardWithImage({
  image,
  title,
  description,
}: CardWithImageProps) {
  return (
    <View style={styles.card}>
      <View style={{ height: "62%" }}>
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
        <Text textType="light" style={{ marginTop: 5 }}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "white",
    width: 350,
    height: 300,
    marginLeft: 15,

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
    padding: 20,
  },
});
