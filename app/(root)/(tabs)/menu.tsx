import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View } from "react-native";

export default function Menu() {
  return (
    <View className="flex-1">
      <BottomSheet>
        <BottomSheetView>
          <Text>ertyui</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
