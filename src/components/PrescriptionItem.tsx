import { View, Text as T, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text } from "./general/Themed";
import Checkbox from "expo-checkbox";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type PrescriptionItemProps = {
  name: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
};

export default function PrescriptionItem({
  name,
  description,
  selected,
  onToggle,
}: PrescriptionItemProps) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <View style={{ gap: 20, flexDirection: "row" }}>
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
            <FontAwesome5
              name="prescription-bottle"
              size={24}
              color="#2a5650"
            />
          </View>
          <View>
            <Text>{name}</Text>
            <Text textType="light" style={{ marginTop: 2 }}>
              {description}
            </Text>
          </View>
        </View>

        <View style={{ marginRight: 20 }}>
          <Checkbox
            value={selected}
            onValueChange={onToggle}
            style={{ padding: 12, borderRadius: 100 }}
            color="#2a5650"
          />
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: "82%",
          marginLeft: "auto",
        }}
      />
    </View>
  );
}
