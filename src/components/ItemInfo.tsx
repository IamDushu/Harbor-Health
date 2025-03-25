import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "./general/Themed";
import { ComponentProps } from "react";

type ItemInfoProps = {
  bottomBorder?: boolean;
  title: string;
  description?: string;
  Icon?: React.FC<{ width?: number; height?: number }>;
} & ComponentProps<typeof Pressable>;

export default function ItemInfo({
  bottomBorder = true,
  title,
  description,
  Icon,
  ...pressableProps
}: ItemInfoProps) {
  return (
    <Pressable {...pressableProps}>
      <View style={[styles.container, { marginVertical: 20 }]}>
        <View style={[styles.container, { gap: 10 }]}>
          {Icon && (
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
              <Icon width={35} height={35} />
            </View>
          )}
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
    </Pressable>
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
