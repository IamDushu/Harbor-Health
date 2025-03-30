import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Text } from "./general/Themed";
import { ComponentProps } from "react";
import CustomTextInput from "./general/CustomTextInput";

type ItemInfoProps = {
  bottomBorder?: boolean;
  comment?: boolean;
  title: string;
  description?: string;
  Icon?: React.FC<{ width?: number; height?: number }>;
  rightElement?: React.ReactNode;
} & ComponentProps<typeof Pressable>;

export default function ItemInfo({
  bottomBorder = true,
  comment = false,
  title,
  description,
  Icon,
  rightElement,
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
        {rightElement}
      </View>

      {comment && (
        <TextInput
          placeholder="Optional comment"
          style={{
            borderColor: "gray",
            borderWidth: StyleSheet.hairlineWidth,
            padding: 10,
            margin: 10,
            marginTop: 0,
            width: "77%",
            marginLeft: "auto",
            borderRadius: 5,
          }}
        />
      )}

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
