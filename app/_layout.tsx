import { PortalHost } from "@rn-primitives/portal";
import { Slot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Slot />
        <Toast />
        <PortalHost />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
