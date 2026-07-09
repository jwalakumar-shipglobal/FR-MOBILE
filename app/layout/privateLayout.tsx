import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

interface PrivateLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PrivateLayout({
  children,
  className,
}: PrivateLayoutProps) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="bg-gray-100 flex-1">
        <View>
          <Header />
        </View>
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View className={cn(className, "mb-10")}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
